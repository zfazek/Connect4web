#include <assert.h>
#include <stdio.h>

#include "test.h"
#include "table.h"

static void test_is_legal_move() {
    init_table();
    for (int i = 0; i < X_SIZE; i++) {
        assert(TRUE == is_legal_move(i));
    }
    assert(FALSE == is_legal_move(-1));
    assert(FALSE == is_legal_move(X_SIZE));
    table[0][Y_SIZE - 1] = WHITE;
    table[1][Y_SIZE - 1] = BLACK;
    assert(FALSE == is_legal_move(0));
    assert(FALSE == is_legal_move(1));
}

static void test_init_table() {
    init_table();
    for (int i = 0; i < X_SIZE; i++) {
        for (int j = 0; j < Y_SIZE; j++) {
            assert(EMPTY == table[i][j]);
        }
    }
}

static void test_get_opposite_color() {
    assert(EMPTY == get_opposite_color(EMPTY));
    assert(BLACK == get_opposite_color(WHITE));
    assert(WHITE == get_opposite_color(BLACK));
}

static void test_move() {
    init_table();
    for (int y = 0; y < Y_SIZE - 1; y++) {
        move(0, WHITE);
        assert(TRUE == is_legal_move(0));
    }
    move(0, WHITE);
    assert(FALSE == is_legal_move(0));
}

static void test_is_end_game_horizontal_by_color(int color) {
    init_table();
    assert(NO_END_GAME == is_end_game());
    move(0, color);
    assert(NO_END_GAME == is_end_game());
    move(1, color);
    assert(NO_END_GAME == is_end_game());
    move(2, color);
    assert(NO_END_GAME == is_end_game());
    move(3, color);
    assert(color == is_end_game());

    init_table();
    assert(NO_END_GAME == is_end_game());
    move(X_SIZE - 1, color);
    assert(NO_END_GAME == is_end_game());
    move(X_SIZE - 2, color);
    assert(NO_END_GAME == is_end_game());
    move(X_SIZE - 3, color);
    assert(NO_END_GAME == is_end_game());
    move(X_SIZE - 4, color);
    assert(color == is_end_game());
}

static void test_is_end_game_vertical_by_color(int color) {
    init_table();
    assert(NO_END_GAME == is_end_game());
    move(0, color);
    assert(NO_END_GAME == is_end_game());
    move(0, color);
    assert(NO_END_GAME == is_end_game());
    move(0, color);
    assert(NO_END_GAME == is_end_game());
    move(0, color);
    assert(color == is_end_game());

    int opposit_color = get_opposite_color(color);
    init_table();
    assert(NO_END_GAME == is_end_game());
    for (int y = 0; y < Y_SIZE - 4; y++) {
        move(X_SIZE - 1, opposit_color);
    }
    move(X_SIZE - 1, color);
    assert(NO_END_GAME == is_end_game());
    move(X_SIZE - 1, color);
    assert(NO_END_GAME == is_end_game());
    move(X_SIZE - 1, color);
    assert(NO_END_GAME == is_end_game());
    move(X_SIZE - 1, color);
    assert(color == is_end_game());
}

static void test_is_end_game_diagonal_by_color(int color) {
    int opposit_color = get_opposite_color(color);
    init_table();
    assert(NO_END_GAME == is_end_game());
    for (int x = 0; x < 4; x++) {
        for (int y = 0; y <= x; y++) {
            if (x == 3 && y == 0) {
                move(x, color);
            } else {
                move(x, opposit_color);
            }
            print_table();
            if (x == 3 && y == 3) {
                assert(color == is_end_game());
            } else {
                assert(NO_END_GAME == is_end_game());
            }
        }
    }
}

static void test_is_end_game_horizontal() {
    test_is_end_game_horizontal_by_color(WHITE);
    test_is_end_game_horizontal_by_color(BLACK);
}

static void test_is_end_game_vertical() {
    test_is_end_game_vertical_by_color(WHITE);
    test_is_end_game_vertical_by_color(BLACK);
}

static void test_is_end_game_diagonal() {
    test_is_end_game_diagonal_by_color(WHITE);
    test_is_end_game_diagonal_by_color(BLACK);
}

static void test_is_end_game() {
    test_is_end_game_horizontal();
    test_is_end_game_vertical();
    test_is_end_game_diagonal();
}

void test() {
    test_is_legal_move();
    test_init_table();
    test_get_opposite_color();
    test_move();
    test_is_end_game();
    puts("All tests are passed!");
}
