import kaboom from 'kaboom'
import assetLoader from './assetLoader'
import world from './scenes/world'
import { enableFreeCam, zoomCam } from './debugTools/camTools'

kaboom({width: window.innerWidth, height: window.innerHeight })
setBackground(Color.fromHex('6f6abf'))
assetLoader()

const scenes = new Map([
    ['world', () => { 
        world()
        enableFreeCam()
        zoomCam(0.05)
    }]
])

scenes.forEach((sceneFunc, sceneKey) => scene(sceneKey, sceneFunc))

go('world')