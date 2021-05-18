import { CGFobject, CGFappearance } from "../../../lib/CGF.js";
import { MyRock } from "./MyRock.js";

export class MyNest extends CGFobject {
  constructor(scene) {
    super(scene);
    this.rock = new MyRock(scene, 16, 8);
    this.initMaterials();
    this.radius = 5;
    this.center = [-7.0, 0.0, -8.0];
  }

  initMaterials() {
    this.rockAppearance = new CGFappearance(this.scene);
    this.rockAppearance.setAmbient(0.8, 0.8, 0.8, 1.0);
    this.rockAppearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
    this.rockAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
    this.rockAppearance.setEmission(0, 0, 0, 1);
    this.rockAppearance.setShininess(120);
    this.rockAppearance.loadTexture("images/rock/rock_texture2.jpg");
    this.rockAppearance.setTextureWrap("REPEAT", "REPEAT");
  }

  display() {
    var angle = 0;
    this.scene.pushMatrix();

    this.scene.translate(this.center[0], this.center[1], this.center[2]);

    this.rockAppearance.apply();
    for (let i = 0; i < 12; i++) {
      this.scene.pushMatrix();
      this.scene.rotate(angle, 0, 1, 0);
      this.scene.translate(0, 0, this.radius + 1);
      this.rock.display();
      this.scene.popMatrix();
      angle += Math.PI / 6;
    }

    this.scene.popMatrix();
  }

  check_drop(position) {
    if (
      Math.hypot(
        position[0] - this.center[0],
        position[1] - this.center[1],
        position[2] - this.center[2]
      ) < this.radius
    )
      return true;
    return false;
  }
}
