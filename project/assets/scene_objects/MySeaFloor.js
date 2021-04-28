import {CGFobject, CGFshader, CGFtexture, CGFappearance} from '../../../lib/CGF.js';
import { MyPlane } from "../shapes/MyPlane.js";

export class MySeaFloor extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new MyPlane(scene, 20);

        this.shader = new CGFshader(this.scene.gl, "shaders/sea_floor.vert", "shaders/sea_floor.frag");
        this.map = new CGFtexture(this.scene, "images/sandMap.png");
        this.multiply = 0.12
        this.subtract = 0.06

        this.shader.setUniformsValues({uSamplerV: 1, multiply: this.multiply, subtract: this.subtract});

        this.initMaterials();
    }

    initMaterials() {
        this.sandAppearance = new CGFappearance(this.scene);
        this.sandAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
        this.sandAppearance.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.sandAppearance.setSpecular(0, 0, 0, 1.0);
        this.sandAppearance.setEmission(1, 1, 1, 1);
        this.sandAppearance.setShininess(120);
        this.sandAppearance.loadTexture("images/sand.png");
        this.sandAppearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        

        this.scene.pushMatrix();

        this.scene.setActiveShader(this.shader);
        this.map.bind(1);
        this.scene.scale(100,100,100);

        this.scene.rotate(-Math.PI/2,1,0,0);
        this.sandAppearance.apply();
        this.plane.display();

        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();

        
    }
}