import { CGFobject } from "../../../lib/CGF.js";
import { MyAlgy } from "./MyAlgy.js";

export class MyAlgaeGroup extends CGFobject {
  constructor(scene) {
    super(scene);
    this.size = Math.floor(Math.random() * 7 + 1);
    this.center = [
      Math.floor(Math.random() * 99) - 49,
      Math.floor(Math.random() * 99) - 49,
    ];
    this.algae = [];
    this.initAlgae();
  }

  initAlgae() {
    for (let i = 0; i < this.size; i++) {
      let algy = new MyAlgy(this.scene);
      this.algae.push(algy);
    }
  }

  display() {
    for (let i = 0; i < this.size; i++) {
      var algy = this.algae[i];

      this.scene.pushMatrix();
      this.scene.translate(
        this.center[0] + 0.5 * Math.cos((Math.PI / 6) * i),
        0,
        this.center[1] + 0.5 * Math.sin((Math.PI / 6) * i)
      );
      algy.display();
      this.scene.popMatrix();
    }
  }
}
