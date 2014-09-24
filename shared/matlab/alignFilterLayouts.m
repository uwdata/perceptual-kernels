function [newC, refindx] = alignFilterLayouts(C)
%
% File  : alignFilterLayouts.m
% Author: Cagatay Demiralp (cagatay)
% Desc  : Aligns and filters given two-dimensional spatial 
%         arrangements (SAs).  
%
%   Input  : 
% 
% 	  C - N by 2M matrix containing N two-dimensional layouts 
% 	      (coordinates) of M points.   
%
%   Output : 
%
%     newC - n by 2M matrix containing aligned and filtered n 
%            layouts.
% 
%     refindx - index of the reference layout--in newC--to which all 
%               the layouts are aligned. Note that the reference layout 
%               is automatically computed from C. 
%
%
% Date    : Sun Mar 23 11:58:19 2014
%
%
if (nargin < 1) 
  error('alignFilterLayouts:ArgChk','Insufficient number of input arguments!');
end

N  = size(C,1);  % number of subjects
M  = size(C,2)/2; % number of variables

D = zeros(N,N);
A = zeros(N,N); 
XY = cell(1,N);

% reshape the flattened coords to M-by-2 matrices 
for i = 1:N
    XY{i} = reshape(C(i,:),2,M)';
end


% find a reference layout:
% 1) pairwise align first 
for i = 1:N
    for j = 1:N
     [d,a] = procrustes(XY{i}, XY{j});
     D(i,j) = d; 
     A(i,j) = a;
    end
end
% 2) then designate the layout that requires the minimum total 
% transformation to align with the rest of the layouts as the reference
e = sum(D);
[~, refindx] = min(e);
refXY = XY{refindx};

% now align all to the reference  
% (use the transformations already computed in the previous step)
for i = 1:N
    if (i ~= refindx)
        XY{i} =  A(refindx,i);
    end
end

t = (mean(e) + 2*std(e)); % threshold for filtering 

% finally, filter by thresholding the total 
% transformation scores in e   
j=1;
for i=1:N
    xy = (XY{i})';
    if(e(i) < t)
        if(refindx == i)
            refindx = j; % update refindx  
        end
        newC(j,:)= xy(:)'; % flatten back the aligned coords 
        j = j+1;
    end
end
