const WIDTH = 640;
const HEIGHT = WIDTH;

function setup() {
    let myCanvas = createCanvas(WIDTH, HEIGHT);
    myCanvas.parent('myCanvas');
    myCanvas.mousePressed(myMousePressed);

    main();
}

function draw() {
    background(0, 0, 255);
    draw_table(table);
}

function draw_table(table) {
    for (let x = 0; x < X_SIZE; x++) {
        for (let y = 0; y < Y_SIZE; y++) {
            switch (table[y * X_SIZE + x]) {
                case EMPTY:
                    draw_disc(x, y, EMPTY);
                    break;
                case RED:
                    draw_disc(x, y, RED);
                    break;
                case YELLOW:
                    draw_disc(x, y, YELLOW);
                    break;
            }
        }
    }
    if (state == STATE_END) {
        textSize(HEIGHT / 10);
        if (color_to_move == YELLOW) {
            fill(255, 0, 0);
            text("RED WON!", 50, 50);
        } else {
            fill(255, 255, 0);
            text("YELLOW WON!", 50, 50);
        }
    } else {
        draw_disc(moves[moves.length - 1], Y_SIZE, color_to_move);
    }
}

function draw_disc(x, y, color) {
    const size_factor = 0.85;
    const border_x = 0;
    const border_y = 0;
    if (color == RED) {
        fill(255, 0, 0);
    } else if (color == YELLOW) {
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

