import { CGFobject } from "../lib/CGF.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangle } from "./MyTriangle.js";
import { MySphere } from "./MySphere.js";

export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.tail = new MyTriangleSmall(this.scene);
        this.leftFin = new MyTriangleSmall(this.scene);
        this.rightFin = new MyTriangleSmall(this.scene);
        this.body = new MySphere(this.scene, 16, 8);
        this.initBuffers();
    }

    display() {
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.tail.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, -0.25, -0.25);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(Math.PI/5, 0, 0, 1);
        this.scene.rotate(3*Math.PI/4, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.leftFin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.75, 1, 1.5);
        this.body.display();
        this.scene.popMatrix();
    }
}