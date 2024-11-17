window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('Screen')
    context = canvas.getContext('2d')

    canvas.addEventListener('mouseup', mouseUp, false)

    gameFrameCurrent = Date.now()
    gameFramePreivous = Date.now() - 16

    gameLoop = requestAnimationFrame(loop)
}

function loop() {
    gameFramePrevious = gameFrameCurrent
    gameFrameCurrent = Date.now()
    delta = gameFrameCurrent - gameFramePrevious

    if (state === 'Title') {
        loopTitle()
    } else if (state === 'TitleMenu') {
        loopTitleMenu()
    } else if (state === 'Game') {
        loopGame()
    }

    gameLoop = requestAnimationFrame(loop)
}

function mouseUp(event) {
    let targetRect = event.getBoundingClientRect()
    let x = (event.clientX - targetRect.left) / targetRect.width * canvas.width
    let y = (event.clientY - targetRect.top) / targetRect.height * canvas.height
    let button = event.button

    if (state === 'Title') {
        mouseUpTitle(x, y, button)
    } else if (state === 'TitleMenu') {
        mouseUpTitleMenu(x, y, button)
    } else if (state === 'Game') {
        mouseUpGame(x, y, button)
    }
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(gameLoop)
    }
}

function rightClick() {
    return false
}
