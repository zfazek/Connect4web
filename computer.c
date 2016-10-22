#include "computer.h"
#include "table.h"

#include <bsd/stdlib.h>

int get_best_move(int* table, int color) {
    int m;
    while (1) {
        m = arc4random_uniform(X_SIZE);
        if (is_legal_move(table, m)) {
            return m;
        }
    }
}
