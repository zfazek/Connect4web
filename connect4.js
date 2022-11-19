let color;
let EMPTY = 0;
let WHITE = 1;
let BLACK = 2;
let END = 3;
let NO_END_GAME = 0;
let NO_BEST_MOVE = -1;
let DRAW = 3;
let number_of_games = 10;

let table = [];
let moves = [];

let moves_idx = 0;
let best_move;
let state;

function main() {
    state = STATE_COMPUTER_MOVES;
    init_table();
    color = WHITE;
    if (state == STATE_COMPUTER_MOVES) {
        computer_moves();
    }
}

function myMousePressed() {
    if (state != STATE_PLAYER_MOVES) {
        return;
    }
    let x = Math.floor(mouseX / (WIDTH / X_SIZE));
    console.log(x);
    if (is_legal_move(table, x)) {
        move(table, x, color);
        color = get_opposite_color(color);
        if (is_end_game(table) != NO_END_GAME) {
            game_ends();
            return;
        }
        state = STATE_COMPUTER_MOVES;
        computer_moves();
    }
}

function ai() {
    if (state == STATE_PLAYER_MOVES) {
        computer_moves();
    }
}

function computer_moves() {
    best_move = get_best_move(table, color, number_of_games);
    if (best_move == -1) {
        game_ends();
    }
    move(table, best_move, color);
    color = get_opposite_color(color);
    if (is_end_game(table) != NO_END_GAME) {
        game_ends();
    }
    state = STATE_PLAYER_MOVES;
}

function game_ends() {
    state = STATE_END;
    console.log("GAME END!");
    print_winner(is_end_game(table));
    console.log("Number of moves: ", moves_idx);
}

function print_winner(winner) {
    switch (winner) {
    case DRAW:
        console.log("DRAW!");
        break;
    case WHITE:
        console.log("RED WON!");
        break;
    case BLACK:
        console.log("YELLOW WON!");
        break;
    }
}

function init_table() {
    table = [];
    moves = [];
    for (let y = 0; y < Y_SIZE; y++) {
        for (let x = 0; x < X_SIZE; x++) {
            table.push(EMPTY);
        }
    }
}

function get_opposite_color(color) {
    if (color == WHITE) {
        return BLACK;
    } else if (color == BLACK) {
        return WHITE;
    } else {
        return EMPTY;
    }
}

