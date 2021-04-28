import {
  CGFscene,
  CGFcamera,
  CGFaxis,
  CGFappearance,
  CGFtexture,
  CGFshader,
} from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { gui } from "../lib/dat.gui.module.min.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyFish } from "./MyFish.js";
import { MyCylinder } from "./MyCylinder.js";
import { MySurface } from "./MySurface.js";
/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.setUpdatePeriod(50);

    this.enableTextures(true);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.sphere = new MySphere(this, 16, 8); //slices, stacks
    this.movingObject = new MyMovingObject(this);
    this.cubeQuad = new MyUnitCubeQuad(this);
    this.cylinder = new MyCylinder(this, 8, 3);
    this.fish = new MyFish(this);
    this.surface = new MySurface(this);
    this.fishShader = new CGFshader(
      this.gl,
      "shaders/fish.vert",
      "shaders/fish.frag"
    );
    this.surfaceShader = new CGFshader(
      this.gl,
      "shaders/surface.vert",
      "shaders/surface.frag"
    );

    this.defaultAppearance = new CGFappearance(this);
    this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.defaultAppearance.setEmission(0, 0, 0, 1);
    this.defaultAppearance.setShininess(120);

    this.sphereAppearance = new CGFappearance(this);
    this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
    this.sphereAppearance.setShininess(120);

    this.worldMapTexture = new CGFtexture(this, "images/earth.jpg");

    this.worldMap = new CGFappearance(this);
    this.worldMap.setAmbient(0.3, 0.3, 0.3, 1);
    this.worldMap.setDiffuse(0.7, 0.7, 0.7, 1);
    this.worldMap.setSpecular(0.0, 0.0, 0.0, 1);
    this.worldMap.setShininess(120);
    this.worldMap.setTexture(this.worldMapTexture);
    this.worldMap.setTextureWrap("REPEAT", "REPEAT");

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayEsphere = false;
    this.displayMovingObject = false;
    this.displayCubeQuad = false;
    this.displayCylinder = false;
    this.worldMapTexture = false;
    this.speedFactor = 1;
    this.scaleFactor = 1;
    this.selectLandscape = 0;
    this.landscapeIds = { Example: 0, Landscape1: 1, Test: -1 };
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.5,
      0.1,
      500,
      vec3.fromValues(2, 2, 2),
      vec3.fromValues(0, 2, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setEmission(0, 0, 0, 1);
    this.setShininess(10.0);
  }

  updateLandscape() {
    this.cubeQuad.updateTexture();
  }

  // called periodically (as per setUpdatePeriod() in init())
  update(t) {
    //To be done...
    this.checkKeys();
    this.movingObject.update();
    this.fish.animation();
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      this.movingObject.accelerate(0.1 * this.speedFactor);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keysPressed = true;
      this.movingObject.accelerate(-0.1 * this.speedFactor);
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      keysPressed = true;
      this.movingObject.turn(+Math.PI / 36);
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      keysPressed = true;
      this.movingObject.turn(-Math.PI / 36);
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      keysPressed = true;
      this.movingObject.reset();
    }

    if (this.gui.isKeyPressed("KeyP")) {
      text += " P ";
      keysPressed = true;
      //this.movingObject.reset();
    }

    if (this.gui.isKeyPressed("KeyL")) {
      text += " L ";
      keysPressed = true;
      //this.movingObject.reset();
    }

    if (keysPressed) console.log(text);
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.defaultAppearance.apply();
    // ---- BEGIN Primitive drawing section

    //This sphere does not have defined texture coordinates
    if (this.displayEsphere) {
      this.pushMatrix();
      if (this.worldMapTexture) {
        this.worldMap.apply();
        this.rotate((3 * Math.PI) / 4, 0, 1, 0);
      }
      this.sphere.display();
      this.popMatrix();
    }

    if (this.displayMovingObject) this.fish.display();

    this.defaultAppearance.apply();

    if (this.displayCubeQuad) this.cubeQuad.display();

    this.sphereAppearance.apply();

    if (this.displayCylinder) this.cylinder.display();

    this.surface.display();
    //this.fish.display();
    //restoring the default shader to draw the axis properly
    this.setActiveShader(this.defaultShader);
    // ---- END Primitive drawing section
  }
}
