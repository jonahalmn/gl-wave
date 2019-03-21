import Parser from "obj-file-parser"
import Object3D from "./Object3D";

export default class FromFile extends Object3D {

    constructor(gl, program, file) {
        super(gl, program)
        this.parser = new Parser(file)
        this.objInfos = this.parser.parse()
        console.log(this.objInfos)
        this.uniforms.u_color = [0.7294117647, 0.01960784313, 0, 1]
        this.computePositionsAndNormals()
        this.setBuffersData()
    }

    computePositionsAndNormals() {
        this.objInfos.models.forEach((obj) => {
            obj.faces.forEach((face) => {
                face.vertices.forEach((vert) => {
                    for (let key in obj.vertices[vert.vertexIndex - 1]) {
                        if (obj.vertices[vert.vertexIndex - 1].hasOwnProperty(key)) {
                            let elt = obj.vertices[vert.vertexIndex - 1][key]
                            this.buffers.a_position.array.push(elt)
                        }
                    }

                    for (let key in obj.vertexNormals[vert.vertexNormalIndex - 1]) {
                        if (obj.vertexNormals[vert.vertexNormalIndex - 1].hasOwnProperty(key)) {
                            let elt = obj.vertexNormals[vert.vertexNormalIndex - 1][key]
                            this.buffers.a_normal.array.push(elt)
                        }
                    }
                })
            })
        })
        console.log(this.buffers.a_position.array)
        console.log(this.buffers.a_normal.array)
    }

}