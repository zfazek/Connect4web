function get_best_move() {
    level = ($("#level").val());

    // Generate all the legal moves
    let legal_moves = [];
    let num_legal_moves = get_legal_moves(legal_moves);

    // Ha nincs legális lépés, return NO_BEST_MOVE
    if (num_legal_moves == 0) {
        return NO_BEST_MOVE;
    }

    // Fokozat ellenőrzés
    if (level == 1) {
        return get_best_move_monkey();
    } else if (level == 2) {
        let m = can_win(legal_moves);
        if (m != NO_BEST_MOVE) {
            return m;
        }

        // Ha nincs azonnali nyerő lépés, véletlenszerűen lép
        return get_best_move_monkey();
    } else if (level == 3) {
        return get_good_move();
    } else {
        return best_move_monte_carlo(legal_moves);
    }
}

function get_good_move() {
    let legal_moves = [];
    let num_legal_moves = get_legal_moves(legal_moves);
    let m = can_win(legal_moves);
    if (m != NO_BEST_MOVE) {
        return m;
    }
    m = can_save(legal_moves);
    if (m != NO_BEST_MOVE) {
        return m;
    }
    return get_best_move_monkey();
}

function get_random_int(max) {
    return Math.floor(Math.random() * max);
}

// Visszatér egy véletlen legális lépéssel
// A lépés tulajdonképpen az indexe az oszlopnak
// A lépés egy integer érték 0 - 6 között
// Ha az oszlop tele van, ez nem egy legális lépés
//
// Feladat: Addig generálj egy véltelen lépést amíg az nem legális.
// Ha legális, akkor térj vissza az oszlop indexével
// Tipp: használd a get_random_int(X_SIZE) függvényt véletlenszám
// generálásához 0 és X_SIZE között!
// Tipp: használd az is_legal_move() függvényt, hogy ellenőrizd,
// hogy a lépés legális-e!
function get_best_move_monkey() {
    while (true) {
        let m = get_random_int(X_SIZE);
        if (is_legal_move(m)) {
            return m;
        }
    }
}

// Visszatér azzal a lépéssel amellyel azonnal nyerni lehet
// Ha nincs ilyen lépés akkor NO_BEST_MOVE-al tér vissza
//
// Feladat: Vedd végig az összes legálist lépést!
// legal_moves paraméter tartalmazza őket egy array-ben
// Lépd meg az összes lépést! Tipp: használd a make_move() függvényt
// egy for cikluson belül!
// Ellenőrizd, hogy a lépéssel megnyerted-e a játszmát!
// Tipp: használd az is_game_over() függvényt!
// Tipp: make_move() függvény a color_to_move változó értékét
// átállítja az ellenfelére!
// Tipp: használd a get_opposite_color() függvényt,
// hogy megkapd az ellenfél színét!
// if (is_game_over() == get_opposite_color())
//
// Ha vége van a játszmának, térj vissza azzal a lépéssel!
// Egyébként térj vissza NO_BEST_MOVE értékkel!
// Minden ellenőrzés után vedd vissza a lépést!
// Tipp: használd a take_back() függvényt!
//
// paraméterek:
//     legal_moves: tömb (array) amely tartalmazza a legális lépéseket
//     pl. [0, 1, 2, 6]
function can_win(legal_moves) {
    for (let i = 0; i < legal_moves.length; i++) {
        let m = legal_moves[i];
        make_move(m);
        if (is_game_over() == get_opposite_color()) {
            take_back();
            return m;
        }
        take_back();
    }
    return NO_BEST_MOVE;
}

// Visszatér azzal a lépéssel amellyel nem veszít azonnal
// Ha az ellenfél azt lépné, akkor rögtön nyerne
// Védekező lépés
//
// Tipp: Próbld meg újrahasználni a reuse can_win() függvényt!
// Tipp: Először változtasd meg, hogy ki következik!
// Állítsd át a color_to_move változó értékét az ellenfél színére!
// Használd a color_to_move = get_opposite_color(); sort ehhez!
// Tipp: Ne feledd ezt visszaállítani az eredeti értékre a függvény végén!
// Tipp: Ugyan azzal a sorral vissza tudod állítani.
//
// paraméterek:
//     legal_moves: tömb (array) amely tartalmazza a legális lépéseket
//     pl. [0, 1, 2, 6]
function can_save(legal_moves) {
    color_to_move = get_opposite_color();
    let m = can_win(legal_moves);
    color_to_move = get_opposite_color();
    return m;
}
