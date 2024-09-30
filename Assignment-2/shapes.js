
let gl = undefined;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    // Add initialization code here
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);

    let cone = new Cone(gl, 36);
    let msCone = new MatrixStack();
    let angleCone = 0.0;

    let tetrahedron = new Tetrahedron(gl);
    let msTetrahedron = new MatrixStack();
    let angleTetrahedron = 0.0;

    let cylinder = new Cylinder(gl, 36);
    let msCylinder = new MatrixStack();
    let angleCylinder = 0.0;

    render(cone, msCone, angleCone, tetrahedron, msTetrahedron, angleTetrahedron, cylinder, msCylinder, angleCylinder);
}

function render(cone ,msCone, angleCone, tetrahedron, msTetrahedron, angleTetrahedron, cylinder, msCylinder, angleCylinder) {
    
    // Add rendering code here
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    angleCone += 4.0;
    angleCone %= 360.0;

    angleTetrahedron += 0.2;
    angleTetrahedron %= 30.0;

    angleCylinder += 2.0;
    angleCylinder %= 360.0;

    msCone.push();
    msCone.rotate(angleCone, [1, 1, 1]);
    msCone.scale(0.2);
    msCone.translate(2.0,0.0);
    cone.MV = msCone.current();
    cone.draw();
    msCone.pop();

    msTetrahedron.push();
    msTetrahedron.rotate(angleTetrahedron, [1, 1, 1]);
    msTetrahedron.scale(0.4);
    msTetrahedron.translate(-1.2,1.0);
    tetrahedron.MV = msTetrahedron.current();
    tetrahedron.draw();
    msTetrahedron.pop();

    msCylinder.push();
    msCylinder.rotate(angleCylinder, [0, 1, 0]);
    msCylinder.scale(0.2);
    msCylinder.translate(-2.5,0.0);
    cylinder.MV = msCylinder.current();
    cylinder.draw();
    msCylinder.pop();

    requestAnimationFrame(() => render(cone ,msCone ,angleCone ,tetrahedron ,msTetrahedron ,angleTetrahedron, cylinder, msCylinder, angleCylinder));

}

window.onload = init;

