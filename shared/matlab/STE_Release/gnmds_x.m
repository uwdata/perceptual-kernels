function X = gnmds_x(triplets, no_dims, lambda)
%GNMDS_X Generalized Non-metric Multi-Dimensional Scaling w.r.t. X
%
%   X = gnmds_x(triplets, no_dims, lambda)
%
% The function implements generalized non-metric MDS (GNMDS) based on the 
% specified triplets, to construct an embedding X with no_dims dimensions. 
% The parameter lambda specifies the amount of L2- regularization (default 
% = 0).
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
    addpath(genpath('minFunc'));
    
    % Determine number of objects
    N = max(triplets(:));
    triplets(any(triplets == -1, 2),:) = [];    
    no_triplets = size(triplets, 1);

    % Initialize some variables
    X = randn(N, no_dims) .* .0001;
    tol = 1e-7;                         % convergence tolerance    
    max_iter = 1000;                    % maximum number of iterations
    eta = 1;                            % learning rate
    best_C = Inf;                       % best error obtained so far
    best_X = X;                         % best embedding found so far
    C = Inf;
    
    % Perform main learning iterations
    iter = 0; no_incr = 0;
    while iter < max_iter && (no_incr < 5 || iter < 50)
        
        % Compute value of slack variables, cost function, and gradient
        old_C = C;      
        [C, G, slack] = gnmds_x_grad(X(:), N, no_dims, triplets, 'hinge', lambda);
        
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
            no_slack = sum(slack > 1);
            disp(['Iteration ' num2str(iter) ': error is ' num2str(C) ...
                  ', number of constraints: ' num2str(no_slack ./ no_triplets)]);
        end
    end
    
    % Return best embedding
    X = best_X;
