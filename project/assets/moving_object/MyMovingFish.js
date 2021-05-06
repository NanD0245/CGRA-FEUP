import { MyFish } from "./MyFish.js";
import { MyMovingObject } from "./MyMovingObject.js";

export class MyMovingFish extends MyMovingObject {
  constructor(scene) {
    super(scene);
    this.pyramid = new MyFish(this.scene);
  }
}
