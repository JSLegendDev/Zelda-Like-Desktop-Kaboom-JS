import { objectLayer, objectLayerTiles, terrainLayer, terrainLayerTiles } from "./worldLayout"

export default function world() {
    const map = [
        addLevel(terrainLayer, terrainLayerTiles),
        addLevel(objectLayer, objectLayerTiles)
    ]

    for (const layer of map) {
        layer.use(scale(2))
        layer.use(pos(200,200))
        for (const tile of layer.children) {
            if (tile.npcType) {
                if (tile.npcType === 'slime') {
                    tile.play('walk')

                    tile.movementDelta = 0
                    tile.onStateUpdate('detected',  () => {
                        if (tile.movementDelta > 10) {
                            tile.enterState('following')
                            tile.movementDelta = 0
                            return
                        }
                        
                        tile.movementDelta++
                        tile.move(-100, 0)
                    })
                    tile.onStateUpdate('following',  () => {
                        if (tile.movementDelta > 10) {
                            tile.enterState('detected')
                            tile.movementDelta = 0
                            return
                        }
                        
                        tile.movementDelta++
                        tile.move(100, 0)
                    })
                    tile.enterState('detected')
                }
            }
        }
    }

    const player = add([
        sprite('player-down'),
        pos(center()),
        scale(2),
        {
            speed: 100,
            direction: 'down'
        }
    ])

    onKeyDown('left', () => {
        player.direction = 'left'
        player.move(-player.speed,0)
        player.flipX = true
        if (player.curAnim() !== 'walk') {
            player.use(sprite('player-side'))
            player.play('walk')
        }
    })

    onKeyDown('right', () => {
        player.direction = 'right'
        player.move(player.speed, 0)
        player.flipX = false
        if (player.curAnim() !== 'walk') {
            player.use(sprite('player-side'))
            player.play('walk')
        }
    })

    onKeyDown('up', () => {
        player.direction = 'up'
        player.move(0,-player.speed)
        if (player.curAnim() !== 'walk') {
            player.use(sprite('player-up'))
            player.play('walk')
        }
    })

    onKeyDown('down', () => {
        player.direction = 'down'
        player.move(0,player.speed)
        if (player.curAnim() !== 'walk') {
            player.use(sprite('player-down'))
            player.play('walk')
        }
    })

    onKeyRelease(() => player.stop())

    onKeyPress('space', () => {
        player.use(sprite('player-attack-' + player.direction))
    })

    onKeyRelease('space', () => {
        if (player.direction === 'left') {
            player.use(sprite('player-side'))
            player.flipX = true 
        } else if (player.direction === 'right') {
            player.use(sprite('player-side'))
        } else {
            player.use(sprite('player-' + player.direction))
        }
    })

    onUpdate(() => {
        camPos(player.pos)
    })
}