//
// LorenzEquations.js
// The code to handle the Lorenz equations functionality (without the UI and
// different equation stuff)
//

//
// Various resources that could be in a separate resource file
//

// Instead of using the entire window, use a fixed size since we have
// performance issues from using an older machine that doesn't have decent 3D
// capabilities
const _CanvasWidth = 300;
const _CanvasHeight = 450;

const _nMaxCurves = 5;

const _PlayMode_PLAYING = 1;
const _PlayMode_STOPPED = 2;

const _PointGeometry_XAxis = 1;
const _PointGeometry_YAxis = 2;
const _PointGeometry_ZAxis = 3;

// Colours used in drawing
const _CriticalPntColour = '#ff0066';
const _BackGroundColour = '#e6f2ff';
const _PntColours = [ '#0070e0', '#7000e0', '#e00070', '#e07000', '#458a00' ];

// Default positions used for the camera and the geometry
const _CamView = [ 0, 0, 60 ];
const _GeomPos = [ 0, -20, 0 ];

// Used when drawing the critical points.  The point sizes are computed based on
// these values.
const _MinCritPntSize = 0.65;
const _MaxCritPntSize = 3.00;

// Some default values...
const _Default_PntGeometry = _PointGeometry_XAxis;
const _Default_NumPoints = 3;
const _Default_PntSpacing = 0.5;
const _Default_XInitPos = 1.0;
const _Default_YInitPos = 2.0;
const _Default_ZInitPos = 3.0;

//
// Variables...
//

// Three.js related variables... note... 3D for the core stuff and geom for the
// geometry
var _3DRenderer;
var _3DScene;
var _3DCamera;
var _geomAxes;
var _geomCritPnts;
var _geomSolPnts;
var _geomSolCurves;
var _geomCont;

// Sigma, Beta, and Rho... the parameters to the Lorenz equation
const _dSigma = 10;
const _dBeta = 8 / 3;
const _dRho = [ 0.5, 13, 22.3, 28, 99.65, 100.75 ];
var _nCurrRho = 3;

var _IsPlaying = _PlayMode_STOPPED;
var _AnimFrameId;

// Used to keep track of the computation results
var _dCurrX = [];
var _dCurrY = [];
var _dCurrZ = [];
var _xValues = [];
var _yValues = [];
var _zValues = [];

// Used to keep track of the critial points
var _CriticalPntPositions = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];

// Solution curve length related
const _nMaxPoints = 5000;
var _nMaxCurveLength = 2000;

// Initial positions that give some reasonable results.
var _InitPos = [];
var _InitPosBase = [ _Default_XInitPos, _Default_YInitPos, _Default_ZInitPos ];
var _InitPntGeom = _Default_PntGeometry;
var _nNumInitPoints = _Default_NumPoints;
var _dInitPntDelta = _Default_PntSpacing;

// Compute rate related... how often the solution curve is updated
var _nComputeRate = 1;
var _nCurrStep = 1;

// Rotation speed related... note the base speed is the amount in radians
// to update the rotation of the Z axis.  The speed multiplier is set by the
// user via a slider
const _dBaseRotationSpeed = 0.001;
var _nRotationSpeedMult = 3;

// The time step used by the Runge Kutta calculations
var _dTimeStep = 0.01;

//
// MakeGeomAxes: Make the three.js geometry for the axis lines
//
function MakeGeomAxes() {
  const grpAxes = new THREE.Group();

  const mat = new THREE.LineBasicMaterial({color : 0x000000});
  for (var i = 0; i < 3; i++) {
    var pnts = [];
    if (i == 0)
      pnts = [ new THREE.Vector3(-55, 0, 0), new THREE.Vector3(55, 0, 0) ];
    else if (i == 1)
      pnts = [ new THREE.Vector3(0, -55, 0), new THREE.Vector3(0, 55, 0) ];
    else if (i == 2)
      pnts = [ new THREE.Vector3(0, 0, -5), new THREE.Vector3(0, 0, 100) ];

    const geoLine = new THREE.BufferGeometry().setFromPoints(pnts);
    const axisLine = new THREE.Line(geoLine, mat);

    grpAxes.add(axisLine);
  }

  return grpAxes;
}

