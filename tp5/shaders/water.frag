#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 vTextureCoord2;

uniform sampler2D uSampler3;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
    vec4 color = texture2D(uSampler3, vTextureCoord2);

    vec4 filter = texture2D(uSampler2, vTextureCoord2);

    color = color - vec4(0.2*filter.b, 0.2*filter.b, 0.2*filter.b, 0.0);

	gl_FragColor = color;
}