const X_SIZE = 7;
const Y_SIZE = 6;

const EMPTY = 0;
const RED = 1;
const YELLOW = 2;
const END = 3;

const STATE_PLAYER_MOVES = 0;
const STATE_COMPUTER_MOVES = 1;
const STATE_END = 2;

const NO_BEST_MOVE = -1;
const NO_END_GAME = 0;
const DRAW = 3;

let number_of_games = 10;

let table = [];
let moves = [];

let color_to_move;
let best_move;
let state;

function main() {
    state = STATE_COMPUTER_MOVES;
    color_to_move = RED;
    init_table();
    if (state == STATE_COMPUTER_MOVES) {
        computer_moves();
    }
}

function myMousePressed() {
    if (state != STATE_PLAYER_MOVES) {
        return;
    }
    let x = Math.floor(mouseX / (WIDTH / X_SIZE));
    if (is_legal_move(x)) {
        move(x);
        if (is_end_game() != NO_END_GAME) {
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
    best_move = get_best_move(number_of_games);
    if (best_move == -1) {
        game_ends();
    }
    move(best_move);
    if (is_end_game() != NO_END_GAME) {
        game_ends();
    } else {
        state = STATE_PLAYER_MOVES;
    }
}

function game_ends() {
    state = STATE_END;
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

function get_opposite_color() {
    if (color_to_move == RED) {
        return YELLOW;
    } else {
        return RED;
    }
}

