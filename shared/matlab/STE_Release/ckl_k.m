function [K, X] = ckl_k(triplets, mu, no_dims, init_K)
%CKL_K Crowd kernel learning
%
%   K = ckl_k(triplets, mu)
%   [K, X] = ckl_k(triplets, mu, no_dims, init_K)
% 
% The function implements crowd-kernel learning (CKL) based on the
% specified triplets, using parameter mu. The function returns both the 
% learned kernel K and the corresponding embedding X. The embedding has 
% dimensionality no_dims.
%
% Note: This function directly learns K.
%
%
% (C) Laurens van der Maaten, 2012
% Delft University of Technology


    if ~exist('no_dims', 'var') || isempty(no_dims)
        no_dims = 2;
    end
    addpath(genpath('minFunc'));
    
    % Initialize some variables
    N = max(triplets(:));
    triplets(any(triplets == -1, 2),:) = [];    
    no_triplets = size(triplets, 1);
    if exist('init_K', 'var') && ~isempty(init_K)
        K = init_K;
        clear init_K
    else
        K = randn(N, no_dims) * .1;
        K = K * K';
    end
    C = Inf;
    
    % Set learning parameters
    tol = 1e-7;             % convergence tolerance    
    max_iter = 1000;        % maximum number of iterations
    eta = .00001;           % learning rate
    best_C = Inf;           % best error obtained so far
    best_K = K;             % best embedding kernel found so far
    
    % Perform main learning iterations
    iter = 0; no_incr = 0;
    while iter < max_iter && no_incr < 5
        
        % Perform gradient update
        old_C = C;
        [C, dC] = ckl_k_grad(K(:), triplets, mu);       
        K = K - (eta ./ no_triplets .* N) * reshape(dC, [N N]);
        
        % Project kernel back onto the PSD cone
        [V, L] = eig(K);
        V = real(V); L = real(L);
        ind = find(diag(L) > 0);
        if isempty(ind)
            warning('Projection onto PSD cone failed. All eigenvalues were negative.'); break
        end
        K = V(:,ind) * L(ind, ind) * V(:,ind)';
        if any(isinf(K(:)))
            warning('Projection onto PSD cone failed. Metric contains Inf values.'); break
        end
        if any(isnan(K(:)))
            warning('Projection onto PSD cone failed. Metric contains NaN values.'); break
        end
        
        % Maintain best solution found so far
        if C < best_C
            best_C = C;
            best_K = K;
        end
        
        % Update learning rate
        if old_C > C + tol
            no_incr = 0;
            eta = eta * 1.01;
        else
            no_incr = no_incr + 1;
            eta = eta * .5;
        end
        
        % Print out progress
        iter = iter + 1;
        if ~rem(iter, 10)
            D = bsxfun(@plus, bsxfun(@plus, -2 .* K, diag(K)), diag(K)');
            no_viol = sum(D(sub2ind([N N], triplets(:,1), triplets(:,2))) > ...
                          D(sub2ind([N N], triplets(:,1), triplets(:,3))));
            disp(['Iteration ' num2str(iter) ': error is ' num2str(C) ...
                  ', number of constraints: ' num2str(no_viol ./ no_triplets)]);
        end
    end
    
    % Return best kernel
    K = best_K;
    
    % Compute low-dimensional embedding as well        
    if nargout > 1            
        [X, L, ~] = svd(K);
        X = bsxfun(@times, sqrt(diag(L(1:no_dims, 1:no_dims)))', X(:,1:no_dims));
    end
    