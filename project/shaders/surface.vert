#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;
varying vec4 coords;
varying vec4 normal;

varying vec2 vTextureCoord;

uniform sampler2D distortionmap;
uniform float subtract;
uniform float multiply;

void main() {

    float offsetX = (texture2D(distortionmap, aTextureCoord).r  - subtract) * multiply;
    float offsetZ = (texture2D(distortionmap, aTextureCoord).g  - subtract) * multiply;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x + offsetX, aVertexPosition.y, aVertexPosition.z + offsetZ, 1.0);

	vTextureCoord = aTextureCoord;

    coords = vec4(aVertexPosition, 1.0);
}