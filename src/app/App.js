import Cube from "../lib/Objects/Cube";

import v from "../shaders/vertex.vert"
import f from "../shaders/fragment.frag"
import vp from '../shaders/postprocessing/vertex.vert'
import fp from '../shaders/postprocessing/fragment.frag'

import Compiler from "../lib/Core/Compiler"
import Camera from "../lib/Scene/Camera"
import m4 from "../lib/Utils/m4"

import cubeOBJ from './OBJ/rosenorminverse.obj'
import FromFile from "../lib/Objects/FromFile";
import Light from "../lib/Scene/Light";
import OrbitControl from "../lib/Utils/OrbitControl";
import Plane from "../lib/Objects/Plane";
import Screen from "../lib/Objects/Screen";

export default class App {

    constructor() {

        this.canvas = document.createElement('canvas')
        this.canvas.height = window.innerHeight * 2
        this.canvas.width = window.innerWidth * 2
        this.canvas.style.height = window.innerHeight + 'px'
        this.canvas.style.width = window.innerWidth + 'px'

        document.body.appendChild(this.canvas)
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl')

        this.gl.getExtension("OES_texture_float")
        this.gl.getExtension("OES_texture_float_linear")
        this.gl.getExtension("WEBKIT_WEBGL_depth_texture")
        this.gl.getExtension("MOZ_WEBGL_depth_texture")

        this.uniforms = {
            u_time: 0
        }

        this.fbo = this.gl.createFramebuffer()
        this.renderTexture = this.createRenderTexture()


        this.program = Compiler.createProgramWithTwoShaders(this.gl, v, f)
        this.postprogram = Compiler.createProgramWithTwoShaders(this.gl, vp, fp)
        this.objects = []
        //this.cube = new Cube(this.gl, this.program)

        for (let i = 0; i < 1; i++) {
            let cube = new Cube(this.gl, this.program)
            cube = new FromFile(this.gl, this.program, cubeOBJ)

            cube.uniforms.u_model = m4.translate(0, -2.5, 0)
            cube.uniforms.u_model = m4.multiply(cube.uniforms.u_model, m4.rotateX(0.4))
            //this.objects.push(cube)
        }

        this.gl.useProgram(this.program.program)
        //this.cube.setAttributes()

        this.camera = new Camera()
        this.controls = new OrbitControl(this.camera)
        this.light = new Light()
        this.plane = new Plane(this.gl, this.program, 256)
        this.objects.push(this.plane)
        this.program.setUniformsFromLiteral(this.camera.uniforms)
        //this.program.setUniformsFromLiteral(this.light.uniforms)

        //console.log(this.cube.uniforms)

        this.gl.clearColor(135 / 255, 177 / 255, 232 / 255, 1.0)

        this.gl.useProgram(this.postprogram.program)
        this.screen = new Screen(this.gl, this.postprogram)

        this.gl.enable(this.gl.DEPTH_TEST)

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo)

        this.render()
    }

    createRenderTexture() {
        let texture = this.gl.createTexture()
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RGBA,
            window.innerWidth * 2,
            window.innerHeight * 2,
            0,
            this.gl.RGBA,
            this.gl.FLOAT,
            null
        )
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

        return texture

    }

    render() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo)

        this.gl.framebufferTexture2D(
            this.gl.FRAMEBUFFER,
            this.gl.COLOR_ATTACHMENT0,
            this.gl.TEXTURE_2D,
            this.renderTexture,
            0
        )

        this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT)

        this.gl.useProgram(this.program.program)
        this.program.setUniformsFromLiteral(this.camera.uniforms)
        this.objects.forEach((obj) => {
            obj.setAttributes()
            //obj.uniforms.u_model = m4.multiply(obj.uniforms.u_model, m4.rotateY(0.005))
            this.program.setUniformsFromLiteral(obj.uniforms)
            if (obj.indices != undefined) {
                this.gl.drawElements(this.gl.TRIANGLES, obj.indices.array.length, this.gl.UNSIGNED_SHORT, 0)
            } else {
                this.gl.drawArrays(this.gl.TRIANGLES, 0, obj.buffers.a_normal.array.length / obj.buffers.a_position.length)
            }
        })
        this.program.setUniformsFromLiteral(this.uniforms)
        this.uniforms.u_time += 1

        this.gl.flush()

        this.gl.framebufferTexture2D(
            this.gl.FRAMEBUFFER,
            this.gl.COLOR_ATTACHMENT0,
            this.gl.TEXTURE_2D,
            null,
            0
        )



        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)

        this.gl.useProgram(this.postprogram.program)
        this.screen.setAttributes()
        this.postprogram.setUniform('texture', this.renderTexture)
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT)
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)

        requestAnimationFrame(this.render.bind(this))
    }

}