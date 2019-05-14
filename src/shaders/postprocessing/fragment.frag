precision highp float;

uniform sampler2D texture;
uniform float u_kernel[9];

varying vec2 v_texCoord;

void main(){

    vec2 coords = v_texCoord;
    //coords.x += cos(coords.y*20.)/20.;

    vec4 tex = texture2D(texture, coords);
    //vec4 texGlitch = vec4(texture2D(texture, v_texCoord + .002).x, texture2D(texture, v_texCoord + .001).y,  texture2D(texture, v_texCoord - .001).z, .1);
    //tex = pow(tex, vec4(2.)) + 0.1
    gl_FragColor = tex;
}