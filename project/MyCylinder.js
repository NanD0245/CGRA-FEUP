import {CGFobject} from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene,slices, heigh) {
        super(scene);
        this.slices = slices;
        this.heigh = heigh;
        this.angle = (360 / this.slices)*Math.PI/180;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.currentAngle = 0;

        for (let i = 0; i <= this.slices; i++) {
                var x = Math.cos(this.currentAngle);
                var z = Math.sin(this.currentAngle);

                this.vertices.push(x,0,z);
                this.normals.push(x,0,z);
                if (i == 0)
                    this.texCoords.push(0,1);
                else this.texCoords.push(i/this.slices,1);
                this.vertices.push(x,this.heigh,z);
                this.normals.push(x,0,z);
                if (i == 0)
                    this.texCoords.push(0,0);
                else this.texCoords.push(i/this.slices,0);
            
            if (i >= 1) {
                var current = i * 2 + 2;
                this.indices.push(current - 4, current - 3, current - 1);
                this.indices.push(current - 1, current - 2, current - 4);
            }

            this.currentAngle += this.angle;
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

    }
}