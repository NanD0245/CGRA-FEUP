import { MyFish } from "./MyFish.js";
import { MyMovingObject } from "./MyMovingObject.js";

export class MyMovingFish extends MyMovingObject {
  constructor(scene) {
    super(scene);
    this.pyramid = new MyFish(this.scene);
  }

  lowerBound() {
    return this.position[1] <= 1.0 ? true : false;
  }
}
