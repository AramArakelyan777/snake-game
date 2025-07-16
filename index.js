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
    render()
}

function render() {
    MATRIX = [
        [ES, ES, ES, ES, ES],
        [ES, ES, ES, ES, ES],
        [ES, ES, ES, ES, ES],
        [ES, ES, ES, ES, ES],
        [ES, ES, ES, ES, ES],
    ]

    for (let i = 0; i < snake.length; i++) {
        const point = snake[i]
        MATRIX[point.x][point.y] = SNAKE_SIGN
    }

    box.content = matrixToText(MATRIX)

    screen.render()
}

function moveSnake(direction) {
    const head = snake[snake.length - 1]
    snake.shift()

    switch (direction) {
        case "right":
            snake.push({
                x: head.x,
                y: head.y + 1,
            })
            break

        case "left":
            snake.push({
                x: head.x,
                y: head.y - 1,
            })
            break

        case "up":
            snake.push({
                x: head.x - 1,
                y: head.y,
            })
            break

        case "down":
            snake.push({
                x: head.x + 1,
                y: head.y,
            })
            break

        default:
            break
    }
}

screen.key("right", (ch, key) => {
    moveSnake("right")
    render()
})

screen.key("left", (ch, key) => {
    moveSnake("left")
    render()
})

screen.key("up", (ch, key) => {
    moveSnake("up")
    render()
})

screen.key("down", (ch, key) => {
    moveSnake("down")
    render()
})

screen.key(["q", "C-c"], (ch, key) => {
    return process.exit(0)
})

start()
