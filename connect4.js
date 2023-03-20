const X_SIZE = 7;
const Y_SIZE = 6;
const NUM_DISCS_TO_WIN = 4;

const EMPTY = 0;
const RED = 1;
const YELLOW = 2;

const STATE_PLAYER_MOVES = 0;
const STATE_COMPUTER_MOVES = 1;
const STATE_END = 2;
const STATE_NO_GAME_OVER = 3;
const STATE_DRAW = 4;
const STATE_RED_WON = RED;
const STATE_YELLOW_WON = YELLOW;

const NO_BEST_MOVE = -1;

const NUMBER_OF_GAMES = 1000;

let table = [];
let moves = [];

let color_to_move;
let best_move;
let state;
let level;

function main() {
    color_to_move = RED;
    init_table();
    computer_moves();
}

function myMousePressed() {
    if (state != STATE_PLAYER_MOVES) {
        return;
    }
    let x = Math.floor(mouseX / (WIDTH / X_SIZE));
    if (is_legal_move(x)) {
        move(x, true);
        if (is_end_game() != STATE_NO_GAME_OVER) {
            state = STATE_END;
            return;
        }
        computer_moves();
    }
}

function ai() {
    if (state == STATE_PLAYER_MOVES) {
        computer_moves();
    }
}

function computer_moves() {
    state = STATE_COMPUTER_MOVES;
    best_move = get_best_move();
    move(best_move, true);
    if (is_end_game() == STATE_NO_GAME_OVER) {
        state = STATE_PLAYER_MOVES;
    } else {
        state = STATE_END;
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

function get_opposite_color() {
    if (color_to_move == RED) {
        return YELLOW;
    } else {
        return RED;
    }
}

