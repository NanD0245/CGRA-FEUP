import { CGFobject } from "../../../lib/CGF.js";
import { MyAlgaeGroup } from "./MyAlgaeGroup.js";

export class MyAlgaeSet extends CGFobject {
  constructor(scene) {
    super(scene);
    this.algaeGroups = [];
    this.initGroups();
  }

  initGroups() {
    for (let i = 0; i < 50; i++) {
      var group = new MyAlgaeGroup(this.scene);
      this.algaeGroups.push(group);
    }
  }

  display() {
    for (let i = 0; i < 50; i++) {
      var group = this.algaeGroups[i];

      this.scene.pushMatrix();
      group.display();
      this.scene.popMatrix();
    }
  }
}
