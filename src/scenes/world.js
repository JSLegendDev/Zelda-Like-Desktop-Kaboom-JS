export default function world() {
    const map = [
        addLevel([
            '    34444445   ',
            '3444100000024445',
            '10001000000200024444444444',
            '10001000000200020000000000',
            '10006777777800020000000000',
            '10009aaaaaab00020000000000',
            '10000000000000020000000000',
            '10000000000000020000000000',
            '10000000000000020000000000',
            '67777777777777780000000000',
            '00000000000000000000000000',
            '00000000000000000000000000',
            '00000000000000000000000000'
        ], {tileWidth: 16, tileHeight: 16, tiles: {
            0: () => [sprite('grass-mm')],
            1: () => [sprite('grass-ml')],
            2: () => [sprite('grass-mr')],
            3: () => [sprite('grass-tl')],
            4: () => [sprite('grass-tm')],
            5: () => [sprite('grass-tr')],
            6: () => [sprite('grass-bl')],
            7: () => [sprite('grass-bm')],
            8: () => [sprite('grass-br')],
            9: () => [sprite('ground-l')],
            'a': () => [sprite('ground-m')],
            'b': () => [sprite('ground-r')],
        }})
    ]

    map.forEach(layer => {
        layer.use(scale(2))
        layer.use(pos(200,200))
    })
}