function [C, dC] = ckl_x_grad(x, N, no_dims, triplets, mu)
%CKL_X_GRAD Gradient of crowd kernel learning (w.r.t. X)
%
%   [C, dC] = ckl_x_grad(x, N, no_dims, triplets, mu)
%
% The function computed the CKL cost function value and the corresponding
% gradient.
%
%
% (C) Laurens van der Maaten, 2012
% Delft University of Technology


    % Decode solution
    X = reshape(x, [N no_dims]);
    
    % Compute probabilities
    sum_X = sum(X .^ 2, 2);
    D = bsxfun(@plus, bsxfun(@plus, -2 .* (X * X'), sum_X), sum_X');
    nom =     mu + D(sub2ind([N N], triplets(:,1), triplets(:,3)));
    den = 2 * mu + D(sub2ind([N N], triplets(:,1), triplets(:,3))) ...
                 + D(sub2ind([N N], triplets(:,1), triplets(:,2)));
    nom = max(nom, realmin);
    den = max(den, realmin);
    
    % Compute value for cost function
    C = -sum(log(nom) - log(den));
    
    % Compute gradient of cost function
    if nargout > 1
        dC = zeros(N, no_dims);
        for d=1:no_dims
            dC(:,d) = dC(:,d) + accumarray(triplets(:,1),  2 ./ nom .*  (X(triplets(:,1), d) - X(triplets(:,3), d)) - ...
                                                           2 ./ den .* ((X(triplets(:,1), d) - X(triplets(:,2), d)) + ...
                                                                        (X(triplets(:,1), d) - X(triplets(:,3), d))), [N 1]);
            dC(:,d) = dC(:,d) + accumarray(triplets(:,2),  2 ./ den .*  (X(triplets(:,1), d) - X(triplets(:,2), d)),  [N 1]);
            dC(:,d) = dC(:,d) + accumarray(triplets(:,3), -2 ./ nom .* (X(triplets(:,1), d) - X(triplets(:,3), d)) + ...
                                                           2 ./ den .* (X(triplets(:,1), d) - X(triplets(:,3), d)), [N 1]);                                                         
        end
        dC = -dC(:);
    end