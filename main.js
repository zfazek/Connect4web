const X_SIZE = 7;
const Y_SIZE = 6;

const WIDTH = 640;
const HEIGHT = WIDTH;

const STATE_PLAYER_MOVES = 0;
const STATE_COMPUTER_MOVES = 1;
const STATE_END = 2;

function setup() {
    let myCanvas = createCanvas(WIDTH, HEIGHT);
    myCanvas.parent('myCanvas');
    myCanvas.mousePressed(myMousePressed);

    main();
}

function draw() {
    background(0, 0, 255);
    print_table(table);
}

function print_table(table) {
    for (let y = 0; y < Y_SIZE; y++) {
        for (let x = 0; x < X_SIZE; x++) {
            switch (table[y * X_SIZE + x]) {
                case EMPTY:
                    c = '.';
                    draw_disc(x, y, EMPTY);
                    break;
                case WHITE:
                    c = 'X';
                    draw_disc(x, y, WHITE);
                    break;
                case BLACK:
                    c = 'O';
                    draw_disc(x, y, BLACK);
                    break;
            }
        }
    }
    draw_disc(moves[moves.length - 1], Y_SIZE, END);
}

function draw_disc(x, y, color) {
    const size_factor = 0.85;
    const border_x = 0;
    const border_y = 0;
    if (color == WHITE) {
        fill(255, 0, 0);
    } else if (color == BLACK) {
        fill(255, 255, 0);
    } else if (color == END) {
        fill(0, 0, 0);
    } else {
        fill(255, 255, 255);
    }
    strokeWeight(0);
    let size = (WIDTH - 2 * border_x) / X_SIZE;
    ellipse(border_x + size / 2 + x * size, HEIGHT - border_y - size / 2 - y * size, size * size_factor);
}

function keyPressed() {
}

function keyReleased() {
}