//
// MakeGeomCritPnts: make the three.js geometry for the critical points
//
function MakeGeomCritPnts() {
  ComputeCriticalPointPositions();

  const vertices = [];
  for (var i = 0; i < 9; i++)
    vertices.push(_CriticalPntPositions[Math.floor(i / 3)][i % 3]);

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position',
                        new THREE.Float32BufferAttribute(vertices, 3));

  const material =
      new THREE.PointsMaterial({color : _CriticalPntColour, size : 1});

  return new THREE.Points(geometry, material);
}

//
// MakeGeomSolCurve: make the three.js geometry for the solution curve.  Note
// that its
//                   contents will be updated during the animation.
//
function MakeGeomSolCurve() {
  var solutionCurves = [];

  for (var i = 0; i < _nMaxCurves; i++) {
    var positions = new Float32Array(3 * _nMaxPoints);

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setDrawRange(0, 0);

    const material = new THREE.LineBasicMaterial({color : _PntColours[i]});

    solutionCurves.push(new THREE.Line(geometry, material));
  }

  return solutionCurves;
}

//
// MakeGeomSolPnts: make the three.js geometry for the solution points.  The
// positions are
//                  updated during the simulation
//
function MakeGeomSolPnts() {
  var solutionPoints = [];

  for (var j = 0; j < _nMaxCurves; j++) {
    var vertices = [];
    for (var i = 0; i < 3; i++)
      vertices.push(_InitPosBase[i]);

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position',
                          new THREE.Float32BufferAttribute(vertices, 3));

    // Will be updated later
    const material =
        new THREE.PointsMaterial({color : _PntColours[j], size : 1});

    solutionPoints.push(new THREE.Points(geometry, material));
  }

  return solutionPoints;
}

//
// init: initialize all the 3D elements and have them ready for drawing... this
// includes
//       the scene, renderer, camera, and any lights.
//
function init() {
  ComputeInitialPoints();

  _3DScene = new THREE.Scene();

  // camera
  _3DCamera = new THREE.PerspectiveCamera(
      75, _CanvasWidth / _CanvasHeight, 0.1, 300);
  _3DCamera.position.set(_CamView[0], _CamView[1], _CamView[2]);

  // renderer
  _3DRenderer = new THREE.WebGLRenderer({antialias : true});
  _3DRenderer.setClearColor(_BackGroundColour);
  _3DRenderer.setPixelRatio(window.devicePixelRatio);
  _3DRenderer.setSize(_CanvasWidth, _CanvasHeight);

  // append the renderer to the html document
  document.getElementById('drawingArea').appendChild(_3DRenderer.domElement);

  // Make the geometry elements...

  // First, put all the geometry in a group so its easier to manipulate/rotate
  _geomCont = new THREE.Group();
  _3DScene.add(_geomCont);

  // add the axes...
  _geomAxes = MakeGeomAxes();
  _geomCont.add(_geomAxes);

  // add the solution curve...
  _geomSolCurves = MakeGeomSolCurve();
  for (var i = 0; i < _nMaxCurves; i++)
    _geomCont.add(_geomSolCurves[i]);

  // add the solution points...
  _geomSolPnts = MakeGeomSolPnts();
  for (var i = 0; i < _nMaxCurves; i++) {
    _geomCont.add(_geomSolPnts[i]);
  }
  UpdatePointVisibility();

  // and the critical points... (and hide them)
  _geomCritPnts = MakeGeomCritPnts();
  _geomCritPnts.visible = false;
  _geomCont.add(_geomCritPnts);

  //_geomInitPnt = MakeInitialPnts ();
  //_geomCont.add (_geomInitPnt);

  // add some lights...
  var light = new THREE.PointLight(0xffffff, 1, 500);
  light.position.set(10, 0, 25);
  _3DScene.add(light);

  // finally adjust the position and rotation of the geometry so its 'nice'
  _geomCont.rotation.set(-Math.PI / 12 * 5, 0, Math.PI / 6);
  _geomCont.position.set(_GeomPos[0], _GeomPos[1], _GeomPos[2]);

  // update the solution point visualization...
  for (var j = 0; j < _nNumInitPoints; j++) {
    positions = _geomSolPnts[j].geometry.attributes.position.array;
    positions[0] = _InitPos[j][0];
    positions[1] = _InitPos[j][1];
    positions[2] = _InitPos[j][2];
    _geomSolPnts[j].geometry.attributes.position.needsUpdate = true;
  }

  // reset various solution variable positions...
  ResetSolution();

  // Force redraw...
  render(true);
}

