import { objectLayer, objectLayerTiles, terrainLayer, terrainLayerTiles } from "./worldLayout"

export default function world() {
    const map = [
        addLevel(terrainLayer, terrainLayerTiles),
        addLevel(objectLayer, objectLayerTiles)
    ]

    for (const layer of map) {
        layer.use(scale(2))
        layer.use(pos(200,200))
    }

    const player = add([
        sprite('player-shield-up'),
        pos(center()),
        scale(2),
        {
            speed: 100
        }
    ])
    //player.play('attack')

    onKeyDown('left', () => {
        player.move(-player.speed,0)
        player.flipX = true
        if (player.curAnim() !== 'walk') {
            player.use(sprite('player-side'))
            player.play('walk')
        }
    })

    onKeyDown('right', () => {
        player.move(player.speed, 0)
        player.flipX = false
        if (player.curAnim() !== 'walk') {
            player.use(sprite('player-side'))
            player.play('walk')
        }
    })

    onKeyDown('up', () => {
        player.move(0,-player.speed)
        if (player.curAnim() !== 'walk') {
            player.use(sprite('player-up'))
            player.play('walk')
        }
    })

    onKeyDown('down', () => {
        player.move(0,player.speed)
        if (player.curAnim() !== 'walk') {
            player.use(sprite('player-down'))
            player.play('walk')
        }
    })

    onKeyRelease(() => player.stop())

    onUpdate(() => {
        camPos(player.pos)
    })
}