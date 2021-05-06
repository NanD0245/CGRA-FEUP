import { MyMovingFish } from "./MyMovingFish.js";

export class MyAutomatedFish extends MyMovingFish {
  constructor(scene) {
    super(scene);
    this.center = [
      Math.floor(Math.random() * 99) - 49,
      Math.floor(Math.random() * 5) + 1,
      Math.floor(Math.random() * 99) - 49,
    ];
    this.velocity = 0.1;
    this.orientationYY = Math.floor(Math.random()) < 0.5 ? -1 : 1;
    this.orientationYY *= Math.PI / 36;
    this.initial = this.orientationYY;

    this.initPosition();
  }

  initPosition() {
    this.position = [this.center[0] + 5, this.center[1], this.center[2]];
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
