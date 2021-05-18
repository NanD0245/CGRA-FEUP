import { CGFobject, CGFappearance } from "../../../lib/CGF.js";
import { MyCylinder } from "../shapes/MyCylinder.js";

export class MyPillar extends CGFobject {
  constructor(scene) {
    super(scene);

    this.pillar = new MyCylinder(scene, 8, 11);

    this.initMaterials();
  }

  initMaterials() {
    this.woodAppearance = new CGFappearance(this.scene);
    this.woodAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
    this.woodAppearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
    this.woodAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
    this.woodAppearance.setEmission(0, 0, 0, 1);
    this.woodAppearance.setShininess(120);
    this.woodAppearance.loadTexture("images/pillar/pillar_texture.jpg");
    this.woodAppearance.setTextureWrap("REPEAT", "REPEAT");
  }

  display() {
    this.scene.pushMatrix();
    this.woodAppearance.apply();
    this.pillar.display();
    this.scene.popMatrix();
  }
}
