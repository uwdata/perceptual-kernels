function [K, X] = ste_k(triplets, lambda, no_dims)
%STE_K Stochastic Triplet Embedding
%
%   [K, X] = ste_k(triplets, no_dims, lambda, alpha, use_log)
% 
% The function implements stochastic triplet embedding (STE) based on the 
% specified triplets, to construct an embedding with no_dims dimensions. 
% The parameter lambda specifies the amount of L2-regularization (default =
% 0).
%
% Note: This function learns the kernel K, and gets X via an SVD.
%
%
% (C) Laurens van der Maaten, 2012
% Delft University of Technology


    if ~exist('no_dims', 'var') || isempty(no_dims)
        no_dims = 2;
    end
    if ~exist('lambda', 'var') || isempty(lambda)
        lambda = 0;
    end
    addpath(genpath('minFunc'));
    
    % Determine number of objects
    N = max(triplets(:));
    triplets(any(triplets == -1, 2),:) = [];    
    no_triplets = size(triplets, 1);

    % Initialize some variables
    K = randn(N, no_dims) * .1;
    K = K * K';
    C = Inf;
    tol = 1e-7;             % convergence tolerance    
    max_iter = 2000;        % maximum number of iterations
    eta = 1;                % learning rate
    best_C = Inf;           % best error obtained so far
    best_K = K;             % best kernel found so far
    
    % Perform main learning iterations
    iter = 0; no_incr = 0;
    while iter < max_iter && no_incr < 5
        
        % Compute value of slack variables, cost function, and gradient
        old_C = C;      
        [C, G] = ste_k_grad(K(:), N, triplets, lambda);
        
        % Maintain best solution found so far
        if C < best_C
            best_C = C;
            best_K = K;
        end
        
        % Perform gradient update        
        K = K - (eta ./ no_triplets .* N) .* reshape(G, [N N]);
        
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
    
    % Return best embedding
    K = best_K;

    % Compute low-dimensional embedding as well        
    if nargout > 1            
        [X, L, ~] = svd(K);
        X = bsxfun(@times, sqrt(diag(L(1:no_dims, 1:no_dims)))', X(:,1:no_dims));
    end
