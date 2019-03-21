import Cube from "../lib/Objects/Cube";

import v from "../shaders/vertex.vert"
import f from "../shaders/fragment.frag"
import Compiler from "../lib/Core/Compiler"
import Camera from "../lib/Scene/Camera"
import m4 from "../lib/Utils/m4"

import cubeOBJ from './OBJ/rosenorminverse.obj'
import FromFile from "../lib/Objects/FromFile";
import Light from "../lib/Scene/Light";

export default class App {

    constructor() {

        this.canvas = document.createElement('canvas')
        this.canvas.height = window.innerHeight
        this.canvas.width = window.innerWidth

        document.body.appendChild(this.canvas)
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl')


        this.program = Compiler.createProgramWithTwoShaders(this.gl, v, f)
        this.objects = []
        //this.cube = new Cube(this.gl, this.program)

        for (let i = 0; i < 1; i++) {
            let cube = new Cube(this.gl, this.program)
            cube = new FromFile(this.gl, this.program, cubeOBJ)

            cube.uniforms.u_model = m4.translate(0, -2.5, 0)
            cube.uniforms.u_model = m4.multiply(cube.uniforms.u_model, m4.rotateX(0.4))
            this.objects.push(cube)
        }

        this.gl.useProgram(this.program.program)
        //this.cube.setAttributes()

        this.camera = new Camera()
        this.light = new Light()
        this.program.setUniformsFromLiteral(this.camera.uniforms)
        this.program.setUniformsFromLiteral(this.light.uniforms)

        //console.log(this.cube.uniforms)

        this.gl.enable(this.gl.DEPTH_TEST)


        this.render()
    }

    render() {
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT)

        this.objects.forEach((obj) => {
            obj.setAttributes()
            obj.uniforms.u_model = m4.multiply(obj.uniforms.u_model, m4.rotateY(0.005))
            this.program.setUniformsFromLiteral(obj.uniforms)
            if (obj.indices != undefined) {
                this.gl.drawElements(this.gl.TRIANGLES, obj.indices.array.length, this.gl.UNSIGNED_SHORT, 0)
            } else {
                this.gl.drawArrays(this.gl.TRIANGLES, 0, obj.buffers.a_normal.array.length / obj.buffers.a_position.length)
            }
        })

        requestAnimationFrame(this.render.bind(this))
    }

}