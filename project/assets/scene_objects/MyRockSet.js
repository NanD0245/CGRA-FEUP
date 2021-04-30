import { CGFobject,CGFappearance } from '../../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        //this.rock = new MyRock(scene,16,8); 
        this.rocks = [];
        this.initMaterials();
        this.initRocks();
    }

    initMaterials() {
        this.rockAppearance = new CGFappearance(this.scene);
        this.rockAppearance.setAmbient(0.8, 0.8, 0.8, 1.0);
        this.rockAppearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
        this.rockAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.rockAppearance.setEmission(0, 0, 0, 1);
        this.rockAppearance.setShininess(120);
        this.rockAppearance.loadTexture("images/rock/rock_texture1.jpg");
        this.rockAppearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    randomTexture() {
        var t = Math.floor(Math.random() * 2);
        if (t <= 1) this.rockAppearance.loadTexture("images/rock/rock_texture2.jpg");
        else this.rockAppearance.loadTexture("images/rock/rock_texture1.jpg");
    }

    initRocks() {
        for (let i = 0; i < 20; i++) {
            var rock = new MyRock(this.scene, 16, 8);
            var x; var z;
            do {
                x = Math.floor(Math.random() * 99) - 49;
            } while(x < -1 && x > -13); //nest
            
            do {
                z = Math.floor(Math.random() * 99) - 49;
            } while(z < -2 && z > -14); //nest

            rock.setCenter(x,0,z);

            var orientation = Math.PI * Math.floor(Math.random() * 360) / 180;

            rock.setOrientation(orientation);

            var s_x = (Math.floor(Math.random() * 10) + 11) / 20;
            var s_y = (Math.floor(Math.random() * 10) + 11) / 20;
            var s_z = (Math.floor(Math.random() * 10) + 11) / 20;

            rock.setScalement(s_x,s_y,s_z);

            this.rocks.push(rock);
        }
    }


    display() {
        for (let i = 0; i < 20; i++) {
            
            var p = this.rocks[i].getCenter();
            var o = this.rocks[i].getOrientation();
            var s = this.rocks[i].getScalement();
            var rock = this.rocks[i];
            
            this.scene.pushMatrix();
            this.scene.translate(p[0],p[1],p[2]);
            this.scene.scale(s[0],s[1],s[2]);
            this.scene.rotate(o,0,1,0);
            this.rockAppearance.apply();
            rock.display();
            this.scene.popMatrix();
        }
    }
}