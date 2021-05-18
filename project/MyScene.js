import {
  CGFscene,
  CGFcamera,
  CGFaxis,
  CGFappearance,
  CGFtexture,
} from "../lib/CGF.js";
import { MySphere } from "./assets/shapes/MySphere.js";
import { MyUnitCubeQuad } from "./assets/scene_objects/MyUnitCubeQuad.js";
import { MyCylinder } from "./assets/shapes/MyCylinder.js";
import { MySeaFloor } from "./assets/scene_objects/MySeaFloor.js";
import { MySurface } from "./assets/scene_objects/MySurface.js";
import { MyPillarSet } from "./assets/scene_objects/MyPillarSet.js";
import { MyRockSet } from "./assets/scene_objects/MyRockSet.js";
import { MyNest } from "./assets/scene_objects/MyNest.js";
import { MyAlgaeSet } from "./assets/scene_objects/MyAlgaeSet.js";
import { MyRock } from "./assets/scene_objects/MyRock.js";

import { MyMovingFish } from "./assets/moving_object/MyMovingFish.js";
import { MyAutomatedFish } from "./assets/moving_object/MyAutomatedFish.js";

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
    this.movingFish = new MyMovingFish(this);
    this.cubeQuad = new MyUnitCubeQuad(this);
    this.cylinder = new MyCylinder(this, 8, 3);
    this.sea_floor = new MySeaFloor(this);
    this.surface = new MySurface(this);
    this.pillarSet = new MyPillarSet(this);
    this.rockSet = new MyRockSet(this);
    this.algae = new MyAlgaeSet(this);
    this.nest = new MyNest(this);
    this.rock = this.movingFish.rock;
    this.sphere = new MySphere(this,16,8);
    this.automated = new MyAutomatedFish(this);
    this.automated2 = new MyAutomatedFish(this);

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
    this.movingFish.update();
    this.automated.update();
    this.automated2.update();
    this.surface.update(t);
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      this.movingFish.pyramid.tail_speed += 0.5;
      this.movingFish.accelerate(0.1 * this.speedFactor);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keysPressed = true;
        this.movingFish.pyramid.tail_speed -= 0.5;
      this.movingFish.accelerate(-0.1 * this.speedFactor);
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      this.movingFish.pyramid.turningLeft = true;
      keysPressed = true;
      this.movingFish.turn(+Math.PI / 36);
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      this.movingFish.pyramid.turningRight = true;
      keysPressed = true;
      this.movingFish.turn(-Math.PI / 36);
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      keysPressed = true;
      this.movingFish.pyramid.tail_speed = 1;
      this.movingFish.reset();
      this.rockSet.reset();
    }

    if (this.gui.isKeyPressed("KeyP")) {
      text += " P ";
      keysPressed = true;
      this.movingFish.ascend();
    }

    if (this.gui.isKeyPressed("KeyL")) {
      text += " L ";
      keysPressed = true;
      this.movingFish.descend();
    }

    if(this.gui.isKeyPressed("KeyC")) {
      text += " C ";
      keysPressed = true;
      var position = this.movingFish.getPosition();
      if (!this.movingFish.haveRock) { //lift rock
        if ((this.rock = this.rockSet.getRock(position)) != null) {
          console.log(this.rock.getCenter());
          this.movingFish.rock = this.rock;
          this.movingFish.haveRock = true;
        }
      }
      else { //drop rock
        if (this.nest.check_drop(position) && this.movingFish.lowerBound()) {
          this.movingFish.haveRock = false;
          this.movingFish.rock.drop();
        }
      }
    }

    if(this.gui.isKeyPressed("Key"))

    if (keysPressed) console.log(text);
    if (this.movingFish.pyramid.turningLeft) console.log("Turning left");
    if (this.movingFish.pyramid.turningRight) console.log("Turning Right");
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

    this.defaultAppearance.apply();
    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.sea_floor.display();

    this.defaultAppearance.apply();

    this.cubeQuad.display();

    this.nest.display();

    this.surface.display();

    this.sphereAppearance.apply();

    this.pillarSet.display();

    this.rockSet.display();

    this.algae.display();

    this.movingFish.display();

    this.automated.display();

    this.automated2.display();
    //this.sphere.display();

    //this.translate(3,0,0);
    //this.rock.display();
  }
}
