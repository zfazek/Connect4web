function get_best_move() {
    level = ($("#level").val());

    // Generate all the legal moves
    let legal_moves = [];
    let num_legal_moves = get_legal_moves(legal_moves);

    // If there is no legal moves, return NO_BEST_MOVE
    if (num_legal_moves == 0) {
        return NO_BEST_MOVE;
    }

    // Check level
    if (level == 1) {
        return get_best_move_monkey();
    } else if (level == 2) {
        let m = can_win(legal_moves);
        if (m != NO_BEST_MOVE) {
            return m;
        }

        // If no immedate win, make random move
        return get_best_move_monkey();
    } else if (level == 3) {
        return get_good_move();
    } else {
        return best_move_monte_carlo(legal_moves);
    }
}

function get_good_move() {
    let legal_moves = [];
    let num_legal_moves = get_legal_moves(legal_moves);
    let m = can_win(legal_moves);
    if (m != NO_BEST_MOVE) {
        return m;
    }
    m = can_save(legal_moves);
    if (m != NO_BEST_MOVE) {
        return m;
    }
    return get_best_move_monkey();
}

function get_random_int(max) {
    return Math.floor(Math.random() * max);
}

// Returns a random move
// Move is the index of the column
// Move is an integer from 0 to 6
// If the given column is full, it is not a legal move
// Repeat generating random integers until the given column is not full
// and legal move could be made
function get_best_move_monkey() {
    while (true) {
        let m = get_random_int(X_SIZE);
        if (is_legal_move(m))
            return m;
    }
}

// Returns the move which the game can win by one move
//
// Check all the legal moves
// Make each move. Hint: use move() function
// Check if game is over: Hint: use is_game_over() function
// Hint: move() function changes color_to_move to next player`s color
// Hint: use get_opposite_color() function to get the other player`s color
//
// If it wins the game, return that move
// If there is no move to win in one move, return NO_BEST_MOVE
// Take back last move. Hint: use take_back() function
//
// params:
//      legal_moves: array of indices of legal moves
//      e.g. [0, 1, 2, 6]
function can_win(legal_moves) {
    for (let i = 0; i < legal_moves.length; i++) {
        let m = legal_moves[i];
        move(m, true);
        if (is_game_over() == get_opposite_color()) {
            take_back();
            return m;
        }
        take_back();
    }
    return NO_BEST_MOVE;
}

// Returns the move which should take in order to not to lose the game
// immediately
//
// Hint: Try to reuse can_win() function
// Hint: To change the color of the nex player,
// use: color_to_move = get_opposite_color()
// Hint: Do not forget to change the color back!
//
// params:
//      legal_moves: array of indices of legal moves
//      e.g. [0, 1, 2, 6]
function can_save(legal_moves) {
    color_to_move = get_opposite_color();
    let m = can_win(legal_moves);
    color_to_move = get_opposite_color();
    return m;
}
