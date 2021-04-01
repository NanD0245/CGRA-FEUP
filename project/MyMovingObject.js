import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyPyramid } from "./MyPyramid.js";


export class MyMovingObject extends CGFobject {
    constructor(scene) {
		super(scene);
        this.pyramid = new MyPyramid(scene,4,1);
        this.velocity = 0;
        this.position = [0,0,0];
        this.orientation = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]); // move to final position
        this.scene.translate(-this.position[0], -this.position[1], -this.position[2]);   
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.pyramid.display();
        this.scene.popMatrix();
    }

    update() {
        this.position[0] += this.velocity * Math.sin(this.orientation);
        this.position[2] += this.velocity * Math.cos(this.orientation);
    }

    turn(val) {
        this.orientation += val;
    }

    accelerate(val) {
        this.velocity += val;
    }

    reset() {
        this.velocity = 0;
        this.orientation = 0;
        this.position = [0, 0, 0];
    }
}