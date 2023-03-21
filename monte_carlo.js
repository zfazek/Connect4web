// Implements Monte Carlo Simulation
// Use Law of large numbers theory to calculate best moves
//
// Plays a lot of games with random moves from each starting move
// Returns that move which generated most wins
//
// params:
//      legal_moves: array of indices of legal moves
//      e.g. [0, 1, 2, 6]
function best_move_monte_carlo(legal_moves) {

    // If there is immedate win, no need for Monte Carlo Simulation
    // Make that move
    let m = can_win(legal_moves);
    if (m != NO_BEST_MOVE) {
        return m;
    }

    // Backup actual state: table, color_to_move
    let table_old = [];
    let color_old = color_to_move;
    for (let y = 0; y < Y_SIZE; y++) {
        for (let x = 0; x < X_SIZE; x++) {
            table_old.push(table[y * X_SIZE + x]);
        }
    }

    // Stores the scores of each possible move
    // Initialize with very small number
    // This way if that move is not legal, its score remains small
    let wins = [];
    for (let i = 0; i < X_SIZE; i++) {
        wins.push(-999999);
    }
    console.log("Number of games:", NUMBER_OF_GAMES);

    // Generate all the legal moves
    for (let i = 0; i < legal_moves.length; i++) {
        let m = legal_moves[i];
        wins[m] = 0;

        // Generate NUMBER_OF_GAMES from each legal move
        for (let n = 0; n < NUMBER_OF_GAMES; n++) {

            // Reset the table and color_to_move
            for (let y = 0; y < Y_SIZE; y++) {
                for (let x = 0; x < X_SIZE; x++) {
                    table[y * X_SIZE + x] = table_old[y * X_SIZE + x];
                }
            }
            color_to_move = color_old;

            // Make the move. false means not to store in move history
            move(m, false);

            // Generate random moves until game is over
            while (is_game_over() == STATE_NO_GAME_OVER) {
                let random_move = get_good_move();
                move(random_move, false);
            }

            // Update scores based on game result
            let end = is_game_over();
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

        // Hidden debug log
        console.log("move:", m, ", score:", wins[m]);
    }

    // Find the move with maximum score
    let max = -999999;
    let best_move = 0;
    for (let i = 0; i < X_SIZE; i++) {
        let win = wins[i];
        if (win > max) {
            max = win;
            best_move = i;
        }
    }

    // Restore the table and color_to_move from backup
    for (let y = 0; y < Y_SIZE; y++) {
        for (let x = 0; x < X_SIZE; x++) {
            table[y * X_SIZE + x] = table_old[y * X_SIZE + x];
        }
    }
    color_to_move = color_old;
    return best_move;
}

