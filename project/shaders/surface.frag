#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D distortionmap;
uniform float timeFactor;


void main() {

	//vec4 map_filter = texture2D(distortionmap, vTextureCoord + vec2(timeFactor * 0.005, timeFactor * 0.005));

	//vec2 offset = vec2(map_filter.r -0.5, map_filter.g-0.5);

	//vec4 color = texture2D(uSampler, vTextureCoord + offset * 0.3);
	vec4 color = texture2D(uSampler, vTextureCoord);


	gl_FragColor = color;
}