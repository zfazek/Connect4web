#include "table.h"

#include <stdio.h>

int get_opposite_color(const int color)
{
	if (color == WHITE) {
		return BLACK;
	} else if (color == BLACK) {
		return WHITE;
	} else {
		return EMPTY;
	}
}

void init_table(int *table)
{
	for (int y = 0; y < Y_SIZE; y++) {
		for (int x = 0; x < X_SIZE; x++) {
			table[y * X_SIZE + x] = EMPTY;
		}
	}
}

void move(int *table, const int x, const int color)
{
	int y = 0;
	while (table[y++ * X_SIZE + x] != EMPTY) {
	}
	table[--y * X_SIZE + x] = color;
}

void take_back(int *table, const int x)
{
	int y = Y_SIZE - 1;
	while (table[y-- * X_SIZE + x] == EMPTY) {
	}
	table[++y * X_SIZE + x] = EMPTY;
}

int get_legal_moves(const int *table, int *legal_moves)
{
	int number_of_legal_moves = 0;
	for (int i = 0; i < X_SIZE; i++) {
		if (is_legal_move(table, i)) {
			legal_moves[number_of_legal_moves++] = i;
		}
	}
	return number_of_legal_moves;
}

static int is_end_game_horizontal(const int *table, const int color)
{
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

static int is_end_game_vertical(const int *table, const int color)
{
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

static int is_end_game_diagonal(const int *table, const int color)
{
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

static int is_end_game_by_color(const int *table, const int color)
{
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

static int is_draw(const int *table)
{
	for (int i = 0; i < X_SIZE * Y_SIZE; i++) {
		if (table[i] == EMPTY) {
			return FALSE;
		}
	}
	return TRUE;
}

int is_end_game(const int *table)
{
	if (is_draw(table)) {
		return DRAW;
	}
	if (is_end_game_by_color(table, WHITE) == WHITE) {
		return WHITE;
	}
	if (is_end_game_by_color(table, BLACK) == BLACK) {
		return BLACK;
	}
	return NO_END_GAME;
}

int is_legal_move(const int *table, const int x)
{
	if (x < 0 || x >= X_SIZE) {
		return FALSE;
	}
	if (table[X_SIZE * (Y_SIZE - 1) + x] == EMPTY) {
		return TRUE;
	} else {
		return FALSE;
	}
}

void copy_table(const int *table, int *new_table)
{
	for (int i = 0; i < X_SIZE * Y_SIZE; i++) {
		new_table[i] = table[i];
	}
}

void print_table(const int *table)
{
	char c;
	for (int y = Y_SIZE - 1; y >= 0; y--) {
		for (int x = 0; x < X_SIZE; x++) {
			switch (table[y * X_SIZE + x]) {
			case EMPTY:
				c = '.';
				break;
			case WHITE:
				c = 'X';
				break;
			case BLACK:
				c = 'O';
				break;

			default:
				c = ' ';
				break;
			}
			printf("%c ", c);
		}
		puts("");
	}
	puts("");
}

void print_table_with_last_move(const int *table, const int move)
{
	printf("%*s\n", 2 * (move + 1) - 1, "#");
	print_table(table);
}
