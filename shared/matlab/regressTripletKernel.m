function  K = regressTripletKernel(f, triplets, opt)
% File  : regressTripletKernel.m
% Author: Cagatay Demiralp (cagatay)
% Desc  : Regress each subject's triplet responses to a normalized distance 
%         matrix using the given triplet embedding function 'f'. 
% 
% Date    : Thu Sep 19 22:57:13 2013
% Modified: $Id$
%
if (nargin < 3)
  error('tripletfit:ArgChk','Insufficient number of input arguments!')
end

% numSs: number of subjects 
numSs = size(triplets,1); 
lambda = opt.lambda; 

for i=1:numSs
    k = f(triplets{i}, opt.numTestStim, lambda); 
    k = squareform(pdist(k)); 
    K(i,:) = (k(:)/max(k(:)))'; % normalize  
end

m = size(K,2); 
n = sqrt(m); 
minrate = min(K,[], 2); 
maxrate = max(K,[], 2); 

% rescale each subject's kernel
K = (K - repmat(minrate, 1, m))./repmat(maxrate - minrate, 1, m); 
 
mu = mean(K,1);

% then rescale the mean kernel
minrate = min(mu); 
maxrate = max(mu); 
mu = (mu - minrate)./(maxrate - minrate); 

% return the perceptual kernel as a square distance matrix      
K = reshape(mu', n, n); 

