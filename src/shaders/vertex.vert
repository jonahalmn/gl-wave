attribute vec4 a_position;
attribute vec3 a_normal;

uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_model;
uniform vec3 u_lightDirection;
uniform vec3 u_lightModelPosition;


varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

void main(){
    gl_Position = u_projection * u_view * u_model * a_position;

    v_normal = mat3(u_model) * a_normal;
    v_surfaceToLight = u_lightModelPosition - (a_position * u_model).xyz
    v_surfaceToView = (u_view[3] - a_position).xyz;
}