#include <stdio.h>

#include "computer.h"
#include "table.h"
#include "test.h"

static void print_winner(const int winner)
{
	switch (winner) {
	case DRAW:
		puts("DRAW!");
		break;

	case WHITE:
		puts("CROSSES WON!");
		break;

	case BLACK:
		puts("NOUGHTS WON!");
		break;

	default:
		puts("ERROR!");
		break;
	}
}

int main(int argc, __attribute__ ((unused))
	 char **argv)
{
	int color;
	int m;
	int table[X_SIZE * Y_SIZE];
	int moves_idx = 0;

	if (argc == 2) {
		test();
		return 0;
	}
	init_table(table);
	int number_of_games = 25000;
	color = WHITE;
	for (int n = 0; n < X_SIZE * Y_SIZE; n++) {
		if (is_end_game(table) != NO_END_GAME)
			break;
		m = get_best_move(table, color, number_of_games);
		move(table, m, color);
		print_table_with_last_move(table, m);
		color = get_opposite_color(color);
	}
	puts("GAME END!");
	print_winner(is_end_game(table));
	printf("\nNumber of moves: %d\n\n", moves_idx);
	return 0;
}
