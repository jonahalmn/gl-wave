import m4 from '../Utils/m4'

export default class Camera {

    constructor() {
        this.uniforms = {}
        this.setProjection()
    }

    setProjection() {
        this.uniforms.u_projection = m4.perspective(0.9, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.uniforms.u_view = m4.inverse(m4.multiply(m4.identity(), m4.lookAt([0, 3, 6], [0, 0, 0], [0, 1, 0])))
    }

    rotateX(a) {
        this.uniforms.u_view = m4.multiply(this.uniforms.u_view, m4.rotateX(a))
    }

    rotateY(a) {
        this.uniforms.u_view = m4.multiply(this.uniforms.u_view, m4.rotateY(a))
    }

}