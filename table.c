#include "table.h"

#include <bsd/stdlib.h>
#include <stdio.h>

int get_best_move(int* table, int color) {
    int m;
    while (1) {
        m = arc4random_uniform(X_SIZE);
        if (is_legal_move(table, m)) {
            return m;
        }
    }
}

int get_opposite_color(int color) {
    if (color == WHITE) {
        return BLACK;
    } else if (color == BLACK) {
        return WHITE;
    } else {
        return EMPTY;
    }
}

void init_table(int* table) {
    for (int y = 0; y < Y_SIZE; y++) {
        for (int x = 0; x < X_SIZE; x++) {
            table[y * X_SIZE + x] = EMPTY;
        }
    }
}

void move(int* table, int x, int color) {
    int y = 0;
    while (table[y++ * X_SIZE + x] != EMPTY) {}
    table[--y * X_SIZE + x] = color;
}

static int is_end_game_horizontal(int* table, int color) {
    for (int y = 0; y < Y_SIZE; y++) {
        for (int init = 0; init <= X_SIZE - 4; init++) {
            int found = 0;
            for (int x = init; x < X_SIZE; x++) {
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

static int is_end_game_vertical(int* table, int color) {
    for (int x = 0; x < X_SIZE; x++) {
        for (int init = 0; init <= Y_SIZE - 4; init++) {
            int found = 0;
            for (int y = init; y < Y_SIZE; y++) {
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

static int is_end_game_diagonal(int* table, int color) {
    for (int x = 0; x < X_SIZE - 4; x++) {
        for (int y = 0; y < Y_SIZE - 4; y++) {
            int found = 0;
            for (int i = 0; i < 4; i++) {
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
    for (int x = 0; x < X_SIZE - 4; x++) {
        for (int y = Y_SIZE - 1; y >= 3; y--) {
            int found = 0;
            for (int i = 0; i < 4; i++) {
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

static int is_end_game_by_color(int* table, int color) {
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

int is_end_game(int* table) {
    if (is_end_game_by_color(table, WHITE) == WHITE) {
        return WHITE;
    }
    if (is_end_game_by_color(table, BLACK) == BLACK) {
        return BLACK;
    }
    return NO_END_GAME;
}

int is_legal_move(int* table, int x) {
    if (x < 0 || x >= X_SIZE) {
        return FALSE;
    }
    if (table[X_SIZE * (Y_SIZE - 1) + x] == EMPTY) {
        return TRUE;
    } else {
        return FALSE;
    }
}

void print_table(int* table) {
    char c;
    for (int y = Y_SIZE - 1; y >= 0; y--) {
        for (int x = 0; x < X_SIZE; x++) {
            switch(table[y * X_SIZE + x]) {
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
