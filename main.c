#include <stdio.h>

#include "table.h"
#include "test.h"

int main(int argc, char* argv[]) {
    if (argc == 2) {
        test();
        return 0;
    }
    init_table();
    move(3, WHITE);
    move(3, BLACK);
    move(0, BLACK);
    print_table();
    return 0;
}
