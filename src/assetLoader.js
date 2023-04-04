export default function assetLoader() {

    function setTile(x,y) {
        return {x, y, width: 16, height: 16}
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
        'ground-l': setTile(0,42),
        'ground-m': setTile(16,42),
        'ground-r': setTile(32,42)
    })

    add([sprite('ground-r'), scale(4), pos(center())])
}