export function enableFreeCam() {
    //initial camPos
    camPos(800,600)
    onKeyDown('shift', () => {
        if (isKeyDown('left')) camPos(camPos().x - 10, camPos().y)
        if (isKeyDown('right')) camPos(camPos().x + 10, camPos().y)
        if (isKeyDown('up')) camPos(camPos().x, camPos().y + 10)
        if (isKeyDown('down')) camPos(camPos().x, camPos().y - 10)
    })
}

export function zoomCam(scaleFactor) {
    //initial camScale
    camScale(camScale().x - scaleFactor, camScale().y - scaleFactor)
    onKeyPress('+', () => camScale(camScale().x + scaleFactor, camScale().y + scaleFactor))
    onKeyPress('-', () => camScale(camScale().x - scaleFactor, camScale().y - scaleFactor))
}