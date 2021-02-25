import { CGFobject } from "../lib/CGF.js";

export class MyUnitCube extends CGFobject {
    constructor(scene){
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0,0,0, //0
            1,0,0, //1
            1,1,0, //2
            0,1,0, //3
            0,0,1, //4
            1,0,1, //5
            1,1,1, //6
            0,1,1  //7
        ];

        this.indices = [
            3,1,0,
            3,2,1,
            1,4,0,
            4,1,5,
            1,2,5,
            5,2,6,
            4,5,6,
            4,6,7,
            4,3,0,
            4,7,3,
            2,3,6,
            3,7,6
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}