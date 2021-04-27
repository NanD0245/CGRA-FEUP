#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float ratio;
uniform vec4 body_color;

void main() {
	if (coords.x >= -0.3) { 
        vec4 color = texture2D(uSampler, vTextureCoord);
		gl_FragColor =  color;
    }
	else
	{
		vec4 color = vec4(1,0.5,0, 1.0);
		gl_FragColor =  color;
	}
}