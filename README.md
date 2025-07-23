# Snake Game in Terminal (Node.js + Blessed)

A classic Snake game of the first version running in the terminal, built with Node.js and the [blessed](https://github.com/chjj/blessed) library for rich terminal UI.

## DEMO VIDEO
https://www.youtube.com/watch?v=6J-UAhTTUj8

## Features

- Play Snake directly in your terminal
- Terminal UI with colors and borders
- Real-time keyboard controls (arrow keys)
- Score tracking
- Restart and quit options
- Written in clean, modular ES6+ code
- Dockerized for easy running via Docker Compose

## Requirements

- [Node.js](https://nodejs.org/) v18 or newer
- [yarn](https://www.npmjs.com/package/yarn)
- [Docker](https://www.docker.com/) (optional, for containerized usage)
- Terminal that supports ANSI escape codes (most modern terminals do)

## Installation

1. Clone the repo:
    ```bash
    git clone git@github.com:AramArakelyan777/snake-game.git
    cd snake-game
    ```
2. Install the dependencies:
    ```bash
    yarn
    ```
3. Run locally:
    ```bash
    yarn dev
    ```
4. Running with Docker
    ```bash
    docker-compose up
    ```

## Usage
- Use arrow keys to move the snake
- Press ```r``` to restart the game after it is over
- Press ```q``` or ```Ctrl+C``` to quit the game
- You win if the snake fills the whole box
- Also, you can customize the app style (check utilities.js constants)

## Contribution
Contributions, issues, and feature requests are welcome! Feel free to open a pull request or issue.

## License
This project is licensed under the MIT License.
