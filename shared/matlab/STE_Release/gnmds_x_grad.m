function [C, dC, slack] = gnmds_x_grad(x, N, no_dims, triplets, loss, lambda)
%GNMDS_X_GRAD Gradient of generalized non-metric MDS
%
%   [C, dC, slack] = gnmds_x_grad(x, N, no_dims, triplets, loss, lambda)
%
% The function computes the cost function and corresponding gradient of
% GNMDS with respect to an embedding X.
%
%
% (C) Laurens van der Maaten, 2012
% Delft University of Technology


    % Decode solution
    X = reshape(x, [N no_dims]);
    
    % Compute pairwise distances under embedding
    sum_X = sum(X .^ 2, 2);
    D = bsxfun(@plus, sum_X, bsxfun(@plus, sum_X', -2 * (X * X')));

    % Compute value of slack variables
    switch loss
        case 'hinge'
            slack = max(D(sub2ind([N N], triplets(:,1), triplets(:,2))) + 1 - ...
                        D(sub2ind([N N], triplets(:,1), triplets(:,3))), 0);
        case 'smooth_hinge'
            weights = exp(1 + D(sub2ind([N N], triplets(:,1), triplets(:,2))) - ...
                              D(sub2ind([N N], triplets(:,1), triplets(:,3))));
            slack = log(1 + weights);
            weights = weights ./ (1 + weights);
        case 'log'
            weights = exp(D(sub2ind([N N], triplets(:,1), triplets(:,2))) - ...
                          D(sub2ind([N N], triplets(:,1), triplets(:,3))));
            slack = log(1 + weights);
            weights = weights ./ (1 + weights);
        case 'exp'
            slack = exp(D(sub2ind([N N], triplets(:,1), triplets(:,2))) - ...
                        D(sub2ind([N N], triplets(:,1), triplets(:,3))));
            weights = slack;
        otherwise
            error('Unknown loss function.');
    end

    % Compute value of cost function
    C = sum(slack(:)) + lambda .* sum(x .^ 2);
    
    % Compute gradient only when requested
    if nargout > 1
        
        % Sum gradient
        G = zeros(N, no_dims);
        viol = (slack > 0);
        for i=1:no_dims
            switch loss
                case 'hinge'
                    G(:,i) = accumarray([triplets(viol, 1); triplets(viol, 2); triplets(viol, 3)], ...
                                    [2 .* (X(triplets(viol, 1), i) - X(triplets(viol, 2), i))  ...
                                   - 2 .* (X(triplets(viol, 1), i) - X(triplets(viol, 3), i)); ...
                                   - 2 .* (X(triplets(viol, 1), i) - X(triplets(viol, 2), i)); ...  
                                     2 .* (X(triplets(viol, 1), i) - X(triplets(viol, 3), i))], [N 1]);
                case {'smooth_hinge', 'log', 'exp'}
                    G(:,i) = accumarray([triplets(:,1); triplets(:,2); triplets(:,3)], ...
                                    [2 .* weights .* (X(triplets(:,1), i) - X(triplets(:,2), i))  ...
                                   - 2 .* weights .* (X(triplets(:,1), i) - X(triplets(:,3), i)); ...
                                   - 2 .* weights .* (X(triplets(:,1), i) - X(triplets(:,2), i)); ...  
                                     2 .* weights .* (X(triplets(:,1), i) - X(triplets(:,3), i))], [N 1]);
            end
        end
        dC = G(:) + lambda .* 2 .* x;
    end    
    