function get_best_move() {
    level = ($("#level").val());
    console.log(level);
    let legal_moves = [];
    let num_legal_moves = get_legal_moves(legal_moves);
    if (num_legal_moves == 0) {
        return NO_BEST_MOVE;
    }
    if (level == 1) {
        return get_best_move_monkey();
    }
    if (level == 2) {
        let m = can_win(legal_moves);
        if (m != NO_BEST_MOVE) {
            return m;
        }
        return get_best_move_monkey();
    }
    if (level == 3) {
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
    return best_move_monte_carlo(legal_moves);
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

function can_win(legal_moves) {
    for (let i = 0; i < legal_moves.length; i++) {
        let m = legal_moves[i];
        move(m, true);
        if (is_end_game() == get_opposite_color(color_to_move)) {
            take_back();
            return m;
        }
        take_back();
    }
    return NO_BEST_MOVE;
}

function can_save(legal_moves) {
    color_to_move = get_opposite_color();
    for (let i = 0; i < legal_moves.length; i++) {
        let m = legal_moves[i];
        move(m, true);
        if (is_end_game() == get_opposite_color(color_to_move)) {
            take_back();
            color_to_move = get_opposite_color();
            return m;
        }
        take_back();
    }
    color_to_move = get_opposite_color();
    return NO_BEST_MOVE;
}

function get_best_move_monkey() {
    while (true) {
        let m = get_random_int(X_SIZE);
        if (is_legal_move(m))
            return m;
    }
}

function get_random_int(max) {
    return Math.floor(Math.random() * max);
}
