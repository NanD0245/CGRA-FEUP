import { CGFobject, CGFappearance } from "../../../lib/CGF.js";
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.rocks = [];
    this.initMaterials();
    this.initRocks();
  }

  initMaterials() {
    this.rockAppearance = new CGFappearance(this.scene);
    this.rockAppearance.setAmbient(0.8, 0.8, 0.8, 1.0);
    this.rockAppearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
    this.rockAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
    this.rockAppearance.setEmission(0, 0, 0, 1);
    this.rockAppearance.setShininess(120);
    this.rockAppearance.loadTexture("images/rock/rock_texture1.jpg");
    this.rockAppearance.setTextureWrap("REPEAT", "REPEAT");
  }

  randomTexture() {
    var t = Math.floor(Math.random() * 2);
    if (t <= 1)
      this.rockAppearance.loadTexture("images/rock/rock_texture2.jpg");
    else this.rockAppearance.loadTexture("images/rock/rock_texture1.jpg");
  }

  initRocks() {
    for (let i = 0; i < 50; i++) {
      var rock = new MyRock(this.scene, 16, 8);
      var x;
      var z;
      do {
        x = Math.floor(Math.random() * 99) - 49;
      } while (x < -1 && x > -13); //nest

      do {
        z = Math.floor(Math.random() * 99) - 49;
      } while (z < -2 && z > -14); //nest

      rock.setInitCenter(x, 0, z);

      var orientation = (Math.PI * Math.floor(Math.random() * 360)) / 180;

      rock.setInitOrientation(orientation);

      var s_x = (Math.floor(Math.random() * 10) + 11) / 40;
      var s_y = (Math.floor(Math.random() * 10) + 11) / 40;
      var s_z = (Math.floor(Math.random() * 10) + 11) / 40;

      rock.setScalement(s_x, s_y, s_z);

      var n_x = Math.floor(Math.random() * 5) - 7;
      var n_z = Math.floor(Math.random() * 5) - 8;

      rock.setNestPosition(n_x, 0, n_z);

      this.rocks.push(rock);
    }
  }

  display() {
    this.rockAppearance.apply();
    for (let i = 0; i < 50; i++) {
      this.rocks[i].display();
    }
  }

  reset() {
    for (let i = 0; i < 50; i++) {
      this.rocks[i].reset();
    }
  }

  getRock(position) {
    for (let i = 0; i < 50; i++) {
      var pos = this.rocks[i].getCenter();
      if (
        Math.hypot(
          position[0] - pos[0],
          position[1] - pos[1],
          position[2] - pos[2]
        ) < 1.5
      )
        return this.rocks[i];
    }
    return null;
  }
}
