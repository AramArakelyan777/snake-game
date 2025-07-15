import blessed from "blessed"

const screen = blessed.screen({
    smartCSR: true,
})

const box = blessed.box({
    content: "",
    border: "line",
    top: "center",
    left: "center",
})

screen.append(box)

screen.key(["q", "C-c"], (ch, key) => {
    return process.exit(0)
})

screen.render()
