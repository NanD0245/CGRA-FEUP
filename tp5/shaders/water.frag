#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler3;
uniform sampler2D uSampler2;

void main() {
    vec4 water = texture2D(uSampler3, vTextureCoord);
    gl_FragColor = water;
}