export const MATRIX_COLOR = "green"
export const MATRIX_SIZE = 20
export const SNAKE_SIGN = "O "
export const SNAKE_HEAD_COLOR = "#0a4a00"

const MATRIX_EMPTY_SIGN = "  "

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
