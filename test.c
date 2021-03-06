#include "test.h"

#include <assert.h>
#include <stdio.h>

#include "table.h"

static void test_is_legal_move()
{
	int table[X_SIZE * Y_SIZE];
	init_table(table);
	for (int i = 0; i < X_SIZE; i++) {
		assert(TRUE == is_legal_move(table, i));
	}
	assert(FALSE == is_legal_move(table, -1));
	assert(FALSE == is_legal_move(table, X_SIZE));
	table[X_SIZE * (Y_SIZE - 1)] = WHITE;
	table[X_SIZE * (Y_SIZE - 1) + 1] = BLACK;
	assert(FALSE == is_legal_move(table, 0));
	assert(FALSE == is_legal_move(table, 1));
}

static void test_init_table()
{
	int table[X_SIZE * Y_SIZE];
	init_table(table);
	for (int i = 0; i < X_SIZE; i++) {
		for (int j = 0; j < Y_SIZE; j++) {
			assert(EMPTY == table[j * X_SIZE + i]);
		}
	}
}

static void test_get_opposite_color()
{
	assert(EMPTY == get_opposite_color(EMPTY));
	assert(BLACK == get_opposite_color(WHITE));
	assert(WHITE == get_opposite_color(BLACK));
}

static void test_move()
{
	int table[X_SIZE * Y_SIZE];
	init_table(table);
	for (int y = 0; y < Y_SIZE - 1; y++) {
		move(table, 0, WHITE);
		assert(TRUE == is_legal_move(table, 0));
	}
	move(table, 0, WHITE);
	assert(FALSE == is_legal_move(table, 0));
}

static void test_is_end_game_horizontal_by_color(int color)
{
	int table[X_SIZE * Y_SIZE];
	init_table(table);
	assert(NO_END_GAME == is_end_game(table));
	move(table, 0, color);
	assert(NO_END_GAME == is_end_game(table));
	move(table, 1, color);
	assert(NO_END_GAME == is_end_game(table));
	move(table, 2, color);
	assert(NO_END_GAME == is_end_game(table));
	move(table, 3, color);
	assert(color == is_end_game(table));

	init_table(table);
	assert(NO_END_GAME == is_end_game(table));
	move(table, X_SIZE - 1, color);
	assert(NO_END_GAME == is_end_game(table));
	move(table, X_SIZE - 2, color);
	assert(NO_END_GAME == is_end_game(table));
	move(table, X_SIZE - 3, color);
	assert(NO_END_GAME == is_end_game(table));
	move(table, X_SIZE - 4, color);
	assert(color == is_end_game(table));
}

static void test_is_end_game_vertical_by_color(int color)
{
	int table[X_SIZE * Y_SIZE];
	init_table(table);
	assert(NO_END_GAME == is_end_game(table));
	move(table, 0, color);
	assert(NO_END_GAME == is_end_game(table));
	move(table, 0, color);
	assert(NO_END_GAME == is_end_game(table));
	move(table, 0, color);
	assert(NO_END_GAME == is_end_game(table));
	move(table, 0, color);
	assert(color == is_end_game(table));

	int opposit_color = get_opposite_color(color);
	init_table(table);
	assert(NO_END_GAME == is_end_game(table));
	for (int y = 0; y < Y_SIZE - 4; y++) {
		move(table, X_SIZE - 1, opposit_color);
	}
	move(table, X_SIZE - 1, color);
	assert(NO_END_GAME == is_end_game(table));
	move(table, X_SIZE - 1, color);
	assert(NO_END_GAME == is_end_game(table));
	move(table, X_SIZE - 1, color);
	assert(NO_END_GAME == is_end_game(table));
	move(table, X_SIZE - 1, color);
	assert(color == is_end_game(table));
}

static void test_is_end_game_diagonal_by_color(int color)
{
	int table[X_SIZE * Y_SIZE];
	int opposit_color = get_opposite_color(color);
	init_table(table);
	assert(NO_END_GAME == is_end_game(table));
	for (int x = 0; x < 4; x++) {
		for (int y = 0; y <= x; y++) {
			if (x == 3 && y == 0)
				move(table, x, opposit_color);
			else
				move(table, x, color);
			if (x == 3 && y == 3)
				assert(color == is_end_game(table));
			else
				assert(NO_END_GAME == is_end_game(table));
		}
	}

	init_table(table);
	assert(NO_END_GAME == is_end_game(table));
	for (int x = 0; x < 4; x++) {
		for (int y = 0; y + x <= 3; y++) {
			if (x == 0 && y == 0)
				move(table, x, opposit_color);
			else
				move(table, x, color);
			if (x == 3 && y == 0)
				assert(color == is_end_game(table));
			else
				assert(NO_END_GAME == is_end_game(table));
		}
	}
}

static void test_is_end_game_horizontal()
{
	test_is_end_game_horizontal_by_color(WHITE);
	test_is_end_game_horizontal_by_color(BLACK);
}

static void test_is_end_game_vertical()
{
	test_is_end_game_vertical_by_color(WHITE);
	test_is_end_game_vertical_by_color(BLACK);
}

static void test_is_end_game_diagonal()
{
	test_is_end_game_diagonal_by_color(WHITE);
	test_is_end_game_diagonal_by_color(BLACK);
}

static void test_is_end_game()
{
	test_is_end_game_horizontal();
	test_is_end_game_vertical();
	test_is_end_game_diagonal();
}

static void test_get_legal_moves()
{
	int table[X_SIZE * Y_SIZE];
	int legal_moves[X_SIZE];
	init_table(table);
	int number_of_legal_moves = get_legal_moves(table, legal_moves);
	assert(number_of_legal_moves == X_SIZE);
	for (int i = 0; i < X_SIZE; i++) {
		assert(i == legal_moves[i]);
	}

	for (int y = 0; y < Y_SIZE; y++) {
		move(table, X_SIZE - 1, WHITE);
	}
	number_of_legal_moves = get_legal_moves(table, legal_moves);
	assert(number_of_legal_moves == X_SIZE - 1);
	for (int i = 0; i < number_of_legal_moves; i++) {
		assert(i == legal_moves[i]);
	}
}

static void test_take_back()
{
	int table[X_SIZE * Y_SIZE];
	int legal_moves[X_SIZE];
	init_table(table);
	for (int y = 0; y < Y_SIZE; y++) {
		move(table, X_SIZE - 1, WHITE);
	}
	int number_of_legal_moves = get_legal_moves(table, legal_moves);
	assert(number_of_legal_moves == X_SIZE - 1);
	take_back(table, X_SIZE - 1);
	number_of_legal_moves = get_legal_moves(table, legal_moves);
	assert(number_of_legal_moves == X_SIZE);
}

static void test_copy_table()
{
	int table[X_SIZE * Y_SIZE];
	int new_table[X_SIZE * Y_SIZE];
	for (int i = 0; i < X_SIZE * Y_SIZE; i++) {
		table[i] = i;
	}
	copy_table(table, new_table);
	for (int i = 0; i < X_SIZE * Y_SIZE; i++) {
		assert(table[i] == new_table[i]);
	}
}

void test()
{
	test_is_legal_move();
	test_init_table();
	test_get_opposite_color();
	test_move();
	test_is_end_game();
	test_get_legal_moves();
	test_take_back();
	test_copy_table();
	puts("All tests are passed!");
}
