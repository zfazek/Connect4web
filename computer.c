#include "computer.h"
#include "table.h"

#include <bsd/stdlib.h>

static int get_best_move_monkey(const int* table, const int color) {
    int m;
    while (1) {
        m = arc4random_uniform(X_SIZE);
        if (is_legal_move(table, m)) {
            return m;
        }
    }
}

static int is_win_in_one_move(const int* t, const int color) {
    int table[X_SIZE * Y_SIZE];
    copy_table(t, table);
    for (int i = 0; i < X_SIZE; i++) {
        if (is_legal_move(table, i)) {
            move(table, i, color);
            if (is_end_game(table) == color) {
                return color;
            }
            take_back(table, i);
        }
    }
    return NO_END_GAME;
}

static int play_one_game(int* table, int color) {
    if (is_win_in_one_move(table, color) == color) {
        return color;
    }
    while (1) {
        const int winner = is_end_game(table);
        if (winner != NO_END_GAME) {
            return winner;
        }
        int m = get_best_move_monkey(table, color);
        move(table, m, color);
        color = get_opposite_color(color);
    }
}

static int get_move_with_most_wins(const int* number_of_wins) {
    int move_with_most_wins;
    int max = -1;
    for (int i = 0; i < X_SIZE; i++) {
        if (number_of_wins[i] > max) {
            max = number_of_wins[i];
            move_with_most_wins = i;
        }
    }
    if (max == 0) {
        return NO_BEST_MOVE;
    }
    return move_with_most_wins;
}

static void init(const int* t, int* number_of_wins, int* table, int* orig_table) {
    for (int x = 0; x < X_SIZE; x++) {
        number_of_wins[x] = 0;
    }
    copy_table(t, table);
    copy_table(t, orig_table);
}

static int get_number_of_wins_per_first_move(int* table, const int* orig_table, const int m, const int color,
        const int number_of_games) {
    int wins = 0;
    for (int n = 0; n < number_of_games; n++) {
        move(table, m, color);
        const int winner = play_one_game(table, get_opposite_color(color));
        if (winner == color) {
            wins++;
        }
        copy_table(orig_table, table);
    }
    return wins;
}

static int get_best_move_monte_carlo(const int* t, const int color, const int number_of_games) {
    int legal_moves[X_SIZE];
    int number_of_legal_moves = get_legal_moves(t, legal_moves);
    if (number_of_legal_moves == 1) {
        return legal_moves[0];
    }

    int number_of_wins[X_SIZE];
    int table[X_SIZE * Y_SIZE];
    int orig_table[X_SIZE * Y_SIZE];
    init(t, number_of_wins, table, orig_table);

    for (int i = 0; i < number_of_legal_moves; i++) {
        number_of_wins[legal_moves[i]] =
            get_number_of_wins_per_first_move(table, orig_table, legal_moves[i], color, number_of_games);
        printf("%d: %6d\n", legal_moves[i], number_of_wins[legal_moves[i]]);
    }
    puts("");
    const int best_move = get_move_with_most_wins(number_of_wins);
    if (best_move == NO_BEST_MOVE) {
        return get_best_move_monkey(table, color);
    }
    return best_move;
}

int get_best_move(const int* table, const int color, const int number_of_games) {
    return get_best_move_monte_carlo(table, color, number_of_games);
}
