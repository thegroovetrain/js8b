class Display {
    constructor(canvasID, scale=1) {
        this.width = 24 * Display.TILESIZE
        this.height = 18 * Display.TILESIZE
        this.scale = scale
        
        // canvas
        this.canvas = document.getElementById(canvasID)
        this.canvas.width = this.width * scale
        this.canvas.height = this.height * scale
        this.context = this.canvas.getContext('2d')
        this.context.imageSmoothingEnabled = false
        this.context.scale(scale, scale)

        // buffer
        this.buffer = document.createElement('canvas')
        this.buffer.width = this.width
        this.buffer.height = this.height
        this.bcontext = this.buffer.getContext('2d')
    }

    static COLOR(c) {
        c = c & 0xFF
        const red = (((c & 0xE0) >> 5) * 255) / 7
        const green = (((c & 0x1C) >> 2) * 255) / 7
        const blue = ((c & 0x03) * 255) / 3
        let hex = ((red << 16) + (green << 8) + blue).toString(16)
        while (hex.length < 6) {
            hex = '0' + hex
        }
        return `#${hex}`
    }

    static GRAY(g) {
        g = g & 0xFF
        return `#${((g << 16) + (g << 8) + g).toString(16)}`
    }

    static get TILESIZE() {
        return 8
    }


    colorTest() {
        console.log(`Display('${this.canvas.id}').colorTest()`)
        let r = 0
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 4; j++) {
                for (let g = 0; g < 8; g++) {
                    for (let b = 0; b < 4; b++) {
                        const color = (r << 5) + (g << 2) + b

                        this.bcontext.fillStyle = Display.COLOR(color)
                        const y = (i * (8 * Display.TILESIZE)) + (g * Display.TILESIZE)
                        const x = (j * (4 * Display.TILESIZE)) + (b * Display.TILESIZE)
                        this.bcontext.fillRect(x, y, Display.TILESIZE, Display.TILESIZE)
                    }
                }
                r++
            }
        }
    }


    clear() {
        console.log(`Display('${this.canvas.id}').clear()`)
        this.bcontext.fillStyle = Display.GRAY(0x00)
        this.bcontext.fillRect(0, 0, this.width, this.height)
    }

    flip() {
        console.log(`Display('${this.canvas.id}').flip()`)
        this.context.drawImage(this.buffer, 0, 0)
    }

}

const display = new Display('display', 3)
display.clear()
display.colorTest()
display.flip()