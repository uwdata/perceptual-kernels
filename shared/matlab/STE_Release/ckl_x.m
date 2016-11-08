function X = ckl_x(triplets, no_dims, mu, init_X)
%CKL_K Crowd kernel learning
%
%   X = ckl_x(triplets, no_dims, mu, init_X)
% 
% The function implements crowd-kernel learning (CKL) based on the
% specified triplets, using parameter mu. The function returns the learned 
% embedding X. The embedding has dimensionality no_dims.
%
% Note: This function directly learns X.
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
    if exist('init_X', 'var') && ~isempty(init_X)
        X = init_X;
        clear init_X
    else
        X = randn(N, no_dims) .* .0001;
    end    
    C = Inf;
    
    % Set learning parameters
    tol = 1e-7;             % convergence tolerance    
    max_iter = 1000;        % maximum number of iterations
    eta = .00001;           % learning rate
    best_C = Inf;           % best error obtained so far
    best_X = X;             % best embedding found so far
    
    % Perform main learning iterations
    iter = 0; no_incr = 0;
    while iter < max_iter && no_incr < 5
        
        % Perform gradient update
        old_C = C;
        [C, dC] = ckl_x_grad(X(:), N, no_dims, triplets, mu);
        X = X - (eta ./ no_triplets .* N) * reshape(dC, [N no_dims]);
        
        % Maintain best solution found so far
        if C < best_C
            best_C = C;
            best_X = X;
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
            sum_X = sum(X .^ 2, 2);
            D = bsxfun(@plus, bsxfun(@plus, -2 .* (X * X'), sum_X), sum_X');
            no_viol = sum(D(sub2ind([N N], triplets(:,1), triplets(:,2))) > ...
                          D(sub2ind([N N], triplets(:,1), triplets(:,3))));
            disp(['Iteration ' num2str(iter) ': error is ' num2str(C) ...
                  ', number of constraints: ' num2str(no_viol ./ no_triplets)]);
        end
    end
    
    % Return best embedding
    X = best_X;
    