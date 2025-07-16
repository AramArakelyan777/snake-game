import blessed from "blessed"
import {
    matrixToText,
    MATRIX_COLOR,
    MATRIX_EMPTY_SIGN as ES,
    SNAKE_SIGN,
} from "./utilities.js"

const screen = blessed.screen({
    smartCSR: true,
})

const box = blessed.box({
    content: "",
    border: {
        type: "line",
        fg: MATRIX_COLOR,
    },
    style: {
        fg: MATRIX_COLOR,
    },
    top: "center",
    left: "center",
})

let MATRIX = ""

const snake = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
]

function start() {
    screen.append(box)
}

screen.key(["q", "C-c"], (ch, key) => {
    return process.exit(0)
})

start()
