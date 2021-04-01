import { CGFobject } from "../lib/CGF.js";
import { MyPyramid } from "./MyPyramid.js";


export class MyMovingObject extends CGFobject {
    constructor(scene) {
		super(scene);
        this.pyramid = new MyPyramid(scene,4,1);
    }

    display() {
        this.pyramid.display();
    }
}