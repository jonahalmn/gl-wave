import Object3D from "./Object3D";

export default class Plane extends Object3D {

    /**
     * 
     * @param {WebGLRenderingContext} gl
     * @param {WebGLProgram} program
     */
    constructor(gl, program, subsurf) {
        super(gl, program)
        this.formName = "Plane"
        this.subsurf = subsurf
        this.buffers.a_position.array = this.generatePosition()
        this.buffers.a_normal.array = this.generateNormals()

        this.uniforms.u_color = [38 / 255, 173 / 255, 1, 1]

        this.setBuffersData()
    }

    generatePosition() {
        let buffer = []
        for (var i = 0; i < this.subsurf; i++) {
            for (var j = 0; j < this.subsurf; j++) {
                let x1 = (i / this.subsurf - 0.5) * 20
                let x2 = (x1 + 20 / this.subsurf)

                let z1 = (j / this.subsurf - 0.5) * 20
                let z2 = (z1 + 20 / this.subsurf)

                buffer.push(
                    x1, 0, z1,
                    x2, 0, z1,
                    x1, 0, z2,
                    x1, 0, z2,
                    x2, 0, z1,
                    x2, 0, z2,
                )
            }
        }
        console.log(buffer)
        return buffer
    }

    generateNormals() {
        let buffer = []
        for (var i = 0; i < this.subsurf; i++) {
            for (var j = 0; j < this.subsurf; j++) {
                buffer.push(
                    0, 1, 0,
                    0, 1, 0,
                    0, 1, 0,
                    0, 1, 0,
                    0, 1, 0,
                    0, 1, 0,
                )
            }
        }
        console.log(buffer)
        return buffer
    }


}