export const MATRIX_COLOR = "#004705"
export const MATRIX_SIZE = 20
export const MATRIX_EMPTY_SIGN = "  "
export const SNAKE_SIGN = "# "
export const SNAKE_HEAD_COLOR = "green"
export const FOOD_SIGN = "* "

export function matrixToText(matrix) {
    let text = "",
        n = matrix.length

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            text += matrix[i][j]
        }
        text += "\n"
    }

    return text
}

export function generateMatrix() {
    let matrix = []

    for (let i = 0; i < MATRIX_SIZE; i++) {
        matrix.push([])
    }

    for (let i = 0; i < MATRIX_SIZE; i++) {
        for (let j = 0; j < MATRIX_SIZE; j++) {
            matrix[i].push(MATRIX_EMPTY_SIGN)
        }
    }

    return matrix
}

export function getRandomIndex() {
    return Math.floor(Math.random() * MATRIX_SIZE)
}
