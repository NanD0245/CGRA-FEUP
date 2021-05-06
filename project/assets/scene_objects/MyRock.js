import { CGFobject } from "../../../lib/CGF.js";
import { MyRockShape } from "../shapes/MyRockShape.js"

export class MyRock extends CGFobject {
	constructor(scene,slices, stacks) {
		super(scene);
		this.rock = new MyRockShape(scene,slices,stacks);
	}

	setInitCenter(x,y,z) {this.rock.setInitCenter(x,y,z); }

	setCenter(x,y,z) { this.rock.setCenter(x,y,z); }

	getCenter() { return this.rock.getCenter(); }

	setOrientation(x) { this.rock.setOrientation(x); }

	getOrientation() { return this.rock.getOrientation(); }

	setScalement(x,y,z) { this.rock.setScalement(x,y,z); }

	getScalement() { return this.rock.getScalement(); }

	display() {

		var p = this.rock.getCenter();
		var o = this.rock.getOrientation();
		var s = this.rock.getScalement();
		
		this.scene.pushMatrix();
		this.scene.translate(p[0],p[1],p[2]);
		this.scene.scale(s[0],s[1],s[2]);
		this.scene.rotate(o,0,1,0);

		this.rock.display();
		
		this.scene.popMatrix();
	}

	reset() {
		this.rock.reset();
	}
}
