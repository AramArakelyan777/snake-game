import blessed from "blessed"
import {
    matrixToText,
    MATRIX_COLOR,
    MATRIX_SIZE,
    SNAKE_SIGN,
    generateMatrix,
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
    width: "75%",
    height: "75%",
    top: "center",
    left: "center",
})

const snake = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
]

let MATRIX = "",
    head = snake[snake.length - 1]

function start() {
    screen.append(box)
    render()
}

function render() {
    MATRIX = generateMatrix()

    for (let i = 0; i < snake.length; i++) {
        const point = snake[i]
        MATRIX[point.x][point.y] = SNAKE_SIGN
    }

    box.content = matrixToText(MATRIX)

    screen.render()
}

function checkIfTouchedBorders(head) {
    if (
        head.x < 0 ||
        head.x >= MATRIX_SIZE ||
        head.y < 0 ||
        head.y >= MATRIX_SIZE
    )
        return true

    return false
}

function checkIfTouchedItself(head) {
    for (let i = 0; i < snake.length - 1; i++) {
        const point = snake[i]
        if (head.x === point.x && head.y === point.y) return true
    }
    return false
}

function moveSnake(direction) {
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

    head = snake[snake.length - 1]

    if (checkIfTouchedBorders(head) || checkIfTouchedItself(head))
        return process.exit(0)

    render()
}

screen.key("right", (ch, key) => {
    moveSnake("right")
})

screen.key("left", (ch, key) => {
    moveSnake("left")
})

screen.key("up", (ch, key) => {
    moveSnake("up")
})

screen.key("down", (ch, key) => {
    moveSnake("down")
})

screen.key(["q", "C-c"], (ch, key) => {
    return process.exit(0)
})

start()
