export default function assetLoader() {

    function setTile(x,y) {
        return {x, y, width: 16, height: 16}
    }

    function setCharacterAnim(name, x, y) {
        return {
            x,
            y,
            width: 64,
            height: 16,
            sliceX: 4,
            sliceY: 1,
            anims: {
                [name]: {
                    from: 0,
                    to: 3,
                    loop: true,
                    speed: 4
                }
            }
        }
    }

    function setSlimeAnim(name, x, y) {
        return {
            x, 
            y, 
            width: 32,
            height: 16, 
            sliceX: 2, 
            sliceY: 1,
            anims: {
                [name]: {
                    from: 0,
                    to: 1,
                    speed: 4,
                    loop: true
                }
            }
        }
    }

    loadSpriteAtlas('./asset.png', {
        'grass-tl': setTile(0,0),
        'grass-tm': setTile(16,0),
        'grass-tr': setTile(32,0),
        'grass-ml': setTile(0,16),
        'grass-mm': setTile(16,16),
        'grass-mr': setTile(32,16),
        'grass-bl': setTile(0,32),
        'grass-bm': setTile(16,32),
        'grass-br': setTile(32,32),
        'ground-l': setTile(0,48),
        'ground-m': setTile(16,48),
        'ground-r': setTile(32,48),
        'flower-1': setTile(80,32),
        'flower-2': setTile(96,32),
        'tree-1': setTile(80,48),
        'tree-2': setTile(80,64),
        'ladder-t': setTile(384,0),
        'ladder-m': setTile(384,16),
        'ladder-b': setTile(384,32),
        'grass-y-tl': setTile(112,0),
        'grass-y-tm': setTile(128,0),
        'grass-y-tr': setTile(144,0),
        'grass-y-ml': setTile(112,16),
        'grass-y-mm': setTile(128,16),
        'grass-y-mr': setTile(144,16),
        'grass-y-bl': setTile(112,32),
        'grass-y-bm': setTile(128,32),
        'grass-y-br': setTile(144,32),
        'small-tree-1': setTile(208,128),
        'small-tree-2': setTile(208,144),
        'player-down': setCharacterAnim('walk', 0, 384),
        'player-side': setCharacterAnim('walk', 0, 400),
        'player-up': setCharacterAnim('walk', 0, 416),
        'player-attack-down': setTile(0,448),
        'player-attack-right': setTile(16,448),
        'player-attack-up': setTile(32,448),
        'player-attack-left': setTile(48,448),
        'player-shield-down': setTile(0,464),
        'player-shield-right': setTile(16,464),
        'player-shield-up': setTile(32,464),
        'player-shield-left': setTile(48,464),
        'slime-down': setSlimeAnim('walk', 0, 352),
        'slime-side': setSlimeAnim('walk', 32, 352),
        'slime-up': setSlimeAnim('walk', 0, 368)
    })
}