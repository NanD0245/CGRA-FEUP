import { CGFobject } from "../lib/CGF.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangle } from "./MyTriangle.js";

export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.tail = new MyTriangle(this.scene);
        this.fin = new MyTriangleSmall(this.scene);
        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.tail.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.fin.display();
        this.scene.popMatrix();
    }
}