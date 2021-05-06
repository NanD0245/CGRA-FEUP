import { MyMovingFish } from "./MyMovingFish.js";
import { CGFappearance } from "../../../lib/CGF.js";

export class MyAutomatedFish extends MyMovingFish {
  constructor(scene) {
    super(scene);
    this.center = [
      Math.floor(Math.random() * 61) - 30,
      Math.floor(Math.random() * 5) + 1,
      Math.floor(Math.random() * 61) - 30,
    ];
    this.velocity = 0.1;
    this.orientationYY = Math.floor(Math.random()) < 0.5 ? -1 : 1;
    this.orientationYY *= Math.PI / 36;
    this.colors = [Math.random(), Math.random(), Math.random()];
    this.initial = this.orientationYY;
    this.pyramid.colors = [Math.random(), Math.random(), Math.random()];
    this.pyramid.shader.setUniformsValues({r : this.colors[0], g : this.colors[1], b : this.colors[2] });
    this.initPosition();
    this.initMaterials();
  }

  initPosition() {
    this.position = [this.center[0] + 5, this.center[1], this.center[2]];
  }

  initMaterials(){
      this.pyramid.finAppearance = new CGFappearance(this.scene);
      this.pyramid.finAppearance.setAmbient(this.colors[0], this.colors[1], this.colors[2], 1.0);
      this.pyramid.finAppearance.setDiffuse(this.colors[0], this.colors[1], this.colors[2], 1.0);
      this.pyramid.finAppearance.setSpecular(this.colors[0], this.colors[1], this.colors[2], 1.0);
      this.pyramid.finAppearance.setEmission(0, 0, 0, 1);
      this.pyramid.finAppearance.setShininess(120);
    } 
      
  update() {
    if (this.initial <= 0) {
      this.pyramid.turningRight = true;
    } else {
      this.pyramid.turningLeft = true;
    }
    super.update();
    this.orientationYY += this.initial % 7;
  }

}
