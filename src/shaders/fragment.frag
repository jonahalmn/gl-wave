precision highp float;

uniform vec4 u_color;
uniform float u_shininess;

varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

void main(){
    vec3 norm = normalize(v_normal);
    vec3 normal = normalize(v_normal);
    vec3 surfaceToLight = normalize(v_surfaceToLight);

    float diffuse = clamp(dot(normal, surfaceToLight), 0.01, 1.);

    vec3 halfVector = normalize(normalize(v_surfaceToView) + surfaceToLight);
    float specular = dot(normal, halfVector);

    gl_FragColor = (vec4(vec3(diffuse) * u_color.xyz, 1.));
    gl_FragColor.xyz += pow(specular,300.);
    vec4 sth = u_color;
}