//
// updatePositions: update the solution curve with the current state of the
// calculations
//
function updatePositions() {
  for (var j = 0; j < _nMaxCurves; j++) {
    if (j < _nNumInitPoints) {
      // Update solution curve visualization...
      var positions = _geomSolCurves[j].geometry.attributes.position.array;
      for (var i = 0; i < _xValues[j].length; i++) {
        positions[3 * i] = _xValues[j][i];
        positions[3 * i + 1] = _yValues[j][i];
        positions[3 * i + 2] = _zValues[j][i];
      }
      _geomSolCurves[j].geometry.setDrawRange(0, _xValues[j].length);
      _geomSolCurves[j].geometry.attributes.position.needsUpdate = true;

      // Update solution point visualization...
      positions = _geomSolPnts[j].geometry.attributes.position.array;
      positions[0] = _dCurrX[j];
      positions[1] = _dCurrY[j];
      positions[2] = _dCurrZ[j];
      _geomSolPnts[j].geometry.attributes.position.needsUpdate = true;
    } else {
      _geomSolCurves[j].geometry.setDrawRange(0, 0);
      _geomSolCurves[j].geometry.attributes.position.needsUpdate = true;
    }
  }
}

let _cntPlot2d = 0;
function plot2d(force_update) {
  _cntPlot2d += 1;
  if (!force_update && _cntPlot2d % 2)
    return; // update 2d in lower frequence

  const idxs = [];
  for (let x = 0; x <= _xValues[0].length; x += 1) {
    idxs.push(x);
  }

  let plot_datas = [];
  for (var j = 0; j < _nMaxCurves; j++) {
    if (j < _nNumInitPoints) {
      plot_datas.push({
        x : idxs,
        y : _xValues[j],
        mode : "lines",
        name : "x_axis",
        xaxis : 'id',
        yaxis : 'y1'
      });
      plot_datas.push({
        x : idxs,
        y : _yValues[j],
        mode : "lines",
        name : "y_axis",
        xaxis : 'id',
        yaxis : 'y2'
      });
      plot_datas.push({
        x : idxs,
        y : _zValues[j],
        mode : "lines",
        name : "z_axis",
        xaxis : 'id',
        yaxis : 'y3'
      });
    }
  }

  Plotly.purge('myPlot');

  const layout = {
    title : "plot the axis values",
    yaxis1 : {domain : [ 0, 0.3 ], anchor : 'y'},
    yaxis2 : {domain : [ 0.35, 0.65 ], anchor : 'y'},
    yaxis3 : {domain : [ 0.7, 1.0 ], anchor : 'y'},
    margin : {l : 30, r : 30, b : 30, t : 30, pad : 4},
  };
  Plotly.newPlot("myPlot", plot_datas, layout);
}

//
// render: Force an update of the scene
//
function render(force_update = false) {
  _3DRenderer.render(_3DScene, _3DCamera);
  plot2d(force_update);
}

//
// animate: used to handle each update... basically, recompute the solution,
//          update the solution curve geometry, and adjust the viewpoint
//
function animate() {
  // From mozilla.org... the window.requestAnimationFrame() method tells the
  // browser that you wish to perform an animation and requests that the browser
  // calls a specified function to update an animation before the next repaint.
  // The method takes a callback as an argument to be invoked before the
  // repaint.
  _AnimFrameId = requestAnimationFrame(animate);

  // For each animation frame, compute the solution for the Lorenz equations
  // based on the computation rate... either do it once per frame, multiple
  // times per frame, or once per multiple frames.  Its purely a speed thing...
  if (_nComputeRate > 0) {
    for (var i = 0; i < _nComputeRate; i++)
      UpdateSolutionList();
  } else {
    if (_nCurrStep % (-1 * _nComputeRate) == 0) {
      UpdateSolutionList();
      _nCurrStep = 1;
    } else
      _nCurrStep++;
  }

  // update the geometry... that is copy the newly computed points to the
  // geometry of the solution curve
  updatePositions();

  // always keep the graph rotating...
  _geomCont.rotation.z += (_dBaseRotationSpeed * _nRotationSpeedMult);

  // force redraw...
  render();
}

