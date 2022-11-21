function get_best_move(table, number_of_games) {
    let legal_moves = [];
    let num_legal_moves = get_legal_moves(table, legal_moves);
    if (num_legal_moves == 0) {
        return -1;
    }
    let m = can_win(table, legal_moves);
    if (m != -1) {
        return m;
    }
    m = can_save(table, legal_moves);
    if (m != -1) {
        return m;
    }
    return get_best_move_monkey(table);
}

function can_win(table, legal_moves) {
    for (let i = 0; i < legal_moves.length; i++) {
        let m = legal_moves[i];
        move(table, m);
        if (is_end_game(table) == get_opposite_color(color_to_move)) {
            take_back();
            return m;
        }
        take_back();
    }
    return -1;
}

function can_save(table, legal_moves) {
    color_to_move = get_opposite_color();
    for (let i = 0; i < legal_moves.length; i++) {
        let m = legal_moves[i];
        move(table, m);
        if (is_end_game(table) == get_opposite_color(color_to_move)) {
            take_back();
            color_to_move = get_opposite_color();
            return m;
        }
        take_back();
    }
    color_to_move = get_opposite_color();
    return -1;
}

function get_best_move_monkey(table) {
    while (true) {
        let m = get_random_int(X_SIZE);
        if (is_legal_move(table, m))
            return m;
    }
}

function get_random_int(max) {
  return Math.floor(Math.random() * max);
}
