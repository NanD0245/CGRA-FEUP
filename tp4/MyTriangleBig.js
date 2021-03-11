import {CGFobject} from '../lib/CGF.js';

export class MyTriangleBig extends CGFobject {
    constructor(scene, blueOrNot){
        super(scene);
        this.blueTriangle = blueOrNot;
        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [
            -2, 0, 0,
            2, 0, 0,
            0, 2, 0
        ];
        
        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        this.indices = [
            0, 1, 2
        ];

        if (this.blueTriangle) {

            this.texCoords = [
                0, 0,
                0.5, 0.5,
                1, 0
            ];

        } else {

            this.texCoords = [
                1, 0,
                0.5, 0.5,
                1, 1
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