import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallelogram');
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');
        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');
        this.gui.add(this.scene, 'displayPurpleTriangleSmall').name('Display Small Purple Triangle');
        this.gui.add(this.scene, 'displayRedTriangleSmall').name('Display Small Red Triangle');
        this.gui.add(this.scene, 'displayBlueTriangleBig').name('Display Big Blue Triangle');
        this.gui.add(this.scene, 'displayOrangeTriangleBig').name('Display Big Orange Triangle');
        this.gui.add(this.scene, 'displayUnitCube').name('Display Unit Cube');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}