import blessed from "blessed"
import {
    matrixToText,
    MATRIX_COLOR,
    MATRIX_SIZE,
    SNAKE_SIGN,
    SNAKE_HEAD_COLOR,
    FOOD_SIGN,
    DEFAULT_DIRECTION,
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

const scoreText = blessed.text()

let MATRIX = generateMatrix(),
    snake = [
        {
            x: Math.round(MATRIX_SIZE / 2) - 1,
            y: Math.round(MATRIX_SIZE / 2) - 2,
        },
        {
            x: Math.round(MATRIX_SIZE / 2) - 1,
            y: Math.round(MATRIX_SIZE / 2) - 1,
        },
        { x: Math.round(MATRIX_SIZE / 2) - 1, y: Math.round(MATRIX_SIZE / 2) },
    ],
    head = snake[snake.length - 1],
    isGameOver = false,
    food,
    timerId,
    score = 0,
    directionsQueue = [DEFAULT_DIRECTION]

function start() {
    if (MATRIX_SIZE < snake.length) return

    setFoodCoords()
    screen.append(scoreText)
    screen.append(box)
    render()

    timerId = setInterval(() => {
        if (!isGameOver) moveSnake()
    }, 85)
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

    if (food) MATRIX[food.x][food.y] = FOOD_SIGN

    box.setContent(matrixToText(MATRIX))
    screen.render()
}

function setFoodCoords() {
    const emptyCells = []

    for (let x = 0; x < MATRIX_SIZE; x++) {
        for (let y = 0; y < MATRIX_SIZE; y++) {
            if (!snake.some((segment) => segment.x === x && segment.y === y)) {
                emptyCells.push({ x, y })
            }
        }
    }

    if (emptyCells.length === 0) {
        food = null
        return
    }

    const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    food = { x, y }
}

function changeDirWhenTouchesBorders(direction, point) {
    switch (direction) {
        case "up":
            if (point.x < 0) point.x = MATRIX_SIZE - 1
            break
        case "down":
            if (point.x >= MATRIX_SIZE) point.x = 0
            break
        case "left":
            if (point.y < 0) point.y = MATRIX_SIZE - 1
            break
        case "right":
            if (point.y >= MATRIX_SIZE) point.y = 0
            break
    }
}

function checkIfTouchedItself(head) {
    for (let i = 0; i < snake.length - 1; i++) {
        const point = snake[i]
        if (head.x === point.x && head.y === point.y) return true
    }
    return false
}

function checkIfAteFood(head) {
    return food && head.x === food.x && head.y === food.y
}

function checkIfWin() {
    return snake.length === MATRIX_SIZE * MATRIX_SIZE
}

function isOpposite(dir1, dir2) {
    return (
        (dir1 === "up" && dir2 === "down") ||
        (dir1 === "down" && dir2 === "up") ||
        (dir1 === "left" && dir2 === "right") ||
        (dir1 === "right" && dir2 === "left")
    )
}

function moveSnake() {
    const currentDirection = directionsQueue[0]
    let newHead = { ...head }

    switch (currentDirection) {
        case "right":
            newHead.y += 1
            break
        case "left":
            newHead.y -= 1
            break
        case "up":
            newHead.x -= 1
            break
        case "down":
            newHead.x += 1
            break
    }

    changeDirWhenTouchesBorders(currentDirection, newHead)

    if (checkIfTouchedItself(newHead)) return endGame("Game over!")

    if (checkIfAteFood(newHead)) {
        score += 1
        scoreText.setContent(`Score: ${score}`)
        setFoodCoords()
    } else {
        snake.shift()
    }

    snake.push(newHead)
    head = newHead

    if (checkIfWin()) return endGame("You win!")

    render()

    if (directionsQueue.length > 1) directionsQueue.shift()
}

function endGame(message) {
    isGameOver = true
    score = 0
    scoreText.setContent("")
    directionsQueue = []
    clearInterval(timerId)
    box.setContent(
        `{center}{cyan-fg}${message}{/cyan-fg}\n\nPress q to quit or r to restart.{/center}`
    )
    screen.render()
}

function resetGame() {
    snake = [
        {
            x: Math.round(MATRIX_SIZE / 2) - 1,
            y: Math.round(MATRIX_SIZE / 2) - 2,
        },
        {
            x: Math.round(MATRIX_SIZE / 2) - 1,
            y: Math.round(MATRIX_SIZE / 2) - 1,
        },
        { x: Math.round(MATRIX_SIZE / 2) - 1, y: Math.round(MATRIX_SIZE / 2) },
    ]
    head = snake[snake.length - 1]
    isGameOver = false
    score = 0
    directionsQueue = [DEFAULT_DIRECTION]
    setFoodCoords()
    render()

    if (timerId) clearInterval(timerId)
    timerId = setInterval(() => {
        if (!isGameOver) moveSnake()
    }, 75)
}

screen.key(["right", "left", "up", "down"], (ch, key) => {
    if (isGameOver) return

    const lastDirection = directionsQueue[directionsQueue.length - 1]
    const newDirection = key.name

    if (!isOpposite(lastDirection, newDirection)) {
        if (directionsQueue.length < 3) directionsQueue.push(newDirection)
    }
})

screen.key(["r"], () => {
    if (isGameOver) resetGame()
})

screen.key(["q", "C-c"], () => {
    return process.exit(0)
})

start()
