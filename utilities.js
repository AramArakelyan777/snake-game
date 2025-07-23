export const MATRIX_COLOR = "#004705"
export const MATRIX_SIZE = 20
export const MATRIX_EMPTY_SIGN = "  "
export const SNAKE_SIGN = "# "
export const SNAKE_HEAD_COLOR = "green"
export const FOOD_SIGN = "* "
export const DEFAULT_DIRECTION = "right"

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
    return Array.from({ length: MATRIX_SIZE }, () =>
        Array.from({ length: MATRIX_SIZE }, () => MATRIX_EMPTY_SIGN)
    )
}

export function getRandomIndex() {
    return Math.floor(Math.random() * MATRIX_SIZE)
}
