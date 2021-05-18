import { CGFobject } from "../../../lib/CGF.js";
import { MyPillar } from "./MyPillar.js";

export class MyPillarSet extends CGFobject {
  constructor(scene) {
    super(scene);

    this.pillar = new MyPillar(scene);
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(5.5, -1, -0.5);
    this.pillar.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(5.5, -1, -6.5);
    this.pillar.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(35, -1, -0.5);
    this.pillar.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(35, -1, -6.5);
    this.pillar.display();
    this.scene.popMatrix();
  }
}
