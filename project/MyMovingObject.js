import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyPyramid } from "./MyPyramid.js";


export class MyMovingObject extends CGFobject {
    constructor(scene) {
		super(scene);
        this.pyramid = new MyPyramid(scene,4,1);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.pyramid.display();
        this.scene.popMatrix();
    }
}