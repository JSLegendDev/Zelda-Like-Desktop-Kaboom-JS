import kaboom from 'kaboom'

kaboom()

const button = add([rect(100,100), pos(center()), area(), outline(3)])

button.onClick(() => {
    debug.log('hello')
})
