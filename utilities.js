export const MATRIX_COLOR = "green"
export const MATRIX_EMPTY_SIGN = "O "

export const SNAKE_SIGN = "@ "

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
