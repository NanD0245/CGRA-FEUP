import {
  CGFappearance,
  CGFobject,
  CGFshader,
  CGFtexture,
} from "../../../lib/CGF.js";
import { MyPlane } from "../shapes/MyPlane.js";

export class MySurface extends CGFobject {
  constructor(scene) {
    super(scene);

    this.initMaterials();

    this.plane = new MyPlane(this.scene, 200);

    this.distortion = new CGFtexture(this.scene, "images/distortionmap.png");
    this.subtract = 0.5;
    this.multiply = 0.8;
    this.shader = new CGFshader(
      this.scene.gl,
      "shaders/surface.vert",
      "shaders/surface.frag"
    );

    this.shader.setUniformsValues({
      distortionmap: 2,
      subtract: this.subtract,
      multiply: this.multiply,
      timeFactor: 0,
    });
  }

  initMaterials() {
    this.material = new CGFappearance(this.scene);
    this.material.setAmbient(0.0, 0.0, 0.0, 0.0);
    this.material.setDiffuse(0.0, 0.0, 0.0, 0.0);
    this.material.setSpecular(0.0, 0.0, 0.0, 0.0);
    this.material.setEmission(1, 1, 1, 1);
    this.material.setShininess(120);
    this.material.loadTexture("images/pier.jpg");
    this.material.setTextureWrap("REPEAT", "REPEAT");
  }

  update(t) {
    this.shader.setUniformsValues({ timeFactor: t % 100000 });
  }

  display() {
    this.scene.pushMatrix();

    this.scene.setActiveShader(this.shader);
    this.distortion.bind(2);
    this.scene.translate(0, 10, 0);

    this.scene.scale(100, 100, 100);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.material.apply();
    this.plane.display();

    this.scene.setActiveShader(this.scene.defaultShader);

    this.scene.popMatrix();
  }
}
