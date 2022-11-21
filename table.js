function move(table, x) {
    let y = 0;
    while (table[y++ * X_SIZE + x] != EMPTY) {
    }
    table[--y * X_SIZE + x] = color_to_move;
    moves.push(x);
    color_to_move = get_opposite_color();
}

function take_back() {
    if (moves.length == 0) {
        return;
    }
    let x = moves[moves.length - 1];
    let y = Y_SIZE - 1;
    while (table[y-- * X_SIZE + x] == EMPTY) {
    }
    table[++y * X_SIZE + x] = EMPTY;
    moves.pop();
    color_to_move = get_opposite_color();
    state = STATE_PLAYER_MOVES;
}

function get_legal_moves(table, legal_moves) {
    let number_of_legal_moves = 0;
    for (let i = 0; i < X_SIZE; i++) {
        if (is_legal_move(table, i)) {
            legal_moves[number_of_legal_moves++] = i;
        }
    }
    return number_of_legal_moves;
}

function is_legal_move(table, x) {
    if (x < 0 || x >= X_SIZE) {
        return false;
    }
    if (table[X_SIZE * (Y_SIZE - 1) + x] == EMPTY) {
        return true;
    } else {
        return false;
    }
}

function is_end_game(table) {
    if (is_draw(table)) {
        return DRAW;
    }
    if (is_end_game_by_color(table, YELLOW) == YELLOW) {
        return YELLOW;
    }
    if (is_end_game_by_color(table, RED) == RED) {
        return RED;
    }
    return NO_END_GAME;
}

function is_end_game_horizontal(table, color) {
    for (let y = 0; y < Y_SIZE; y++) {
        for (let init = 0; init <= X_SIZE - 4; init++) {
            let found = 0;
            for (let x = init; x < X_SIZE; x++) {
                if (table[y * X_SIZE + x] != color) {
                    break;
                } else {
                    found++;
                }
                if (found == 4) {
                    return color;
                }
            }
        }
    }
    return NO_END_GAME;
}

function is_end_game_vertical(table, color) {
    for (let x = 0; x < X_SIZE; x++) {
        for (let init = 0; init <= Y_SIZE - 4; init++) {
            let found = 0;
            for (let y = init; y < Y_SIZE; y++) {
                if (table[y * X_SIZE + x] != color) {
                    break;
                } else {
                    found++;
                }
                if (found == 4) {
                    return color;
                }
            }
        }
    }
    return NO_END_GAME;
}

function is_end_game_diagonal(table, color) {
    for (let x = 0; x <= X_SIZE - 4; x++) {
        for (let y = 0; y <= Y_SIZE - 4; y++) {
            let found = 0;
            for (let i = 0; i < 4; i++) {
                if (table[(y + i) * X_SIZE + x + i] != color) {
                    break;
                } else {
                    found++;
                }
                if (found == 4) {
                    return color;
                }
            }
        }
    }
    for (let x = 0; x <= X_SIZE - 4; x++) {
        for (let y = Y_SIZE - 1; y >= 3; y--) {
            let found = 0;
            for (let i = 0; i < 4; i++) {
                if (table[(y - i) * X_SIZE + x + i] != color) {
                    break;
                } else {
                    found++;
                }
                if (found == 4) {
                    return color;
                }
            }
        }
    }
    return NO_END_GAME;
}

function is_end_game_by_color(table, color) {
    if (is_end_game_horizontal(table, color) != NO_END_GAME) {
        return color;
    }
    if (is_end_game_vertical(table, color) != NO_END_GAME) {
        return color;
    }
    if (is_end_game_diagonal(table, color) != NO_END_GAME) {
        return color;
    }
    return NO_END_GAME;
}

function is_draw(table) {
    for (let i = 0; i < X_SIZE * Y_SIZE; i++) {
        if (table[i] == EMPTY) {
            return false;
        }
    }
    return true;
}

