import {CGFobject} from '../lib/CGF.js';
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
		this.scene.setDiffuse(0,1,0,1);
		this.scene.multMatrix(diamondTranslation2Matrix);
		this.scene.multMatrix(diamondRotationMatrix);
		this.scene.multMatrix(diamondTranslation1Matrix);
        this.diamond.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
		this.scene.setDiffuse(1, 0.753, 0.796, 1);
		this.scene.translate(1, 3, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.pinkTriangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.setDiffuse(1,1,0,1);
		this.scene.translate(-Math.sqrt(2),-2*Math.sqrt(2),0);
		this.scene.rotate(Math.PI/4,0,0,1);
		this.scene.rotate(Math.PI,1,0,0);
		this.parallelogram.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.setDiffuse(1,0,1,1);
		this.scene.translate(-Math.sqrt(2),-2.5*Math.sqrt(2),0);
		this.scene.rotate(Math.PI/4,0,0,1);
		this.purpleTriangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.setDiffuse(0.012, 0.662, 0.956, 1);
		this.scene.rotate(Math.PI, 0, 0, 1);
		this.scene.translate(0, -2, 0);
		this.blueTriangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.setDiffuse(1, 0.514, 0);
		this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
		this.orangeTriangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.setDiffuse(1, 0, 0, 1);
		this.scene.translate(-1.8, -1.8, 0);
		this.scene.rotate(Math.PI/4, 0, 0, 1);
		this.redTriangle.display();
		this.scene.popMatrix();
    }
}

