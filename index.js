import blessed from "blessed"
import {
    matrixToText,
    MATRIX_COLOR,
    MATRIX_SIZE,
    SNAKE_SIGN,
    SNAKE_HEAD_COLOR,
    generateMatrix,
} from "./utilities.js"

const screen = blessed.screen({
    smartCSR: true,
    title: "Snake Game",
})

const box = blessed.box({
    top: "center",
    left: "center",
    tags: true,
    border: {
        fg: MATRIX_COLOR,
        type: "line",
    },
    style: {
        fg: MATRIX_COLOR,
    },
    width: MATRIX_SIZE * 2 + 2,
    height: MATRIX_SIZE + 2,
})

const snake = [
    { x: MATRIX_SIZE / 2 - 1, y: MATRIX_SIZE / 2 - 2 },
    { x: MATRIX_SIZE / 2 - 1, y: MATRIX_SIZE / 2 - 1 },
    { x: MATRIX_SIZE / 2 - 1, y: MATRIX_SIZE / 2 },
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
        const isHead = i === snake.length - 1

        MATRIX[point.x][point.y] = isHead
            ? `{${SNAKE_HEAD_COLOR}-fg}${SNAKE_SIGN}{/}`
            : `{${MATRIX_COLOR}-fg}${SNAKE_SIGN}{/}`
    }

    box.setContent(matrixToText(MATRIX))
    screen.render()
}

function checkIfTouchedBorders(head) {
    return (
        head.x < 0 ||
        head.x >= MATRIX_SIZE ||
        head.y < 0 ||
        head.y >= MATRIX_SIZE
    )
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
            snake.push({ x: head.x, y: head.y + 1 })
            break
        case "left":
            snake.push({ x: head.x, y: head.y - 1 })
            break
        case "up":
            snake.push({ x: head.x - 1, y: head.y })
            break
        case "down":
            snake.push({ x: head.x + 1, y: head.y })
            break
    }

    head = snake[snake.length - 1]

    if (checkIfTouchedBorders(head) || checkIfTouchedItself(head)) endGame()
    else render()
}

function endGame() {
    box.setContent(
        "{center}{red-fg}Game Over!{/red-fg}\n\nPress q to quit...{/center}"
    )
    screen.render()
}

screen.key(["right", "left", "up", "down"], (ch, key) => {
    moveSnake(key.name)
})

screen.key(["q", "C-c"], () => {
    return process.exit(0)
})

screen.on("resize", () => {
    render()
})

start()
