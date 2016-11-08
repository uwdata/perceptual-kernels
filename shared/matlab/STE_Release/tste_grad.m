function [C, dC] = tste_grad(x, N, no_dims, triplets, lambda, alpha, use_log)
%TSTE_GRAD Gradient of t-Distributed Stochastic Triplet Embedding
%
%   [C, dC] = tste_grad(x, N, no_dims, triplets, lambda, alpha, use_log)
%
% The function computes the cost function and corresponding gradient of
% t-STE.
%
%
% (C) Laurens van der Maaten, 2012
% Delft University of Technology


    % Decode current solution
    X = reshape(x, [N no_dims]);
    
    % Compute Student-t kernel
    sum_X = sum(X .^ 2, 2);
    base_K = 1 + bsxfun(@plus, sum_X, bsxfun(@plus, sum_X', -2 * (X * X'))) ./ alpha;
    K = base_K .^ ((alpha + 1) ./ -2);
    
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
        base_K = 1 ./ base_K;
        for i=1:no_dims
            const = (alpha + 1) ./ alpha;
            if use_log
                dC(:,i) = accumarray([triplets(:,1); triplets(:,2); triplets(:,3)], ...
                           -const .* [(1 - P) .* base_K(sub2ind([N N], triplets(:,1), triplets(:,2))) .* (X(triplets(:,1), i) - X(triplets(:,2), i)) - ...
                                      (1 - P) .* base_K(sub2ind([N N], triplets(:,1), triplets(:,3))) .* (X(triplets(:,1), i) - X(triplets(:,3), i)); ...
                                     -(1 - P) .* base_K(sub2ind([N N], triplets(:,1), triplets(:,2))) .* (X(triplets(:,1), i) - X(triplets(:,2), i)); ...
                                      (1 - P) .* base_K(sub2ind([N N], triplets(:,1), triplets(:,3))) .* (X(triplets(:,1), i) - X(triplets(:,3), i))], [N 1]);
            else
                dC(:,i) = accumarray([triplets(:,1); triplets(:,2); triplets(:,3)], ...
                           -const .* [P .* (1 - P) .* base_K(sub2ind([N N], triplets(:,1), triplets(:,2))) .* (X(triplets(:,1), i) - X(triplets(:,2), i)) - ...
                                      P .* (1 - P) .* base_K(sub2ind([N N], triplets(:,1), triplets(:,3))) .* (X(triplets(:,1), i) - X(triplets(:,3), i)); ...
                                     -P .* (1 - P) .* base_K(sub2ind([N N], triplets(:,1), triplets(:,2))) .* (X(triplets(:,1), i) - X(triplets(:,2), i)); ...
                                      P .* (1 - P) .* base_K(sub2ind([N N], triplets(:,1), triplets(:,3))) .* (X(triplets(:,1), i) - X(triplets(:,3), i))], [N 1]);
            end
        end
        dC = -dC(:) + 2 .* lambda .* x;
    end
    