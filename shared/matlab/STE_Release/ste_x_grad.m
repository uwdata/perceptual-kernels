function [C, dC] = ste_x_grad(x, N, no_dims, triplets, lambda, use_log)
%STE_X_GRAD Gradient of Stochastic Triplet Embedding
%
%   [C, dC] = ste_x_grad(x, N, no_dims, triplets, lambda, use_log)
%
% The function computes the cost function and corresponding gradient of
% STE with respect to an embedding X.
%
%
% (C) Laurens van der Maaten, 2012
% Delft University of Technology


    % Decode current solution
    X = reshape(x, [N no_dims]);
    
    % Compute Gaussian kernel
    sum_X = sum(X .^ 2, 2);
    K = exp(-bsxfun(@plus, sum_X, bsxfun(@plus, sum_X', -2 * (X * X'))));
    
    % Compute value of cost function
    P = K(sub2ind([N N], triplets(:,1), triplets(:,2))) ./ ...
       (K(sub2ind([N N], triplets(:,1), triplets(:,2))) +  ...
        K(sub2ind([N N], triplets(:,1), triplets(:,3))));
    if use_log
        C = -sum(log(max(P(:), realmin))) + lambda .* sum(x .^ 2);
    else
        C = -sum(P(:)) + lambda .* sum(x .^ 2);
    end
    
    % Compute gradient if requested
    if nargout > 1
        
        % Compute gradient
        dC = zeros(N, no_dims);
        for i=1:no_dims
            if use_log
                dC(:,i) = accumarray([triplets(:,1); triplets(:,2); triplets(:,3)], ...
                           -2 .* [(1 - P) .* (X(triplets(:,1), i) - X(triplets(:,2), i)) - ...
                                  (1 - P) .* (X(triplets(:,1), i) - X(triplets(:,3), i)); ...
                                 -(1 - P) .* (X(triplets(:,1), i) - X(triplets(:,2), i)); ...
                                  (1 - P) .* (X(triplets(:,1), i) - X(triplets(:,3), i))], [N 1]);                
            else                
                dC(:,i) = accumarray([triplets(:,1); triplets(:,2); triplets(:,3)], ...
                           -2 .* [P .* (1 - P) .* (X(triplets(:,1), i) - X(triplets(:,2), i)) - ...
                                  P .* (1 - P) .* (X(triplets(:,1), i) - X(triplets(:,3), i)); ...
                                 -P .* (1 - P) .* (X(triplets(:,1), i) - X(triplets(:,2), i)); ...
                                  P .* (1 - P) .* (X(triplets(:,1), i) - X(triplets(:,3), i))], [N 1]);
            end
        end
        dC = -dC(:) + 2 .* lambda .* x;
    end
    