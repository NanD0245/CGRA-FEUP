
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	
	vTextureCoord = aTextureCoord;

	vec3 aVertexXAxis = vec3(1.0, 0.0, 0.0);

	if (texture2D(uSampler2, vec2(0.0,0.0)+vTextureCoord).b > 0.5) //Controls the letters going in a sin function .b = blue component over half.
		offset=aVertexNormal*normScale*0.1*sin(timeFactor); //aVertexNormal is the Normal vector of the geometry, wich means, in case of the plane,
															//it will only go in the z direction (normal = (0.0, 0.0, 1.0))

	offset += aVertexXAxis*normScale*0.1*sin(timeFactor); //adds another offset to also change the position regarding the x Axis.

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}