//
// ResetSolution: Reset the solution... null out any previously saved values,
//                reset the initial position...
//
function ResetSolution() {
  // reset the starting position
  _dCurrX = [];
  _dCurrY = [];
  _dCurrZ = [];
  _xValues = [];
  _yValues = [];
  _zValues = [];

  for (var i = 0; i < _nNumInitPoints; i++) {
    _dCurrX.push(_InitPos[i][0]);
    _dCurrY.push(_InitPos[i][1]);
    _dCurrZ.push(_InitPos[i][2]);

    // Reset the curve
    _xValues.push([ _dCurrX[i] ]);
    _yValues.push([ _dCurrY[i] ]);
    _zValues.push([ _dCurrZ[i] ]);
  }
}

//
// ComputeCriticalPointPositions: recompute the critical point positions
//
function ComputeCriticalPointPositions(updateGeom = false) {
  // Note that (0, 0, 0) is always a fixed point so no need to recompute it

  // compute this once...
  var val = Math.sqrt(_dBeta * (_dRho[_nCurrRho] - 1));

  _CriticalPntPositions[1][0] = val;
  _CriticalPntPositions[1][1] = val;
  _CriticalPntPositions[1][2] = _dRho[_nCurrRho] - 1;

  _CriticalPntPositions[2][0] = -1 * val;
  _CriticalPntPositions[2][1] = -1 * val;
  _CriticalPntPositions[2][2] = _dRho[_nCurrRho] - 1;

  if (updateGeom) {
    var positions = _geomCritPnts.geometry.attributes.position.array;

    for (var i = 3; i < 9; i++)
      positions[i] = _CriticalPntPositions[Math.floor(i / 3)][i % 3];

    _geomCritPnts.material.size = (_MaxCritPntSize - _MinCritPntSize) /
                                      (_dRho[5] - _dRho[0]) *
                                      (_dRho[_nCurrRho] - _dRho[0]) +
                                  _MinCritPntSize;
    _geomCritPnts.geometry.attributes.position.needsUpdate = true;
  }
}

//
// ComputeInitialPoints... Modify the initial positions for the starting points
//
function ComputeInitialPoints() {
  _InitPos = [];

  for (var i = 0; i < _nNumInitPoints; i++) {
    var offset = i * _dInitPntDelta;
    if (_InitPntGeom == _PointGeometry_XAxis)
      _InitPos.push(
          [ _InitPosBase[0] + offset, _InitPosBase[1], _InitPosBase[2] ]);
    else if (_InitPntGeom == _PointGeometry_YAxis)
      _InitPos.push(
          [ _InitPosBase[0], _InitPosBase[1] + offset, _InitPosBase[2] ]);
    else if (_InitPntGeom == _PointGeometry_ZAxis)
      _InitPos.push(
          [ _InitPosBase[0], _InitPosBase[1], _InitPosBase[2] + offset ]);
  }
}

//
// UpdateColours... update the colours of the solution line and point
// visualization
//
function UpdateColours() {
  for (var i = 0; i < _nNumInitPoints; i++) {
    _geomSolPnts[i].material.color = new THREE.Color(_PntColours[i]);
    _geomSolCurves[i].material.color = new THREE.Color(_PntColours[i]);
  }
}

//
// UpdatePointVisibility... toggle solution point visibility
//
function UpdatePointVisibility() {
  for (var i = 0; i < _nMaxCurves; i++) {
    if (i < _nNumInitPoints)
      _geomSolPnts[i].visible = true;
    else
      _geomSolPnts[i].visible = false;
  }
}
