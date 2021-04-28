#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 vTextureCoord2;

uniform sampler2D pier;
uniform sampler2D distortion;

void main() {
    vec4 color = texture2D(pier, vTextureCoord2);

    vec4 filter = texture2D(distortion, vTextureCoord2);

    color = color - vec4(0.2*filter.b, 0.2*filter.b, 0.2*filter.b, 0.0);

	gl_FragColor = color;
}