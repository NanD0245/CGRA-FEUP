import {
  CGFscene,
  CGFcamera,
  CGFaxis,
  CGFappearance,
  CGFtexture,
} from "../lib/CGF.js";
import { MySphere } from "./assets/shapes/MySphere.js";
import { MyMovingObject } from "./assets/moving_object/MyMovingObject.js";
import { MyUnitCubeQuad } from "./assets/scene_objects/MyUnitCubeQuad.js";
import { MyFish } from "./assets/moving_object/MyFish.js";
import { MyCylinder } from "./assets/shapes/MyCylinder.js";
import { MySeaFloor } from "./assets/scene_objects/MySeaFloor.js";
import { MySurface } from "./assets/scene_objects/MySurface.js";
import { MyPillarSet } from "./assets/scene_objects/MyPillarSet.js";
import { MyRockSet } from "./assets/scene_objects/MyRockSet.js";
import { MyNest } from "./assets/scene_objects/MyNest.js";
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
    this.sea_floor = new MySeaFloor(this);
    this.surface = new MySurface(this);
    this.pillarSet = new MyPillarSet(this);
    this.rockSet = new MyRockSet(this, 16, 8);

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
    this.surface.update(t);
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

    //this.defaultAppearance.apply();
    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.movingObject.display();

    this.sea_floor.display();

    this.defaultAppearance.apply();

    this.cubeQuad.display();

    
    this.surface.display();

    this.defaultAppearance.apply();

    this.pillarSet.display();

    this.rockSet.display();
  }
}
