import { CGFobject } from '../lib/CGF.js';
//import { MyQuad } from './MyQuad.js';
import {MyPlane} from './MyPlane.js'
import { MyQuad } from './MyQuad.js';

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene){
        super(scene);
        this.face = new MyQuad(this.scene);
    }

    display() {
        

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.face.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.face.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        if (this.scene.displayNormals)
            this.face.enableNormalViz();
        else
            this.face.disableNormalViz();
    }
}