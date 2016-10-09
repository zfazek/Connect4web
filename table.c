#include "table.h"

#include <stdio.h>

int get_opposite_color(int color) {
    if (color == WHITE) {
        return BLACK;
    } else if (color == BLACK) {
        return WHITE;
    } else {
        return EMPTY;
    }
}

void init_table() {
    for (int i = 0; i < X_SIZE; i++) {
        for (int j = 0; j < Y_SIZE; j++) {
            table[i][j] = EMPTY;
        }
    }
}

void move(int x, int color) {
    int y = 0;
    while (table[x][y++] != EMPTY) {}
    table[x][--y] = color;
}

static int is_end_game_horizontal(int color) {
    for (int y = 0; y < Y_SIZE; y++) {
        for (int init = 0; init <= X_SIZE - 4; init++) {
            int found = 0;
            for(int x = init; x < X_SIZE; x++) {
                if (table[x][y] != color) {
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

static int is_end_game_vertical(int color) {
    for (int x = 0; x < X_SIZE; x++) {
        for (int init = 0; init <= Y_SIZE - 4; init++) {
            int found = 0;
            for(int y = init; y < Y_SIZE; y++) {
                if (table[x][y] != color) {
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

static int is_end_game_by_color(int color) {
    if (is_end_game_horizontal(color) != NO_END_GAME) {
        return color;
    }
    if (is_end_game_vertical(color) != NO_END_GAME) {
        return color;
    }
    return NO_END_GAME;
}

int is_end_game() {
    if (is_end_game_by_color(WHITE) == WHITE) {
        return WHITE;
    }
    if (is_end_game_by_color(BLACK) == BLACK) {
        return BLACK;
    }
    return NO_END_GAME;
}

int is_legal_move(int x) {
    if (x < 0 || x >= X_SIZE) {
        return FALSE;
    }
    if (table[x][Y_SIZE - 1] == EMPTY) {
        return TRUE;
    } else {
        return FALSE;
    }
}

void print_table() {
    char c;
    for (int y = Y_SIZE - 1; y >= 0; y--) {
        for (int x = 0; x < X_SIZE; x++) {
            switch(table[x][y]) {
                case EMPTY:
                    c = '.';
                    break;
                case WHITE:
                    c = 'X';
                    break;
                case BLACK:
                    c = 'O';
                    break;
            }
            printf("%c ", c);
        }
        puts("");
    }
    puts("");
}
