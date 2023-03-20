function best_move_monte_carlo(legal_moves) {
    let table_old = [];
    let color_old = color_to_move;
    for (let y = 0; y < Y_SIZE; y++) {
        for (let x = 0; x < X_SIZE; x++) {
            table_old.push(table[y * X_SIZE + x]);
        }
    }
    let wins = [];
    for (let i = 0; i < X_SIZE; i++) {
        wins.push(-999999);
    }
    for (let i = 0; i < legal_moves.length; i++) {
        let m = legal_moves[i];
        wins[m] = 0;
        for (let n = 0; n < NUMBER_OF_GAMES; n++) {
            for (let y = 0; y < Y_SIZE; y++) {
                for (let x = 0; x < X_SIZE; x++) {
                    table[y * X_SIZE + x] = table_old[y * X_SIZE + x];
                }
            }
            color_to_move = color_old;
            move(m, false);
            while (is_end_game() == STATE_NO_GAME_OVER) {
                let random_move = get_good_move();
                move(random_move, false);
            }
            let end = is_end_game();
            if (end == STATE_RED_WON) {
                if (color_old == RED) {
                    wins[m]++;
                } else {
                    wins[m]--;
                }
            } else if (end == STATE_YELLOW_WON) {
                if (color_old == YELLOW) {
                    wins[m]++;
                } else {
                    wins[m]--;
                }
            }
        }
        console.log(m, wins[m]);
    }
    let max = -999999;
    let best_move = 0;
    for (let i = 0; i < X_SIZE; i++) {
        let win = wins[i];
        if (win > max) {
            max = win;
            best_move = i;
        } 
    }
    for (let y = 0; y < Y_SIZE; y++) {
        for (let x = 0; x < X_SIZE; x++) {
            table[y * X_SIZE + x] = table_old[y * X_SIZE + x];
        }
    }
    color_to_move = color_old;
    return best_move;
}

