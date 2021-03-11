import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {MyDiamond} from './MyDiamond.js';
import {MyParallelogram} from './MyParallelogram.js';
import {MyTriangle} from './MyTriangle.js';
import {MyTriangleBig} from './MyTriangleBig.js';
import {MyTriangleSmall} from './MyTriangleSmall.js';

export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.diamond = new MyDiamond(this.scene);
		this.pinkTriangle = new MyTriangle(this.scene);
		this.blueTriangle = new MyTriangleBig(this.scene);
		this.orangeTriangle = new MyTriangleBig(this.scene);
		this.parallelogram = new MyParallelogram(this.scene);
		this.redTriangle = new MyTriangleSmall(this.scene);
		this.purpleTriangle = new MyTriangleSmall(this.scene);

		this.diamondMaterial = new CGFappearance(this.scene);
		this.pinkMaterial = new CGFappearance(this.scene);
		this.blueMaterial = new CGFappearance(this.scene);
		this.orangeMaterial = new CGFappearance(this.scene);
		this.parallelogramMaterial = new CGFappearance(this.scene);
		this.redMaterial = new CGFappearance(this.scene);
		this.purpleMaterial = new CGFappearance(this.scene);

		this.diamondMaterial.setAmbient(0, 1, 0, 1);
		this.diamondMaterial.setDiffuse(0, 1, 0, 1);
		this.diamondMaterial.setSpecular(1, 1, 1, 1);
		this.diamondMaterial.setShininess(10.0);

		this.pinkMaterial.setAmbient(1, 0.753, 0.796, 1);
		this.pinkMaterial.setDiffuse(1, 0.753, 0.796, 1);
		this.pinkMaterial.setSpecular(1, 1, 1, 1);
		this.pinkMaterial.setShininess(10.0);

		this.blueMaterial.setAmbient(0.012, 0.662, 0.956, 1);
		this.blueMaterial.setDiffuse(0.012, 0.662, 0.956, 1);
		this.blueMaterial.setSpecular(1, 1, 1, 1);
		this.blueMaterial.setShininess(10.0);

		this.orangeMaterial.setAmbient(1, 0.514, 0, 1);
		this.orangeMaterial.setDiffuse(1, 0.514, 0, 1);
		this.orangeMaterial.setSpecular(1, 1, 1, 1);
		this.orangeMaterial.setShininess(10.0);

		this.parallelogramMaterial.setAmbient(1,1,0,1);
		this.parallelogramMaterial.setDiffuse(1,1,0,1);
		this.parallelogramMaterial.setSpecular(1, 1, 1, 1);
		this.parallelogramMaterial.setShininess(10.0);

		this.redMaterial.setAmbient(1, 0, 0, 1);
		this.redMaterial.setDiffuse(1, 0, 0, 1);
		this.redMaterial.setSpecular(1, 1, 1, 1);
		this.redMaterial.setShininess(10.0);

		this.purpleMaterial.setAmbient(1,0,1,1);
		this.purpleMaterial.setDiffuse(1,0,1,1);
		this.purpleMaterial.setSpecular(1, 1, 1, 1);
		this.purpleMaterial.setShininess(10.0);
	}

    display() {

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
		];

        this.scene.pushMatrix();
		//this.scene.setDiffuse(1, 0.753, 0.796, 1);
		this.scene.translate(1, 3, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.pinkMaterial.apply();
		this.pinkTriangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.multMatrix(diamondTranslation2Matrix);
		this.scene.multMatrix(diamondRotationMatrix);
		this.scene.multMatrix(diamondTranslation1Matrix);
		this.scene.updateCustomMaterial();
		this.scene.customMaterial.apply();
        this.diamond.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.setDiffuse(1,1,0,1);
		this.scene.translate(-Math.sqrt(2),-2*Math.sqrt(2),0);
		this.scene.rotate(Math.PI/4,0,0,1);
		this.scene.rotate(Math.PI,1,0,0);
		this.parallelogramMaterial.apply();
		this.parallelogram.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.setDiffuse(1,0,1,1);
		this.scene.translate(-Math.sqrt(2),-2.5*Math.sqrt(2),0);
		this.scene.rotate(Math.PI/4,0,0,1);
		this.purpleMaterial.apply();
		this.purpleTriangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.setDiffuse(0.012, 0.662, 0.956, 1);
		this.scene.rotate(Math.PI, 0, 0, 1);
		this.scene.translate(0, -2, 0);
		this.blueMaterial.apply();
		this.blueTriangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.setDiffuse(1, 0.514, 0, 1);
		this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
		this.orangeMaterial.apply();
		this.orangeTriangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.setDiffuse(1, 0, 0, 1);
		this.scene.translate(-1.8, -1.8, 0);
		this.scene.rotate(Math.PI/4, 0, 0, 1);
		this.redMaterial.apply();
		this.redTriangle.display();
		this.scene.popMatrix();
    }

	enableNormalViz() {
		this.diamond.enableNormalViz();
		this.pinkTriangle.enableNormalViz();
		this.parallelogram.enableNormalViz();
		this.purpleTriangle.enableNormalViz();
		this.blueTriangle.enableNormalViz();
		this.orangeTriangle.enableNormalViz();
		this.redTriangle.enableNormalViz();
    }
    disableNormalViz() {
		this.diamond.disableNormalViz();
		this.pinkTriangle.disableNormalViz();
		this.parallelogram.disableNormalViz();
		this.purpleTriangle.disableNormalViz();
		this.blueTriangle.disableNormalViz();
		this.orangeTriangle.disableNormalViz();
		this.redTriangle.disableNormalViz();
    }
}

