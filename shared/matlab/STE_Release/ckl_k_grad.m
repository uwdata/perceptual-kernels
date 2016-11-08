function [C, dC] = ckl_k_grad(x, triplets, mu)
%CKL_K_GRAD Gradient of crowd kernel learning (w.r.t. K)
%
%   [C, dC] = ckl_k_grad(x, triplets, mu)
%
% The function computed the CKL cost function value and the corresponding
% gradient.
%
%
% (C) Laurens van der Maaten, 2012
% Delft University of Technology


    % Decode solution
    N = sqrt(numel(x));
    K = reshape(x, [N N]);
    
    % Compute probabilities
    D = bsxfun(@plus, bsxfun(@plus, -2 .* K, diag(K)), diag(K)');
    nom =     mu + D(sub2ind([N N], triplets(:,1), triplets(:,3)));
    den = 2 * mu + D(sub2ind([N N], triplets(:,1), triplets(:,3))) ...
                 + D(sub2ind([N N], triplets(:,1), triplets(:,2)));
    nom = max(nom, realmin);
    den = max(den, realmin);
    
    % Compute value for cost function
    C = -sum(log(nom) - log(den));
    
    % Compute gradient of cost function
    if nargout > 1
        dC = reshape(accumarray(sub2ind([N N], triplets(:,1), triplets(:,1)),  1 ./ nom - 2 ./ den, [N * N 1]) + ...
                     accumarray(sub2ind([N N], triplets(:,2), triplets(:,2)),            -1 ./ den, [N * N 1]) + ...
                     accumarray(sub2ind([N N], triplets(:,3), triplets(:,3)),  1 ./ nom - 1 ./ den, [N * N 1]) + ...
                     accumarray(sub2ind([N N], triplets(:,1), triplets(:,2)),             2 ./ den, [N * N 1]) + ...
                     accumarray(sub2ind([N N], triplets(:,1), triplets(:,3)), -2 ./ nom + 2 ./ den, [N * N 1]), [N N]);
        dC(isnan(dC)) = 0;
        dC = -dC(:);
    end