// Monte Carlo Szimuláció
// Nagy számok törvényét használva állíja elő a legjobb lépést
//
// Rengeteg játszmát lejátszik véletlen lépésekkel minden lehetséges kezdőlépéssel
// Azzal a kezdőlépéssel tér vissza amelynél a legnagyobb a
// nyert és veszített játszmák különbsége
//
// paraméterek:
//     legal_moves: tömb (array) amely tartalmazza a legális lépéseket
//      pl. [0, 1, 2, 6]
function best_move_monte_carlo(legal_moves) {

    // Nincs szükség  Monte Carlo szimulációra ha van azonnali nyerő lépés
    // Akkor azzal a lépéssel tér vissza
    let m = can_win(legal_moves);
    if (m != NO_BEST_MOVE) {
        return m;
    }

    // Elmenti az aktuális állapotot: table, color_to_move
    let color_old = color_to_move;
    let table_old = [];
    for (let y = 0; y < Y_SIZE; y++) {
        for (let x = 0; x < X_SIZE; x++) {
            table_old.push(table[y * X_SIZE + x]);
        }
    }

    // Eltárolja a pontértékét minden lehetséges kezdőlépésnek
    // Nagyon kis számot ad kezdőértéknek
    // Így ha egy lépés nem lehetséges a pontértéke kisebb, mint a többi lépésé
    // Így nem ezt fogja használni a gép
    let wins = [];
    for (let i = 0; i < X_SIZE; i++) {
        wins.push(-999999);
    }
    console.log("Number of games:", NUMBER_OF_GAMES);

    // Előállítja az összes legális kezdőlépést
    for (let i = 0; i < legal_moves.length; i++) {
        let m = legal_moves[i];
        wins[m] = 0;

        // Lejátszik NUMBER_OF_GAMES játsznát minden kezdőlépésből
        for (let n = 0; n < NUMBER_OF_GAMES; n++) {

            // Nullázza a table és color_to_move változókat
            for (let y = 0; y < Y_SIZE; y++) {
                for (let x = 0; x < X_SIZE; x++) {
                    table[y * X_SIZE + x] = table_old[y * X_SIZE + x];
                }
            }
            color_to_move = color_old;

            // Meglépi a kezdőlépést. false azt jelenti, hogy
            // ne tárolja el a lépést a lépés előzmények között
            make_move(m, false);

            // Addig lép véletlen lépéseket amíg nincs vége a játszmának
            while (is_game_over() == STATE_NO_GAME_OVER) {
                let random_move = get_good_move();
                make_move(random_move, false);
            }

            // Frissíti a pontértékek a játszma eredményétől függően
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

        // Rejtett debug log
        console.log("move:", m, ", score:", wins[m]);
    }

    // Megkeresi azt a kezdőlépést amelynek a legmagasabb a pontértéke
    let max = -999999;
    let best_move = 0;
    for (let i = 0; i < X_SIZE; i++) {
        let win = wins[i];
        if (win > max) {
            max = win;
            best_move = i;
        }
    }

    // Visszaállítja a table and color_to_move változókat a mentésből
    for (let y = 0; y < Y_SIZE; y++) {
        for (let x = 0; x < X_SIZE; x++) {
            table[y * X_SIZE + x] = table_old[y * X_SIZE + x];
        }
    }
    color_to_move = color_old;
    return best_move;
}

