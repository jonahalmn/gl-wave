export default class OrbitControl {

    /**
     * 
     * @param {Camera} camera 
     */
    constructor(camera) {
        this.camera = camera

        this.mouseDown = false
        this.createEventListeners()
    }


    createEventListeners() {
        document.addEventListener('mousedown', this.onMouseDown.bind(this))
        document.addEventListener('mouseup', this.onMouseUp.bind(this))
        document.addEventListener('mousemove', this.onMouseMove.bind(this))
    }

    onMouseDown() {
        this.mouseDown = true
        console.log(this.mouseDown)
    }

    onMouseUp() {
        this.mouseDown = false
        console.log(this.mouseDown)
    }

    onMouseMove(e) {
        if (this.mouseDown === true) {
            console.log(e)
            this.camera.rotateX(e.movementY * Math.PI / 180)
            this.camera.rotateY(e.movementX * Math.PI / 180)
        }
    }

}