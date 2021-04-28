#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSamplerV; //map
uniform float multiply;
uniform float subtract;

void main() {

    float offset = texture2D(uSamplerV, aTextureCoord).b * multiply - subtract;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x , aVertexPosition.y , aVertexPosition.z + offset, 1.0);

    vTextureCoord = aTextureCoord;
    
    /*vTextureCoord = aTextureCoord;

    vec3 offset = aVertexNormal * texture2D(uSamplerV, aTextureCoord).r * 0.1;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);*/

}