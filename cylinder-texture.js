class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

function map_cylinder_point(point) {
    let theta = arctan2(point.x, point.z);

    let rawU = theta / (2 * Constants.PI);

    let u = 1 - (rawU + 0.5);

    let v = point.y % 1;

    return (u,v);
}


//
// set up color
//
var color = [];
for (var i = 0; i < teapot.positions.length; i++) {
    color.push(1.0);
    color.push(0.0);
    color.push(1.0);
    color.push(1);
}

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
              new Float32Array(color),
              gl.STATIC_DRAW);