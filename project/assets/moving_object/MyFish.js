import {
  CGFobject,
  CGFappearance,
  CGFshader,
  CGFtexture,
} from "../../../lib/CGF.js";
import { MyTriangleSmall } from "../shapes/MyTriangleSmall.js";
import { MySphere } from "../shapes/MySphere.js";

export class MyFish extends CGFobject {
  constructor(scene) {
    super(scene);
    this.turningLeft = false;
    this.turningRight = false;
    this.tail = new MyTriangleSmall(this.scene);
    this.tail_speed = 0;
    this.tail_offset = 0;
    this.tail_orientation = true;
    this.leftFin = new MyTriangleSmall(this.scene);
    this.rightFin = new MyTriangleSmall(this.scene);
    this.left_fin_offset = 0;
    this.right_fin_offset = 0;
    this.left_fin_orientation = true;
    this.right_fin_orientation = true;
    this.dorsal = new MyTriangleSmall(this.scene);
    this.body = new MySphere(this.scene, 16, 8);
    this.eye = new MySphere(this.scene, 16, 8);
    //shader
    this.shader = new CGFshader(
      this.scene.gl,
      "shaders/fish.vert",
      "shaders/fish.frag"
    );
    this.texture = new CGFtexture(
      this.scene,
      "images/fish_textures/fish_skin2.jpg"
    );
    this.shader.setUniformsValues({ r: 1, g: 0.5, b: 0 });

    this.initMaterials();
  }

  initMaterials() {
    this.bodyAppearance = new CGFappearance(this.scene);
    this.bodyAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.bodyAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.bodyAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.bodyAppearance.setEmission(0, 0, 0, 1);
    this.bodyAppearance.setShininess(120);
    this.bodyAppearance.setTexture(this.texture);
    this.bodyAppearance.setTextureWrap("REPEAT", "REPEAT");

    this.finAppearance = new CGFappearance(this.scene);
    this.finAppearance.setAmbient(1, 0.5, 0, 1.0);
    this.finAppearance.setDiffuse(1, 0.5, 0, 1.0);
    this.finAppearance.setSpecular(1, 0.5, 0, 1.0);
    this.finAppearance.setEmission(0, 0, 0, 1);
    this.finAppearance.setShininess(120);

    this.eyeAppearance = new CGFappearance(this.scene);
    this.eyeAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
    this.eyeAppearance.setDiffuse(0.7, 0.7, 0.7, 1.0);
    this.eyeAppearance.setSpecular(0, 0, 0, 1.0);
    this.eyeAppearance.setEmission(0, 0, 0, 1);
    this.eyeAppearance.setShininess(120);
    this.eyeAppearance.loadTexture("images/fish_textures/eye3.png");
    this.eyeAppearance.setTextureWrap("REPEAT", "REPEAT");
  }

  display() {
    this.scene.pushMatrix();

    //this.scene.translate(0,3,0);
    this.scene.scale(1 / 3, 1 / 3, 1 / 3);

    this.scene.pushMatrix();
    this.scene.setActiveShader(this.shader);
    this.bodyAppearance.apply();
    this.scene.scale(0.75, 1, 1.5);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.body.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();

    this.finAppearance.apply();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -1.5);
    this.scene.rotate(this.tail_offset, 0, 1, 0);
    this.scene.translate(0, 0, 1.5);
    this.scene.translate(0, 0, -2.5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.tail.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.715345, -0.25, +0.25);
    this.scene.rotate(-this.left_fin_offset, 0, 0, 1);
    this.scene.translate(-0.715345, +0.25, -0.25);
    this.scene.translate(0.715345, -0.25, +0.25);
    this.scene.scale(0.5, 0.5, 0.5);
    this.scene.rotate(Math.PI / 5, 0, 0, 1);
    this.scene.translate(0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    this.scene.rotate((3 * Math.PI) / 4, 1, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.leftFin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.715345, -0.25, +0.25);
    this.scene.rotate(this.right_fin_offset, 0, 0, 1);
    this.scene.translate(0.715345, +0.25, -0.25);
    this.scene.translate(-0.715345, -0.25, +0.25);
    this.scene.scale(0.5, 0.5, 0.5);
    this.scene.rotate(-Math.PI / 5, 0, 0, 1);
    this.scene.translate(0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    this.scene.rotate((3 * Math.PI) / 4, 1, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.rightFin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, Math.sqrt(2) / 4 + 0.9, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.scene.rotate((-3 * Math.PI) / 4, 1, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.dorsal.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, Math.sqrt(2) / 4 + 0.9, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.scene.rotate((-3 * Math.PI) / 4, 1, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.leftFin.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, 0.25, 0.75);
    this.scene.rotate((3 * Math.PI) / 4, 0, 1, 0);
    this.scene.scale(0.25, 0.25, 0.25);
    this.eyeAppearance.apply();
    this.eye.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0.25, 0.75);
    this.scene.rotate(Math.PI / 4, 0, 1, 0);
    this.scene.scale(0.25, 0.25, 0.25);
    this.eye.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }

  animation() {
    if (this.tail_orientation && this.tail_offset < Math.PI / 9)
      this.tail_offset += (Math.PI / 25) * (0.5 + Math.abs(this.tail_speed));
    else if (this.tail_orientation && this.tail_offset >= Math.PI / 9) {
      this.tail_offset -= (Math.PI / 25) * (0.5 + Math.abs(this.tail_speed));
      this.tail_orientation = false;
    } else if (!this.tail_orientation && this.tail_offset > -Math.PI / 9)
      this.tail_offset -= (Math.PI / 25) * (0.5 + Math.abs(this.tail_speed));
    else if (!this.tail_orientation && this.tail_offset <= -Math.PI / 9) {
      this.tail_offset += (Math.PI / 25) * (0.5 + Math.abs(this.tail_speed));
      this.tail_orientation = true;
    }
    if (!this.turningLeft) {
      if (this.left_fin_orientation && this.left_fin_offset < Math.PI / 9)
        this.left_fin_offset += Math.PI / 36;
      else if (
        this.left_fin_orientation &&
        this.left_fin_offset >= Math.PI / 9
      ) {
        this.left_fin_offset -= Math.PI / 36;
        this.left_fin_orientation = false;
      } else if (
        !this.left_fin_orientation &&
        this.left_fin_offset > -Math.PI / 9
      )
        this.left_fin_offset -= Math.PI / 36;
      else if (
        !this.left_fin_orientation &&
        this.left_fin_offset <= -Math.PI / 9
      ) {
        this.left_fin_offset += Math.PI / 36;
        this.left_fin_orientation = true;
      }
    }

    if (!this.turningRight) {
      if (this.right_fin_orientation && this.right_fin_offset < Math.PI / 9)
        this.right_fin_offset += Math.PI / 36;
      else if (
        this.right_fin_orientation &&
        this.right_fin_offset >= Math.PI / 9
      ) {
        this.right_fin_offset -= Math.PI / 36;
        this.right_fin_orientation = false;
      } else if (
        !this.right_fin_orientation &&
        this.right_fin_offset > -Math.PI / 9
      )
        this.right_fin_offset -= Math.PI / 36;
      else if (
        !this.right_fin_orientation &&
        this.right_fin_offset <= -Math.PI / 9
      ) {
        this.right_fin_offset += Math.PI / 36;
        this.right_fin_orientation = true;
      }
    }

    if (this.turningLeft) this.turningLeft = false;
    if (this.turningRight) this.turningRight = false;
  }
}
