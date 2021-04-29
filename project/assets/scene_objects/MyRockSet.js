import { CGFobject,CGFappearance } from '../../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
    constructor(scene) {
        super(scene);
        this.rock = new MyRock(scene,16,8); 
        this.initMaterials();
    }

    initMaterials() {
        this.rockAppearance = new CGFappearance(this.scene);
        this.rockAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
        this.rockAppearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
        this.rockAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.rockAppearance.setEmission(0, 0, 0, 1);
        this.rockAppearance.setShininess(120);
        this.rockAppearance.loadTexture("images/rock/rock_texture2.jpg");
        //this.rockAppearance.loadTexture("images/rock/rock_texture1.jpg");
        this.rockAppearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.pushMatrix();
        this.rockAppearance.apply();
        this.rock.display();
        this.scene.popMatrix();
    }
}