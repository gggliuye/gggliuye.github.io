function TestPrespectiveCalculate(){
  let [x, y, w, h] = [0,10,300,400];
  let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, w, 0, 0, h, w, h]);
  let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [x, y, x+w, y, x, y+h, x+w, y+h]);
  let M = cv.getPerspectiveTransform(srcTri, dstTri); // Float64Array (3*3)
  console.log(M);
  let matched_marker = [];
  let matched_image = [];
  matched_marker.push(new cv.Point(0,0));
  matched_marker.push(new cv.Point(w,0));
  matched_marker.push(new cv.Point(0,h));
  matched_marker.push(new cv.Point(w,h));

  matched_image.push(new cv.Point(x,y));
  matched_image.push(new cv.Point(x+w,y));
  matched_image.push(new cv.Point(x,y+h));
  matched_image.push(new cv.Point(x+w,y+h));
  let K = CalculatePerspective(matched_marker, matched_image);
  console.log(K);
}

function TestAffineTransform(src){
  let dsize = new cv.Size(src.cols, src.rows);
  // (data32F[0], data32F[1]) is the first point
  // (data32F[2], data32F[3]) is the sescond point
  // (data32F[4], data32F[5]) is the third point
  // (data32F[6], data32F[7]) is the fourth point
  let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, 200, 0, 0, 200, 200, 200]);
  let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, src.cols, 0, 0, src.rows, src.cols, src.rows]);
  let M = cv.getPerspectiveTransform(srcTri, dstTri); // Float64Array (3*3)
  //console.log(M.data64F[0]+" "+M.data64F[4]+" "+M.data64F[8]);
  // You can try more different parameters
  //let dst = new cv.Mat();
  cv.warpPerspective(src, src, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
}
class MarkerTracker{
  constructor(){
    this.pMarker = new Marker();
    this.marker_set = false;
    this.has_guess = false;
  }

  LoadMarker(marker_image){
    this.pMarker.LoadMarker(marker_image);
    this.marker_set = true;
  }

  GetMarkerShow(){
    return this.pMarker.GetMarkerShow();
  }

  SetLastFrameData(gray, matched_marker, points){
    this.prev_gray = new cv.Mat();
    gray.copyTo(this.prev_gray);
    this.prev_pts = new cv.Mat(points.length, 1, cv.CV_32FC2);
    for (let i = 0; i < points.length; i++) {
      this.prev_pts.data32F[i*2] = points[i].x;
      this.prev_pts.data32F[i*2+1] = points[i].y;
    }
    this.prev_markers = matched_marker;

    this.flow_winSize = new cv.Size(5, 5);
    this.flow_maxLevel = 2;
    this.flow_criteria = new cv.TermCriteria(cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 10, 0.03);
  }

  EstimatePrespectiveWithOpticalFlow(gray){
    let curr_pts = new cv.Mat();
    let status = new cv.Mat();
    let err = new cv.Mat();

    // optical flow parameters
    cv.calcOpticalFlowPyrLK(this.prev_gray, gray, this.prev_pts, curr_pts, status, err,
      this.flow_winSize, this.flow_maxLevel, this.flow_criteria);

    // select good points and make mask
    let curr_image_pts = [];
    let curr_marker_pts = [];
    let currTrackedPts_data = curr_pts.data32F;
    for (let i = 0; i < status.rows; i++) {
      if (status.data[i] === 1) {
        let pt = new cv.Point(currTrackedPts_data[i*2], currTrackedPts_data[i*2+1]);
        curr_image_pts.push(pt);
        curr_marker_pts.push(this.prev_markers[i]);
      }
    }

    status.delete(); err.delete(); curr_pts.delete();
    
    if(curr_marker_pts.length > 4){
      return CalculatePerspective(curr_marker_pts, curr_image_pts);
    }
    return this.M_guess;
  }

  ProcessImage(src){
    if(!this.marker_set){
      return
    }

    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    let [w,h] = this.pMarker.GetSize();
    let [x,y] = [(320-w)/2, (240-h)/2];

    let init_M_im = -1;
    if(this.has_guess){
      //init_M_im = this.M_guess;
      init_M_im = this.EstimatePrespectiveWithOpticalFlow(gray);
      //console.log(this.M_guess.data64F, init_M_im.data64F);
    } else {
      let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, w, 0, 0, h, w, h]);
      let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [x, y, x+w, y, x, y+h, x+w, y+h]);
      init_M_im = cv.getPerspectiveTransform(srcTri, dstTri); // Float64Array (3*3)
    }
    //console.log(init_M_im.data64F);
    let [nMatch, M_esti, matched_marker, matched_image] = this.pMarker.FindMarker(gray, init_M_im);
    if(nMatch > 10){
      //console.log(M_esti.data64F, init_M_im.data64F);
      let M_esti_data = M_esti.data64F;
      this.pMarker.DrawRectangle(src, M_esti_data);
      this.SetLastFrameData(gray, matched_marker, matched_image);

      this.M_guess = M_esti;
      this.has_guess = true;

      let color = new cv.Scalar(0,255,255,255);
      for(let i = 0; i < matched_image.length; i++){
        cv.circle(src, matched_image[i], 4, color, -1);
      }

    } else {
      this.has_guess = false;

      // draw a rectangle for the initial square
      let p1 = new cv.Point(x, y);
      let p2 = new cv.Point(x+w, y+h);
      let color = new cv.Scalar(255,255,255,255);
      cv.rectangle(src, p1, p2, color, 2, 8, 0);
    }

    let font = cv.FONT_HERSHEY_SIMPLEX;
    cv.putText(src, '#matches:'+nMatch,  new cv.Point(10, 40), font, 0.5, new cv.Scalar(0, 255, 255,255), 1, cv.LINE_4);
    gray.delete();
  }

  ProcessImageMatchCenterSquare(src){
    if(!this.marker_set){
      return
    }

    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    let [w,h] = this.pMarker.GetSize();
    let radius = parseInt((Math.min(w,h)-1)/2);
    let size = Math.min(w,h);

    let [x,y] = [(320-size)/2, (240-size)/2];
    // test the NCC score of the center of the input image and the marker
    //let roiRect = new cv.Rect(x,y,w,h);
    //let roi_gray = new cv.Mat();
    //roi_gray = gray.roi(roiRect);
    // the step of the roi is the same as the original image, which is a bug.
    //roi_gray.step = [w, 1];

    let image_ori_data = gray.data;
    let topleft = new cv.Point(x, y);
    let [patchmean, patch_tmp] = CalculatePatchParam(image_ori_data, gray.cols, topleft, radius);

    let marker_pt = this.pMarker.GetCenter();
    let score = this.pMarker.CalculatePatchNCC(image_ori_data, gray.cols, topleft, marker_pt, radius, patchmean, patch_tmp);

    // draw a rectangle for the initial square
    let font = cv.FONT_HERSHEY_SIMPLEX;
    cv.putText(src, 'score:'+score,  new cv.Point(10, 40), font, 0.5, new cv.Scalar(0, 255, 255,255), 1, cv.LINE_4);
    let p1 = new cv.Point(x, y);
    let p2 = new cv.Point(x+size, y+size);
    let color = new cv.Scalar(255,255,255,255);
    cv.rectangle(src, p1, p2, color, 2, 8, 0);

    //console.log(roi_gray.step+" "+gray.step);
    if(score > 0.2){
      cv.putText(src, 'Found',  new cv.Point(75, src.rows/2-20), font, 2, new cv.Scalar(255, 0, 0,255), 5, cv.LINE_4);
    }

    gray.delete();
    //roi_gray.delete();
  }


}
