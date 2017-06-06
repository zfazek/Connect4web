#pragma once

#define X_SIZE 7
#define Y_SIZE 6

#define EMPTY 0
#define WHITE 1
#define BLACK 2

#define NO_END_GAME 0
#define DRAW 3

#define FALSE 0
#define TRUE  1

int get_opposite_color(const int color);
void init_table(int *table);
int is_end_game(const int *table);
int is_legal_move(const int *table, const int x);
void move(int *table, const int x, const int color);
void take_back(int *table, const int x);
int get_legal_moves(const int *table, int *legal_moves);
void copy_table(const int *table, int *new_table);
void print_table(const int *table);
void print_table_with_last_move(const int *table, const int move);
