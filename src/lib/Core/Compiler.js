import Program from "./Program";

class Compiler {
    /**
 * Compiler.
 * @constructor
 * @param {WebGLRenderingContext} gl - The gl context.
 */
    constructor(gl) {
        this.gl = gl
    }

    createShader(gl, src, type) {
        let shader = gl.createShader(type)
        gl.shaderSource(shader, src)
        gl.compileShader(shader)

        let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

        if (success) {
            return shader
        }

        console.error('shader cannot be compiled :(', gl.getShaderInfoLog(shader))
    }

    createProgram(gl, vertexShader, fragmentShader) {
        let program = gl.createProgram()
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)

        let success = gl.getProgramParameter(program, gl.LINK_STATUS)

        if (success) {
            return program
        }

        console.error('program cannot be linked :(', gl.getProgramInfoLog(program))
    }

    createProgramWithTwoShaders(gl, vertexShader, fragmentShader) {
        let v = this.createShader(gl, vertexShader, gl.VERTEX_SHADER)
        let f = this.createShader(gl, fragmentShader, gl.FRAGMENT_SHADER)

        let program = this.createProgram(gl, v, f)

        if (program) {
            return new Program(gl, program)
        }
    }
}

export default new Compiler()