cmake_minimum_required(VERSION 2.7)

set(CMAKE_CPP_FLAGS -g -O2 -Wall -Wextra -Werror -Wpedantic)

add_executable(connect4
    main.c
    table.c
    test.c
)

target_link_libraries(connect4
    bsd
)
