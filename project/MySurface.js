import { CGFappearance, CGFobject, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MySurface extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
    this.texture = new CGFtexture(this.scene, "images/pier.jpg");
    this.initMaterials();
    this.square = new MyQuad(this.scene);
    this.shader = new CGFshader(this.scene.gl, "shaders/surface.vert", "shaders/surface.frag");

  }

  initMaterials() {
      this.material = new CGFappearance(this.scene);
      this.material.setAmbient(0.0, 0.0, 0.0, 0.0);
      this.material.setDiffuse(0.0, 0.0, 0.0, 0.0);
      this.material.setSpecular(0.0, 0.0, 0.0, 0.0);
      this.material.setEmission(1, 1, 1, 1);
      this.material.setTexture(this.texture);
      this.material.setTextureWrap("REPEAT", "REPEAT");
  }

  initBuffers() {}

  display() {
      this.scene.setActiveShader(this.shader);
      this.scene.pushMatrix();
      this.material.apply();
      this.scene.translate(0, 10, 0);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.scene.scale(10, 10, 1);
      this.square.display();
      this.scene.popMatrix();
  }
}
