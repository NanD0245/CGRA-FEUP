import {CGFobject} from '../../../lib/CGF.js';

export class MyRock extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene
   * @param  {integer} slices
   * @param  {integer} stacks
   */
  constructor(scene, slices, stacks) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;

    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    var coordlat = 0;

    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      theta = 0;

      var coordlong = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        var random = (Math.floor(Math.random() * 41) - 20) / 200;
        var x = Math.cos(theta) * sinPhi + random;
        var y = cosPhi + random;
        var z = Math.sin(-theta) * sinPhi + random;

        this.vertices.push(x, y, z);

        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }

        this.normals.push(x - random, y - random , z - random);
        theta += thetaInc;

        
        this.texCoords.push(coordlong,coordlat);

        coordlong += 1/this.longDivs;
        
      }
      phi += phiInc;

      coordlat += 1/this.latDivs;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
