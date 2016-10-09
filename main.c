#include <stdio.h>

#include "table.h"
#include "test.h"

int main(int argc, char* argv[]) {
    int color;
    int m;
    int table[X_SIZE * Y_SIZE];
    if (argc == 2) {
        test();
        return 0;
    }
    init_table(table);
    color = WHITE;
    for (int n = 0; n < X_SIZE * Y_SIZE; n++) {
        m = get_best_move(table, color);
        move(table, m, color);
        print_table(table);
        if (is_end_game(table)) {
            break;
        }
        color = get_opposite_color(color);
    }
    return 0;
}
