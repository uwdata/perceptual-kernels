function  triplets =  getTestTriplets(M, opt)
%
%
% File  : getTestTriplets.m
% Author: Cagatay Demiralp (cagatay)
% Desc  : Extracts test triplets from a raw triplet matrix, which contains both 
%         training and test triplet judgments.  
%
% Date    : Fri Sep 20 13:02:44 2013
% Modified: $Id$
%
%
if (nargin< 2)
  error('getTestTriplets:ArgChk', 'Insufficient number of args!')
end

[numUsers, numSamples] = size(M); 
numTrainSamples = opt.numTrainSamplesTriplet; 
numTrainStim    = opt.numTrainStim; 
n = opt.numTestStim; 

triplets = cell(numUsers,1); 

for i=1:numUsers
  m = M(i,:); 
  m = (reshape(m, 3, numSamples/3))'; 
  t = (m((numTrainSamples+1):end,:)-numTrainStim);
  triplets{i} = t; 
end
