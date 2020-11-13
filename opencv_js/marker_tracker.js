class MarkerTracker{
  constructor(){
    this.pMarker = new Marker();
    this.marker_set = false;
  }

  LoadMarker(marker_image){
    this.pMarker.LoadMarker(marker_image);
    this.marker_set = true;
  }

  GetMarkerShow(){
    return this.pMarker.GetMarkerShow();
  }

  ProcessImage(src){
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
