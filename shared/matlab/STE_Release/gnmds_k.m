function [K, X] = gnmds_k(triplets, mu, no_dims)
%GNMDS_K Generalized Non-metric Multi-Dimensional Scaling w.r.t. K
%
%   [K, X] = gnmds_k(triplets, mu, no_dims)
%
% The function implements generalized non-metric MDS (GNMDS) based on the 
% specified triplets, to learn a kernel K and a corresponding embedding X 
% with no_dims dimensions. The parameter lambda specifies the amount of L2-
% regularization (default = 0).
%
% Note: This function learns the kernel K and gets X via an SVD.
%
% 
% (C) Laurens van der Maaten, 2012
% Delft University of Technology


    if ~exist('mu', 'var') || isempty(mu)
        mu = .5;
    end
    if ~exist('no_dims', 'var') || isempty(no_dims)
        no_dims = 2;
    end
    addpath(genpath('minFunc'));
    
    % Determine number of objects
    N = max(triplets(:));
    triplets(any(triplets == -1, 2),:) = [];    
    no_triplets = size(triplets, 1);
    
    % Initialize some variables
    K = randn(N, no_dims) * .1;
    K = K * K';
    tol = 1e-7;             % convergence tolerance
    max_iter = 1000;        % maximum number of iterations
    eta = 1;                % learning rate
    best_C = Inf;           % best error obtained so far
    best_K = K;             % best embedding kernel found so far
    
    % Initialize gradient
    slack = zeros(no_triplets, 1);
    G = (1 - mu) .* eye(N);
    
    % Perform main learning iterations
    iter = 0; no_incr = 0;
    while iter < max_iter && no_incr < 5
        
        % Compute pairwise distances under embedding
        D = bsxfun(@plus, bsxfun(@plus, -2 .* K, diag(K)), diag(K)');
        
        % Compute value of slack variables
        old_slack = slack;
        slack = max(D(sub2ind([N N], triplets(:,1), triplets(:,2))) + 1 - ...
                    D(sub2ind([N N], triplets(:,1), triplets(:,3))), 0);
        
        % Compute value of cost function
        old_C = C;
        C = (1 - mu) .* trace(K) + mu .* sum(slack(:));
        
        % Maintain best solution found so far
        if C < best_C
            best_C = C;
            best_K = K;
        end
        
        % Perform gradient update (incremental update)
        vio_old = (old_slack >  0) & (slack == 0);
        vio_new = (old_slack == 0) & (slack >  0);
        G = G - mu .* reshape(accumarray(sub2ind([N N], triplets(vio_old, 1), triplets(vio_old, 3)), 2, [N * N 1]) - ...
                              accumarray(sub2ind([N N], triplets(vio_old, 1), triplets(vio_old, 2)), 2, [N * N 1]), [N N]);
        G = G + mu .* reshape(accumarray(sub2ind([N N], triplets(vio_new, 1), triplets(vio_new, 3)), 2, [N * N 1]) - ...
                              accumarray(sub2ind([N N], triplets(vio_new, 1), triplets(vio_new, 2)), 2, [N * N 1]), [N N]);
        G(1:N + 1:end) = G(1:N + 1:end) - mu .* (accumarray(triplets(vio_old, 2), 1, [N 1]) ...
                                              -  accumarray(triplets(vio_old, 3), 1, [N 1]))';
        G(1:N + 1:end) = G(1:N + 1:end) + mu .* (accumarray(triplets(vio_new, 2), 1, [N 1]) ...
                                              -  accumarray(triplets(vio_new, 3), 1, [N 1]))';        
        K = K - (eta ./ no_triplets .* N) .* G;
        
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
            no_slack = sum(slack > 1);
            disp(['Iteration ' num2str(iter) ': error is ' num2str(C) ...
                  ', number of constraints: ' num2str(no_slack ./ size(triplets, 1))]);
        end
    end
    
    % Return best kernel
    K = best_K;
    
    % Compute low-dimensional embedding as well        
    if nargout > 1            
        [X, L, ~] = svd(K);
        X = bsxfun(@times, sqrt(diag(L(1:no_dims, 1:no_dims)))', X(:,1:no_dims));
    end
