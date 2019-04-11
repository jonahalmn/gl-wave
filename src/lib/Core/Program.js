export default class Program {
    /**
* Program.
* @constructor
* @param {WebGLRenderingContext} gl - The this.gl context.
* @param {WebGLProgram} program - The program.
*/
    constructor(gl, program) {
        this.gl = gl
        this.program = program
        this.uniforms = []
        this.attribLocs = []
        this.fillAttribArray()
        this.fillUniformsArray()
    }

    fillAttribArray() {
        let num = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES)

        for (let i = 0; i < num; i++) {
            let attr = this.gl.getActiveAttrib(this.program, i)
            this.attribLocs[attr.name] = this.gl.getAttribLocation(this.program, attr.name)
        }
    }

    setUniformsFromLiteral(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const elt = obj[key]
                this.setUniform(key, elt)
            }
        }
    }

    fillUniformsArray() {
        let num = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS)
        for (let i = 0; i < num; i++) {
            let uniform = this.gl.getActiveUniform(this.program, i)

            this.uniforms[uniform.name] = {
                loc: this.gl.getUniformLocation(this.program, uniform.name),
                setter: this.createUniformSetter(this.program, uniform),
            }
        }

    }

    setUniform(n, d) {
        if (this.uniforms[n]) {
            this.uniforms[n].setter(d)
        } else {
            console.error('cannot assign value to uniform :(', 'the uniform named ' + n + ' don\'t match with yours shaders')
        }
    }

    createUniformSetter(program, uniformInfo) {
        var location = this.gl.getUniformLocation(program, uniformInfo.name);
        var type = uniformInfo.type;
        // Check if this uniform is an array
        var isArray = (uniformInfo.size > 1 && uniformInfo.name.substr(-3) === "[0]");
        if (type === this.gl.FLOAT && isArray) {
            return (v) => {
                this.gl.uniform1fv(location, v);
            };
        }
        if (type === this.gl.FLOAT) {
            return (v) => {
                this.gl.uniform1f(location, v);
            };
        }
        if (type === this.gl.FLOAT_VEC2) {
            return (v) => {
                this.gl.uniform2fv(location, v);
            };
        }
        if (type === this.gl.FLOAT_VEC3) {
            return (v) => {
                this.gl.uniform3fv(location, v);
            };
        }
        if (type === this.gl.FLOAT_VEC4) {
            return (v) => {
                this.gl.uniform4fv(location, v);
            };
        }
        if (type === this.gl.INT && isArray) {
            return (v) => {
                this.gl.uniform1iv(location, v);
            };
        }
        if (type === this.gl.INT) {
            return (v) => {
                this.gl.uniform1i(location, v);
            };
        }
        if (type === this.gl.INT_VEC2) {
            return (v) => {
                this.gl.uniform2iv(location, v);
            };
        }
        if (type === this.gl.INT_VEC3) {
            return (v) => {
                this.gl.uniform3iv(location, v);
            };
        }
        if (type === this.gl.INT_VEC4) {
            return (v) => {
                this.gl.uniform4iv(location, v);
            };
        }
        if (type === this.gl.BOOL) {
            return (v) => {
                this.gl.uniform1iv(location, v);
            };
        }
        if (type === this.gl.BOOL_VEC2) {
            return (v) => {
                this.gl.uniform2iv(location, v);
            };
        }
        if (type === this.gl.BOOL_VEC3) {
            return (v) => {
                this.gl.uniform3iv(location, v);
            };
        }
        if (type === this.gl.BOOL_VEC4) {
            return (v) => {
                this.gl.uniform4iv(location, v);
            };
        }
        if (type === this.gl.FLOAT_MAT2) {
            return (v) => {
                this.gl.uniformMatrix2fv(location, false, v);
            };
        }
        if (type === this.gl.FLOAT_MAT3) {
            return (v) => {
                this.gl.uniformMatrix3fv(location, false, v);
            };
        }
        if (type === this.gl.FLOAT_MAT4) {
            return (v) => {
                this.gl.uniformMatrix4fv(location, false, v);
            };
        }
        if ((type === this.gl.SAMPLER_2D || type === this.gl.SAMPLER_CUBE) && isArray) {
            var units = [];
            for (var ii = 0; ii < info.size; ++ii) {
                units.push(textureUnit++);
            }
            return function (bindPoint, units) {
                return function (textures) {
                    this.gl.uniform1iv(location, units);
                    textures.forEach(function (texture, index) {
                        this.gl.activeTexture(gl.TEXTURE0 + units[index]);
                        this.gl.bindTexture(bindPoint, texture);
                    });
                };
            }(getBindPointForSamplerType(this.gl, type), units);
        }
        if (type === this.gl.SAMPLER_2D || type === this.gl.SAMPLER_CUBE) {
            return function (bindPoint, unit) {
                return function (texture) {
                    this.gl.uniform1i(location, unit);
                    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
                    this.gl.bindTexture(bindPoint, texture);
                }.bind(this);
            }.bind(this)(getBindPointForSamplerType(this.gl, type), 0);
        }
        throw ("unknown type: 0x" + type.toString(16)); // we should never get here.
    }



}

function getBindPointForSamplerType(gl, type) {
    if (type === gl.SAMPLER_2D) {
        return gl.TEXTURE_2D;
    }
    if (type === gl.SAMPLER_CUBE) {
        return gl.TEXTURE_CUBE_MAP;
    }
}