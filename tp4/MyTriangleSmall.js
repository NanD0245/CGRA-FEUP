import {CGFobject} from '../lib/CGF.js';

export class MyTriangleSmall extends CGFobject {
    constructor(scene, redOrNot){
        super(scene);
        this.redOrNot = redOrNot;
        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [
            -1, 0, 0,
            1, 0, 0,
            0, 1, 0
        ];
        
        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        this.indices = [
            0, 1, 2
        ];

        if (this.redOrNot) {
            this.texCoords = [
                0.5, 0.5,
                0.25, 0.75,
                0.75, 0.75
            ];

        } else {
            this.texCoords = [
                0, 0,
                0, 0.5,
                0.25, 0.25
            ];
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}