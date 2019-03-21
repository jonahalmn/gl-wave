precision mediump float;

uniform vec4 u_color;
uniform float u_shininess;

varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

void main(){
    vec3 norm = normalize(v_normal) * .5 + 0.5;
    vec3 normal = normalize(v_normal);
    vec3 surfaceToLight = normalize(v_surfaceToLight);

    float diffuse = dot(normal, surfaceToLight);

    gl_FragColor = (vec4(vec3(diffuse) * u_color.xyz, 1.));
    vec4 sth = u_color;
}