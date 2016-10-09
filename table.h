#pragma once

#define X_SIZE 7
#define Y_SIZE 6

#define EMPTY 0
#define WHITE 1
#define BLACK 2

#define NO_END_GAME 0

#define FALSE 0
#define TRUE  1

int table[X_SIZE][Y_SIZE];

int get_opposite_color(int color);
void init_table();
int is_end_game();
int is_legal_move(int x);
void move(int x, int color);
void print_table();
