// Meglépi a lépést, eltárolja a korongot a table array-ben
// color_to_move változó értékét átállítja az ellenfelére!
//
// paraméterek:
//     x oszlop indexe. pl. 0
//     store_to_moves boolean, eltárolja-e a lépést a lépés előzmények között
function make_move(x, store_to_moves = true) {
    let y = 0;
    while (table[y++ * X_SIZE + x] != EMPTY) {}
    table[--y * X_SIZE + x] = color_to_move;
    if (store_to_moves) {
        moves.push(x);
    }
    color_to_move = get_opposite_color();
}

function take_back() {
    if (moves.length == 0) {
        return;
    }
    let x = moves[moves.length - 1];
    let y = Y_SIZE - 1;
    while (table[y-- * X_SIZE + x] == EMPTY) {}
    table[++y * X_SIZE + x] = EMPTY;
    moves.pop(x);
    color_to_move = get_opposite_color();
    state = STATE_PLAYER_MOVES;
}

function get_legal_moves(legal_moves) {
    let number_of_legal_moves = 0;
    for (let i = 0; i < X_SIZE; i++) {
        if (is_legal_move(i)) {
            legal_moves[number_of_legal_moves++] = i;
        }
    }
    return number_of_legal_moves;
}

// Visszadja, hogy a lépés legális-e
// Ha az oszlop tele van, ez nem egy legális lépés
//
// paraméterek:
//     x lépés index. pl. 0
function is_legal_move(x) {
    if (x < 0 || x >= X_SIZE) {
        return false;
    }
    if (table[X_SIZE * (Y_SIZE - 1) + x] == EMPTY) {
        return true;
    } else {
        return false;
    }
}

function is_game_over() {
    if (is_draw()) {
        return STATE_DRAW;
    }
    if (is_game_over_by_color(YELLOW) == YELLOW) {
        return STATE_YELLOW_WON;
    }
    if (is_game_over_by_color(RED) == RED) {
        return STATE_RED_WON;
    }
    return STATE_NO_GAME_OVER;
}

function is_game_over_horizontal(color) {
    for (let y = 0; y < Y_SIZE; y++) {
        for (let init = 0; init <= X_SIZE - NUM_DISCS_TO_WIN; init++) {
            let found = 0;
            for (let x = init; x < X_SIZE; x++) {
                if (table[y * X_SIZE + x] != color) {
                    break;
                } else {
                    found++;
                }
                if (found == NUM_DISCS_TO_WIN) {
                    return color;
                }
            }
        }
    }
    return STATE_NO_GAME_OVER;
}

function is_game_over_vertical(color) {
    for (let x = 0; x < X_SIZE; x++) {
        for (let init = 0; init <= Y_SIZE - NUM_DISCS_TO_WIN; init++) {
            let found = 0;
            for (let y = init; y < Y_SIZE; y++) {
                if (table[y * X_SIZE + x] != color) {
                    break;
                } else {
                    found++;
                }
                if (found == NUM_DISCS_TO_WIN) {
                    return color;
                }
            }
        }
    }
    return STATE_NO_GAME_OVER;
}

function is_game_over_diagonal(color) {
    for (let x = 0; x <= X_SIZE - NUM_DISCS_TO_WIN; x++) {
        for (let y = 0; y <= Y_SIZE - NUM_DISCS_TO_WIN; y++) {
            let found = 0;
            for (let i = 0; i < NUM_DISCS_TO_WIN; i++) {
                if (table[(y + i) * X_SIZE + x + i] != color) {
                    break;
                } else {
                    found++;
                }
                if (found == NUM_DISCS_TO_WIN) {
                    return color;
                }
            }
        }
    }
    for (let x = 0; x <= X_SIZE - NUM_DISCS_TO_WIN; x++) {
        for (let y = Y_SIZE - 1; y >= NUM_DISCS_TO_WIN - 1; y--) {
            let found = 0;
            for (let i = 0; i < NUM_DISCS_TO_WIN; i++) {
                if (table[(y - i) * X_SIZE + x + i] != color) {
                    break;
                } else {
                    found++;
                }
                if (found == NUM_DISCS_TO_WIN) {
                    return color;
                }
            }
        }
    }
    return STATE_NO_GAME_OVER;
}

function is_game_over_by_color(color) {
    if (is_game_over_horizontal(color) != STATE_NO_GAME_OVER) {
        return color;
    }
    if (is_game_over_vertical(color) != STATE_NO_GAME_OVER) {
        return color;
    }
    if (is_game_over_diagonal(color) != STATE_NO_GAME_OVER) {
        return color;
    }
    return STATE_NO_GAME_OVER;
}

function is_draw() {
    for (let i = 0; i < X_SIZE * Y_SIZE; i++) {
        if (table[i] == EMPTY) {
            return false;
        }
    }
    return true;
}

