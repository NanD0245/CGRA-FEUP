import { CGFobject } from "../../../lib/CGF.js";
import { MyRockShape } from "../shapes/MyRockShape.js";

export class MyRock extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.rock = new MyRockShape(scene, slices, stacks);
  }

  setInitCenter(x, y, z) {
    this.rock.setInitCenter(x, y, z);
  }

  setCenter(x, y, z) {
    this.rock.setCenter(x, y, z);
  }

  getCenter() {
    return this.rock.getCenter();
  }

  setOrientation(x) {
    this.rock.setOrientation(x);
  }

  setInitOrientation(x) {
    this.rock.setInitOrientation(x);
  }

  getInitOrientation() {
    return this.rock.getInitOrientatin();
  }

  getOrientation() {
    return this.rock.getOrientation();
  }

  setScalement(x, y, z) {
    this.rock.setScalement(x, y, z);
  }

  getScalement() {
    return this.rock.getScalement();
  }

  setNestPosition(x, y, z) {
    this.rock.setNestPosition(x, y, z);
  }

  getNestPosition() {
    return this.rock.getNestPosition();
  }

  display() {
    var p = this.rock.getCenter();
    var o = this.rock.getOrientation();
    var s = this.rock.getScalement();

    this.scene.pushMatrix();
    this.scene.translate(p[0], p[1], p[2]);
    this.scene.scale(s[0], s[1], s[2]);
    this.scene.rotate(o, 0, 1, 0);

    this.rock.display();

    this.scene.popMatrix();
  }

  reset() {
    this.rock.reset();
  }

  drop() {
    var nestPos = this.rock.getNestPosition();
    this.setCenter(nestPos[0], nestPos[1], nestPos[2]);
  }
}
