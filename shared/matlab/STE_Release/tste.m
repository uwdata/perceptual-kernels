function X = tste(triplets, no_dims, lambda, alpha, use_log)
%TSTE t-Distributed Stochastic Triplet Embedding
%
%   X = tste(triplets, no_dims, lambda, alpha, use_log)
% 
% The function implements t-distributed stochastic triplet embedding (t-STE) 
% based on the specified triplets, to construct an embedding with no_dims 
% dimensions. The parameter lambda specifies the amount of L2-
% regularization (default = 0), whereas alpha sets the number of degrees of
% freedom of the Student-t distribution (default = 1). The variable use_log
% determines whether the sum of the log-probabilities or the sum of the
% probabilities is maximized (default = true).
%
% Note: This function directly learns the embedding X.
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
    if ~exist('alpha', 'var') || isempty(alpha)
        alpha = no_dims - 1;
    end
    if ~exist('use_log', 'var') || isempty(use_log)
        use_log = true;
    end
    addpath(genpath('minFunc'));
    
    % Determine number of objects
    N = max(triplets(:));
    triplets(any(triplets == -1, 2),:) = [];    
    no_triplets = size(triplets, 1);
    
    % Initialize some variables
    X = randn(N, no_dims) .* .0001;
    C = Inf;
    tol = 1e-7;             % convergence tolerance    
    max_iter = 1000;        % maximum number of iterations
    eta = 2;                % learning rate
    best_C = Inf;           % best error obtained so far
    best_X = X;             % best embedding found so far
    
    % Perform main learning iterations
    iter = 0; no_incr = 0;
    while iter < max_iter && no_incr < 5
                
        % Compute value of slack variables, cost function, and gradient
        old_C = C;
        checkgrad('tste_grad', X(:), 1e-7, N, no_dims, triplets, lambda, alpha, use_log), pause
        [C, G] = tste_grad(X(:), N, no_dims, triplets, lambda, alpha, use_log);
        
        % Maintain best solution found so far
        if C < best_C
            best_C = C;
            best_X = X;
        end
        
        % Perform gradient update        
        X = X - (eta ./ no_triplets .* N) .* reshape(G, [N no_dims]);
        
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
            sum_X = sum(X .^ 2, 2);
            D = bsxfun(@plus, sum_X, bsxfun(@plus, sum_X', -2 * (X * X')));
            no_viol = sum(D(sub2ind([N N], triplets(:,1), triplets(:,2))) > ...
                          D(sub2ind([N N], triplets(:,1), triplets(:,3))));
            disp(['Iteration ' num2str(iter) ': error is ' num2str(C) ...
                  ', number of constraints: ' num2str(no_viol ./ no_triplets)]);
        end
    end
    
    % Return best embedding
    X = best_X;
