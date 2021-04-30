import { CGFappearance, CGFobject } from "../../../lib/CGF.js";
import { MyPyramid } from "../shapes/MyPyramid.js";

export class MyAlgy extends CGFobject {
  constructor(scene) {
    super(scene);
    this.algy = new MyPyramid(this.scene, 3, 1);
    this.initBuffers();
    this.initMaterials();
    this.height = Math.random() + 1.0;
    this.rotation = Math.random() * (Math.PI + 1);
  }

  initMaterials() {
    this.algyAppearance = new CGFappearance(this.scene);
    this.algyAppearance.setAmbient(0.6, 0.8, 0.19, 1.0);
    this.algyAppearance.setDiffuse(0.6, 0.8, 0.19, 1.0);
    this.algyAppearance.setSpecular(0.6, 0.8, 0.19, 1.0);
    this.algyAppearance.setEmission(0.0, 0.0, 0.0, 1.0);
  }

  display() {
    this.scene.pushMatrix();
    this.scene.scale(0.1, this.height, 0.1);
    this.scene.rotate(this.rotation, 0, 1, 0);
    this.algyAppearance.apply();
    this.algy.display();
    this.scene.popMatrix();
  }
}
