import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyPyramid } from "./MyPyramid.js";


export class MyMovingObject extends CGFobject {
    constructor(scene) {
		super(scene);
        this.pyramid = new MyPyramid(scene,4,1);
        this.initBuffers();
    }

    initBuffers() {
        this.position = [0,0,-0.5];
        this.velocity = 0.0;
        this.orientationXX = Math.PI / 2;
        this.orientationYY = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.translate(this.position[0], this.position[1], this.position[2]); // move to final position
        this.scene.rotate(this.orientationYY,0,1,0);
        this.scene.translate(-this.position[0], -this.position[1], -this.position[2]);
        this.scene.translate(this.position[0], this.position[1], this.position[2]);   
        this.scene.rotate(this.orientationXX, 1, 0, 0);
        this.pyramid.display();
        this.scene.popMatrix();
    }

    update() {
        this.position[0] += this.velocity * Math.sin(this.orientationYY);
        this.position[2] += this.velocity * Math.cos(this.orientationYY);
    }

    turn(val) {
        this.orientationYY += val;
    }

    accelerate(val) {
        this.velocity += val;
    }

    reset() {
        this.velocity = 0;
        this.orientationYY = 0;
        this.position = [0, 0, -0.5];
    }
}