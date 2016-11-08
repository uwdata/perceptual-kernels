function K = rawTripletToKernel(fname) 
% File  : rawTripletToKernel.m
% Author: Cagatay Demiralp (cagatay)
% Desc  : Computes a single kernel from triplet responses of multiple 
%         subjects.   
% 
%
% Date    : Thu Sep 12 09:48:30 2013
% Modified: $Id$

addpath 'STE_Release/'

paletteType ='univar'; % change it to 'bivar' for bivariate palettes 

opt.lambda = 0.05; 

if(strcmp(paletteType, 'univar'))
  opt.numTrainStim = 4;
  opt.numTestStim = 10;
  opt.numTrainSamplesTriplet = 8; % 4 choose 3  + 4 debug
else
  opt.numTrainStim = 6; 
  opt.numTestStim = 16; 
  opt.numTrainSamplesTriplet = 24; % 6 choose 3 + 4 debug  
end

M = dlmread(fname); 
T = getTestTriplets(M+1, opt); % +1 b/c STE indices start from 1  
K = regressTripletKernel(@gnmds_x, T, opt); 

