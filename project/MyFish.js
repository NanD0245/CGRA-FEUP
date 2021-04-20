import { CGFobject } from "../lib/CGF.js";

export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
}