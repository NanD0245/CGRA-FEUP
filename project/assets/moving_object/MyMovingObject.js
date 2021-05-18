import { CGFappearance, CGFobject } from "../../../lib/CGF.js";
import { MyPyramid } from "../shapes/MyPyramid.js";
import { MyRock } from "../scene_objects/MyRock.js";

export class MyMovingObject extends CGFobject {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.pyramid = new MyPyramid(scene, 4, 1);
    this.initBuffers();
  }

  initBuffers() {
    this.position = [0, 5, 0];
    this.velocity = 0.0;
    this.orientationXX = Math.PI / 2;
    this.orientationYY = 0;
    this.rock = new MyRock(this.scene, 0, 0);
    this.rock.setCenter(1, 1, 1);
    this.haveRock = false;
  }

  getPosition() {
    return this.position;
  }

  getOrientation() {
    return this.orientationYY;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(this.position[0], this.position[1], this.position[2]); // move to final position
    this.scene.scale(
      this.scene.scaleFactor,
      this.scene.scaleFactor,
      this.scene.scaleFactor
    );
    this.scene.rotate(this.orientationYY, 0, 1, 0);
    this.scene.translate(
      -this.position[0],
      -this.position[1],
      -this.position[2]
    );
    this.scene.translate(this.position[0], this.position[1], this.position[2]);
    this.pyramid.display();
    this.scene.popMatrix();

    if (this.haveRock) {
      this.scene.pushMatrix();

      this.rock.setCenter(
        this.position[0] + Math.sin(this.orientationYY),
        this.position[1],
        this.position[2] + Math.cos(this.orientationYY)
      );

      this.rock.setOrientation(
        this.rock.getInitOrientation() + this.orientationYY
      );

      this.scene.popMatrix();
    }
  }

  update() {
    this.position[0] += this.velocity * Math.sin(this.orientationYY);
    this.position[2] += this.velocity * Math.cos(this.orientationYY);
    this.pyramid.animation();
  }

  turn(val) {
    this.orientationYY += val;
  }

  accelerate(val) {
    this.velocity += val;
  }

  reset() {
    this.velocity = 0;
    this.orientationYY = 0;
    this.position = [0, 5, 0];
    this.haveRock = 0;
  }

  ascend() {
    if (this.position[1] >= 0.9 && this.position[1] < 5.0)
      this.position[1] += 0.1;
  }

  descend() {
    if (this.position[1] >= 1 && this.position[1] <= 5.1)
      this.position[1] -= 0.1;
  }
}
