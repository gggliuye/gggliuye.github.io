//
// LorenzEquations_UI.js...
// mainly contains the user interface related functions...
//

//
// OnStartBtnClickCB: callback to handle start button click
//
function OnStartBtnClickCB() {
  if (_IsPlaying == _PlayMode_STOPPED) {
    _IsPlaying = _PlayMode_PLAYING;
    document.getElementById('startBtn').innerText = 'Pause';
    document.getElementById('startBtn').style.color = '#fff';
    document.getElementById('startBtn').style.backgroundColor =
        '#992600'; //'#cc3300';
    DisableUI(true);
    animate();
  } else if (_IsPlaying == _PlayMode_PLAYING) {
    _IsPlaying = _PlayMode_STOPPED;
    document.getElementById('startBtn').innerText = 'Play';
    document.getElementById('startBtn').style.color = '#fff';
    document.getElementById('startBtn').style.backgroundColor =
        '#006622'; //'#009933';
    DisableUI(false);
    cancelAnimationFrame(_AnimFrameId);
  }
}

//
// OnStartBtnEnterCB: callback to handle start button mouse enter event
//
function OnStartBtnEnterCB() {
  if (_IsPlaying == _PlayMode_STOPPED)
    document.getElementById('startBtn').style.backgroundColor = '#006622';
  else if (_IsPlaying == _PlayMode_PLAYING)
    document.getElementById('startBtn').style.backgroundColor = '#992600';
}

//
// OnStartBtnLeaveCB: callback to handle start button mouse leave event
//
function OnStartBtnLeaveCB() {
  if (_IsPlaying == _PlayMode_STOPPED)
    document.getElementById('startBtn').style.backgroundColor = '#009933';
  else if (_IsPlaying == _PlayMode_PLAYING)
    document.getElementById('startBtn').style.backgroundColor = '#cc3300';
}

//
// OnResetBtnClickCB: callback to handle reset button mouse click event
//
function OnResetBtnClickCB() {
  if (_IsPlaying == _PlayMode_STOPPED) {
    // Reset UI and variables...
    _InitPntGeom = _Default_PntGeometry;
    document.getElementById('pntGeomList').value = _InitPntGeom;

    _nNumInitPoints = _Default_NumPoints;
    document.getElementById('numPntList').value = _nNumInitPoints;

    _dInitPntDelta = _Default_PntSpacing;
    document.getElementById('pntSpacingOutput').value = _dInitPntDelta;
    document.getElementById('pntSpacingSlider').value = _dInitPntDelta;

    _InitPosBase = [ _Default_XInitPos, _Default_YInitPos, _Default_ZInitPos ];
    document.getElementById('initPosOutput').value =
        '(' + _Default_XInitPos.toFixed(1) + ', ' +
        _Default_YInitPos.toFixed(1) + ', ' + _Default_ZInitPos.toFixed(1) +
        ')';
    document.getElementById('xInitPosSlider').value = _Default_XInitPos;
    document.getElementById('yInitPosSlider').value = _Default_YInitPos;
    document.getElementById('zInitPosSlider').value = _Default_ZInitPos;

    // Update the everything else...
    UpdatePointVisibility();
    ComputeInitialPoints();
    ResetSolution();
    updatePositions();

    render();
  }
}

//
// OnResetBtnEnterCB: callback to handle reset button mouse enter event
//
function OnResetBtnEnterCB() {
  if (_IsPlaying == _PlayMode_STOPPED)
    document.getElementById('resetBtn').style.backgroundColor = '#0059b3';
}

//
// OnResetBtnLeaveCB: callback to handle reset button mouse leave event
//
function OnResetBtnLeaveCB() {
  if (_IsPlaying == _PlayMode_STOPPED)
    document.getElementById('resetBtn').style.backgroundColor = '#0080ff';
}

//
// OnInitPosSliderCB
//
function OnInitPosSliderCB() {
  var xPos = +document.getElementById('xInitPosSlider').value;
  var yPos = +document.getElementById('yInitPosSlider').value;
  var zPos = +document.getElementById('zInitPosSlider').value;

  _InitPosBase = [ xPos, yPos, zPos ];
  ComputeInitialPoints();
  ResetSolution();
  updatePositions();

  // display value in window
  document.getElementById('initPosOutput').value = '(' + xPos.toFixed(1) + ',' +
                                                   yPos.toFixed(1) + ',' +
                                                   zPos.toFixed(1) + ')';

  render();
}

//
// OnPntSpacingSliderCB...
//
function OnPntSpacingSliderCB() {
  _dInitPntDelta = +document.getElementById('pntSpacingSlider').value;
  document.getElementById('pntSpacingOutput').value = _dInitPntDelta;

  ComputeInitialPoints();
  ResetSolution();
  updatePositions();

  render();
}

//
//
//
function OnNumPntListCB() {
  _nNumInitPoints = +document.getElementById('numPntList').value;
  UpdatePointVisibility();

  ComputeInitialPoints();
  ResetSolution();
  updatePositions();

  render();
}

//
//
//
function OnPntGeomListCB() {
  _InitPntGeom = +document.getElementById('pntGeomList').value;

  ComputeInitialPoints();
  ResetSolution();
  updatePositions();

  render();
}

//
// OnShowCriticalPntsChkBoxCB: used to hide/show the critical points
//
function OnShowCriticalPntsChkBoxCB() {
  _geomCritPnts.visible =
      document.getElementById('showCriticalPntsChkBox').checked;

  render();
}

//
// OnCurveLengthListCB: callback to handle the curve length pulldown
//
function OnCurveLengthListCB() {
  _nMaxCurveLength = document.getElementById('curveLengthList').value;

  // uncomment for debugging
  // console.log (_nMaxCurveLength);
}

//
// OnCompRateListCB: callback to handle the computation rate pulldown
//
function OnCompRateListCB() {
  _nComputeRate = +document.getElementById('compRateList').value;
}

//
// OnRotSpeedSliderCB: callback to handle the rotation speed slider
//
function OnRotSpeedSliderCB() {
  var value = +document.getElementById('rotSpeedSlider').value;
  document.getElementById('rotSpeedOutput').value = value;

  _nRotationSpeedMult = value;
}

//
// DisableUI: toggle various UI elements.  Note when playing, the different
// initial
//            point UI elements are disabled so that the values can not be
//            changed since they can alter the simulation and confuse the user
//
function DisableUI(iState) {
  if (iState == false)
    document.getElementById('resetBtn').style.backgroundColor = '#0080ff';
  else
    document.getElementById('resetBtn').style.backgroundColor = '#bfbfbf';

  document.getElementById('pntGeomList').disabled = iState;
  document.getElementById('numPntList').disabled = iState;
  document.getElementById('pntSpacingSlider').disabled = iState;
  document.getElementById('xInitPosSlider').disabled = iState;
  document.getElementById('yInitPosSlider').disabled = iState;
  document.getElementById('zInitPosSlider').disabled = iState;
}
