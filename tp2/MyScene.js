import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import {MyTriangleSmall} from "./MyTriangleSmall.js"
import {MyTriangleBig} from "./MyTriangleBig.js"
import { MyParallelogram } from "./MyParallelogram.js";
import {MyUnitCube} from "./MyUnitCube.js"

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

		//Initialize scene objects
		this.axis = new CGFaxis(this);
		this.diamond = new MyDiamond(this);
		this.triangle = new MyTriangle(this);
		this.parallelogram = new MyParallelogram(this);
		this.purpleTriangleSmall = new MyTriangleSmall(this);
		this.redTriangleSmall = new MyTriangleSmall(this);
		this.blueTriangleBig = new MyTriangleBig(this);
		this.orangeTriangleBig = new MyTriangleBig(this);
		this.myUnitCube = new MyUnitCube(this);

		//Objects connected to MyInterface
		this.displayTriangle = true;
		this.displayPurpleTriangleSmall = true;
		this.displayRedTriangleSmall = true;
		this.displayBlueTriangleBig = true;
		this.displayOrangeTriangleBig = true;
		this.displayDiamond = true;
		this.displayAxis = true;
		this.displayParallelogram = true;
		this.displayUnitCube = true;
		this.scaleFactor = 1;

	}
		initLights() {
		this.lights[0].setPosition(15, 2, 5, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();
		this.lights[0].update();
	}
	initCameras() {
		this.camera = new CGFcamera(
			0.4,
			0.1,
			500,
			vec3.fromValues(15, 15, 15),
			vec3.fromValues(0, 0, 0)
		);
	}
	setDefaultAppearance() {
		this.setAmbient(0.2, 0.4, 0.8, 1.0);
		this.setDiffuse(0.2, 0.4, 0.8, 1.0);
		this.setSpecular(0.2, 0.4, 0.8, 1.0);
		this.setShininess(10.0);
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

		this.setDefaultAppearance();

		var sca = [
			this.scaleFactor,
			0.0,
			0.0,
			0.0,
			0.0,
			this.scaleFactor,
			0.0,
			0.0,
			0.0,
			0.0,
			this.scaleFactor,
			0.0,
			0.0,
			0.0,
			0.0,
			1.0,
		];

		/*this.multMatrix(sca);

		var angle = (15*Math.PI)/180;

		var diamondTranslation1Matrix = [
			1,0,0,0,
			0,1,0,0,
			0,0,1,0,
			0,1,0,1
		];

		var diamondTranslation2Matrix = [
			1,0,0,0,
			0,1,0,0,
			0,0,1,0,
	  		0,2,0,1
  		];

		var diamondRotationMatrix = [
			Math.cos(angle),  Math.sin(angle), 0, 0,
			-Math.sin(angle), Math.cos(angle), 0, 0,
			0,           0,          1, 0,
			0,           0,          0, 1
		];*/

		// ---- BEGIN Primitive drawing section
		/*this.pushMatrix();
		this.setDiffuse(0,1,0,1);
		this.multMatrix(diamondTranslation2Matrix);
		this.multMatrix(diamondRotationMatrix);
		this.multMatrix(diamondTranslation1Matrix)
		if (this.displayDiamond) this.diamond.display();
		this.popMatrix();
		
		this.pushMatrix();
		this.setDiffuse(1, 0.753, 0.796, 1);
		this.translate(1, 3, 0);
		this.rotate(Math.PI/2, 0, 0, 1);
		if (this.displayTriangle) this.triangle.display();
		this.popMatrix();

		this.pushMatrix();
		this.setDiffuse(1,1,0,1);
		this.translate(-Math.sqrt(2),-2*Math.sqrt(2),0);
		this.rotate(Math.PI/4,0,0,1);
		this.rotate(Math.PI,1,0,0);
		if (this.displayParallelogram) this.parallelogram.display();
		this.popMatrix();

		this.pushMatrix();
		this.setDiffuse(1,0,1,1);
		this.translate(-Math.sqrt(2),-2.5*Math.sqrt(2),0);
		this.rotate(Math.PI/4,0,0,1);
		if (this.displayPurpleTriangleSmall) this.purpleTriangleSmall.display();
		this.popMatrix();

		this.pushMatrix();
		this.setDiffuse(0.012, 0.662, 0.956, 1);
		this.rotate(Math.PI, 0, 0, 1);
		this.translate(0, -2, 0);
		if (this.displayBlueTriangleBig) this.blueTriangleBig.display();
		this.popMatrix();

		this.pushMatrix();
		this.setDiffuse(1, 0.514, 0);
		this.rotate(-3*Math.PI/4, 0, 0, 1);
		if (this.displayOrangeTriangleBig) this.orangeTriangleBig.display();
		this.popMatrix();

		this.pushMatrix();
		this.setDiffuse(1, 0, 0, 1);
		this.translate(-1.8, -1.8, 0);
		this.rotate(Math.PI/4, 0, 0, 1);
		if (this.displayRedTriangleSmall) this.redTriangleSmall.display();
		this.popMatrix();*/

		this.pushMatrix();
		this.translate(-0.5,-0.5,-0.5);
		if (this.displayUnitCube) this.myUnitCube.display();
		this.popMatrix();

		// ---- END Primitive drawing section
	}
}
