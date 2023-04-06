export default function world() {
    const map = [
        addLevel([
            '              34444445                ',
            '          3444100000024445            ',
            '34444444441000100000020002444444445  ',
            '100000000010001000000200020000000005  ',
            '100000000010006777777800020000000002  ',
            '100000000010009aaaaaab00020000000002  ',
            '100000000010000000000000020000000002  ',
            '100000000010000000000000020000000002  ',
            '100000000010000000000000020000000002  ',
            '100000000067777777777777780000000002  ',
            '10000000009aaaaaaaaaaaaaab0000000002  ',
            '100000000000000000000000000000000002  ',
            '100000000000000000000000000000000002  ',
            '677777777777777777777777777777777778  ',
            '9aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab  ',
            '9aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab  ',
            'dcccccccccccccccccccccccccccccccccce  ',
            'dcccccccccccccccccccccccccccccccccce  ',
            'dcccccccccccccccccccccccccccccccccce  ',
            'dcccccccccccccccccccccccccccccccejjk  ',
            'dccccccccccccccccccccccccccccejjk     ',
            'dcccccccccccccccccccccccccccce        ',
            'dcccccccejjjjjjjdcccccccccccccgggggggh',
            'dcccccejk       idccccccccccccccccccce',
            'dcccejk          idcccccccccccccccccce',
            'ijjjj            9ijjjjjjjjjjjjjjjjjjk',
            '                  9aaaaaaaaaaaaaaaaaab'
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
            'c': () => [sprite('grass-y-mm')],
            'd': () => [sprite('grass-y-ml')],
            'e': () => [sprite('grass-y-mr')],
            'f': () => [sprite('grass-y-tl')],
            'g': () => [sprite('grass-y-tm')],
            'h': () => [sprite('grass-y-tr')],
            'i': () => [sprite('grass-y-bl')],
            'j': () => [sprite('grass-y-bm')],
            'k': () => [sprite('grass-y-br')]
        }}),

        addLevel([
            '                                      ',
            '    0                      0          ',
            '322 1         3            1   0      ',
            '2 0         0                  1      ',
            '3 1         1     4               0   ',
            ' 3    0           6               1   ',
            '      1                   0 0         ',
            '0 0                       1 1         ',
            '1 1    0                   0          ',
            '00     1   4               1          ',
            '1100       6                          ',
            '0011 0                                ',
            '11   1                                ',
            '                               4      ',
            '                               5      ',
            '                               6      '
        ],{tileWidth: 16, tileHeight: 16, tiles: {
            0: () => [sprite('tree-1')],
            1: () => [sprite('tree-2')],
            2: () => [sprite('flower-1')],
            3: () => [sprite('flower-2')],
            4: () => [sprite('ladder-t')],
            5: () => [sprite('ladder-m')],
            6: () => [sprite('ladder-b')],
            7: () => [sprite('small-tree-1')],
            8: () => [sprite('small-tree-2')] 
        }})
    ]

    map.forEach(layer => {
        layer.use(scale(2))
        layer.use(pos(200,200))
    })
}