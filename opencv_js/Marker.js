// tutorial from https://docs.opencv.org/4.5.0/d5/d10/tutorial_js_root.html
function CalculatePatchParam(image_ori_data, cols, topleft, radius){
  let length = 2*radius+1;
  let patchsurface = length*length;
  let sum = 0;
  let sqsum = 0;

  let pixel_p = 0;
  //let image_ori_data = image_ori.data;

  for(let i = 0 ; i < length; i++){ // row
    let tmp_p = (topleft.y + i) * cols;
    for(let j = 0; j < length; j++){ // col
      pixel_p = image_ori_data[tmp_p + topleft.x + j];

      sum = sum + pixel_p;
      sqsum = sqsum + pixel_p * pixel_p;
    }
  }

  let patchmean = sum/patchsurface;
  let patch_tmp = (sqsum - patchsurface*patchmean*patchmean)
  return [patchmean, patch_tmp]
}


class Marker{
  constructor(){
    this.marker_width = 200;
  }

  LoadMarker(marker_image){
    this.marker = new cv.Mat();
    marker_image.copyTo(this.marker);
    cv.cvtColor(this.marker, this.marker, cv.COLOR_RGBA2GRAY, 0);
    // resize image to smaller one
    let resize = new cv.Size(this.marker_width, this.marker.rows*this.marker_width/this.marker.cols);
    cv.resize(this.marker, this.marker, resize, 0, 0, cv.INTER_AREA);

    this.cols = this.marker.cols;
    this.rows = this.marker.rows;

    // detect good features for latter match
    let [maxCorners, qualityLevel, minDistance] = [200, 0.1, 10];
    let none = new cv.Mat();
    this.featurePts = new cv.Mat();
    cv.goodFeaturesToTrack(this.marker, this.featurePts, maxCorners, qualityLevel, minDistance, none);
    none.delete();
    console.log("[MARKER] maker image loaded");
  }

  GetMarkerShow(){
    let img_show = new cv.Mat();
    cv.cvtColor(this.marker, img_show, cv.COLOR_GRAY2RGB, 0);
    let color = new cv.Scalar(255,0,0);
    for(let i = 0; i < this.featurePts.rows; i++){
      let pt = new cv.Point(this.featurePts.data32F[i*2], this.featurePts.data32F[i*2+1])
      cv.circle(img_show, pt, 5, color, -1);
    }
    let font = cv.FONT_HERSHEY_SIMPLEX;
    cv.putText(img_show, '#Pts:'+this.featurePts.rows,  new cv.Point(5, 25), font, 1, new cv.Scalar(0, 255, 255,255), 2, cv.LINE_4);
    return img_show;
  }

  CalculatePatchNCC(image_ori_data, cols, topleft, marker_pt, radius, patchmean, patch_tmp){
    // patch_tmp = (patchsqsum - patchsurface*patchmean*patchmean)

    // image_patch is a square, with size must be an odd number
    // and size = 2 * radius + 1
    //let pixel = src.ucharPtr(row, col);
    //let pixel = src.ucharAt(row, col * src.channels())

    // test the element access
    //var data = image_ori_data; // 8UC1
    //let col = 80; let row = 20;
    //let t = row*this.marker.cols + col;
    //console.log(data[t]+" "+image_patch.ucharAt(row, col));
    //console.log(image_patch);

    let length = 2*radius+1;
    //console.log(length+" "+image_patch.cols+" "+image_patch.rows+" "+image_patch.channels());
    let patchsurface = length*length;
    let sum = 0;
    let sqsum = 0;
    let crosssum = 0;

    let [tl_row, tl_col] = [marker_pt.y-radius,marker_pt.x-radius];
    let [pixel_p, pixel_m] = [0,0];
    // tl : top left

    //let image_patch_data = image_patch.data;
    let marker_data = this.marker.data;

    for(let i = 0 ; i < length; i++){ // row
      let tmp_m = (tl_row + i) * this.cols;
      let tmp_p = (topleft.y + i) * cols;
      for(let j = 0; j < length; j++){ // col
        pixel_p = image_ori_data[tmp_p + topleft.x + j];
        pixel_m = marker_data[tmp_m + tl_col + j];
        //console.log(image_patch_data[tmp_p + j]+" "+pixel_p);
        //console.log(marker_data[tmp_m + tl_col + j]+" "+pixel_m);

        sum = sum + pixel_m;
        sqsum = sqsum + pixel_m * pixel_m;
        crosssum = crosssum + pixel_m * pixel_p;
      }
    }

    let mean = sum / patchsurface;
    let a = crosssum - sum * patchmean;
    let b = patch_tmp*(sqsum-patchsurface*mean*mean);
    return a / Math.sqrt(b);
  }


}
