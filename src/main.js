import kaboom from 'kaboom'
import assetLoader from './assetLoader'
import world from './scenes/world'
import { enableFreeCam, zoomCam } from './debugTools/camTools'

kaboom({width: window.innerWidth, height: window.innerHeight })
setBackground(Color.fromHex('88d8f8')) // Alt color : 589ffc
assetLoader()

const scenes = new Map([
    ['world', () => { 
        world()
        enableFreeCam()
        zoomCam() 
    }]
])

scenes.forEach((sceneFunc, sceneKey) => scene(sceneKey, sceneFunc))

go('world')