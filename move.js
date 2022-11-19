function get_best_move_monkey(table) {
    while (true) {
        let m = get_random_int(X_SIZE);
        if (is_legal_move(table, m))
            return m;
    }
}


function get_best_move(table, color, number_of_games) {
    let legal_moves = [];
    let num_legal_moves = get_legal_moves(table, legal_moves);
    if (num_legal_moves == 0) {
        return -1;
    }
    return get_best_move_monkey(table);
}

function get_random_int(max) {
  return Math.floor(Math.random() * max);
}
