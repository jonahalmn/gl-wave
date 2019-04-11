import m4 from '../Utils/m4'

export default class Object3D {

    /**
     * 
     * @param {WebGLRenderingContext} gl 
     */
    constructor(gl, program) {
        this.gl = gl
        this.program = program
        this.buffers = {
            a_normal: {
                array: [],
                buffer: this.gl.createBuffer(),
                length: 3
            },
            a_position: {
                array: [],
                buffer: this.gl.createBuffer(),
                length: 3
            }
        }
        this.uniforms = {
            u_model: m4.identity(),
            u_color: [0, 0, 0, 1]
        }
    }

    setBuffersData() {
        for (const key in this.buffers) {
            if (this.buffers.hasOwnProperty(key)) {
                const element = this.buffers[key]
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, element.buffer)
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(element.array), this.gl.STATIC_DRAW)
            }
        }
        if (this.indices != undefined) {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer)
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int16Array(this.indices.array), this.gl.STATIC_DRAW)
        }
    }

    setAttributes() {
        for (const key in this.buffers) {
            if (this.buffers.hasOwnProperty(key) && this.buffers[key].array.length !== 0) {
                const element = this.buffers[key]
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, element.buffer)
                this.gl.enableVertexAttribArray(this.program.attribLocs[key])
                this.gl.vertexAttribPointer(this.program.attribLocs[key], element.length, this.gl.FLOAT, false, 0, 0)
            }
        }

        if (this.indices != undefined) {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer)
        }
    }

}