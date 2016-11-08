function [C, dC] = ste_k_grad(x, N, triplets, lambda)
%STE_K_GRAD Gradient of Stochastic Triplet Embedding
%
%   [C, dC] = ste_k_grad(x, N, triplets, lambda)
%
% The function computes the cost function and corresponding gradient of
% STE with respect to a kernel K.
%
%
% (C) Laurens van der Maaten, 2012
% Delft University of Technology


    % Decode current solution
    K = reshape(x, [N N]);
    
    % Compute Gaussian kernel
    K = exp(-bsxfun(@plus, bsxfun(@plus, -2 .* K, diag(K)), diag(K)'));
    
    % Compute value of cost function
    P = K(sub2ind([N N], triplets(:,1), triplets(:,2))) ./ ...
       (K(sub2ind([N N], triplets(:,1), triplets(:,2))) +  ...
        K(sub2ind([N N], triplets(:,1), triplets(:,3))));
    C = (1 - lambda) .* -sum(log(max(P(:), realmin))) + lambda .* trace(K);
    
    % Compute gradient if requested
    if nargout > 1
        
        % Compute gradient
        dC = zeros(N, N);
        for i=1:size(triplets, 1)
            dC(triplets(i, 1), triplets(i, 2)) = dC(triplets(i, 1), triplets(i, 2)) + 2 .* (1 - P(i));
            dC(triplets(i, 1), triplets(i, 3)) = dC(triplets(i, 1), triplets(i, 3)) - 2 .* (1 - P(i));
            dC(triplets(i, 2), triplets(i, 2)) = dC(triplets(i, 2), triplets(i, 2)) + P(i) - 1;
            dC(triplets(i, 3), triplets(i, 3)) = dC(triplets(i, 3), triplets(i, 3)) + 1 - P(i);
        end
        dC = (1 - lambda) .* -dC + lambda .* eye(N);
        dC = dC(:);
    end
    