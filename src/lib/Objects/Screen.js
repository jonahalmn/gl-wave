import Object3D from "./Object3D";

export default class Screen extends Object3D {

    constructor(gl, program) {
        super(gl, program)
        this.formName = "Screen"
        this.buffers.a_position.array = this.createPositions()
        this.buffers.a_position.length = 2
        this.buffers.a_texCoord = {
            array: this.createTexCoords(),
            length: 2,
            buffer: this.gl.createBuffer()
        }

        this.setBuffersData()
    }

    createPositions() {
        let buffer = [
            -1, -1,
            -1, 1,
            1, 1,
            1, 1,
            1, -1,
            -1, -1,
        ]

        return buffer
    }

    createTexCoords() {
        let buffer = [
            0, 0,
            0, 1,
            1, 1,
            1, 1,
            1, 0,
            0, 0,
        ]

        return buffer
    }

}