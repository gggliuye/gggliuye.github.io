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


function ApplyPerspectiveTrans(M_data, x, y){
  let x_t = M_data[0]*x + M_data[1]*y + M_data[2];
  let y_t = M_data[3]*x + M_data[4]*y + M_data[5];
  // t should normally be just one
  let t = M_data[6]*x + M_data[7]*y + M_data[8];
  x_t = parseInt(x_t / t);
  y_t = parseInt(y_t / t);
  return [x_t, y_t];
}

function ApplyPerspectiveTransPt(M_data, pt){
  let x_t = M_data[0]*pt.x + M_data[1]*pt.y + M_data[2];
  let y_t = M_data[3]*pt.x + M_data[4]*pt.y + M_data[5];
  // t should normally be just one
  let t = M_data[6]*pt.x + M_data[7]*pt.y + M_data[8];
  x_t = (x_t / t);
  y_t = (y_t / t);
  return new cv.Point(x_t, y_t);
}

function CalculatePerspective(matched_marker, matched_image){
  if(matched_marker.length < 4){
    let M = cv.matFromArray(3, 3, cv.CV_64FC1, [1, 0, 0, 0, 1, 0, 0, 0 ,1]);
    return M;
  }

  // using javascript linear algebra : https://www.robinwieruch.de/linear-algebra-matrix-javascript
  // solve this least square problem (without the consideration of outliers)

  // matrix : [ c00, c01, c02]
  //          [ c10, c11, c12]
  //          [   0,   0,   1]

  let n = matched_marker.length;
  let A = math.ones(n, 3);
  let b_u = math.zeros(n, 1);
  let b_v = math.zeros(n, 1);
  for(let i = 0; i < n ; i ++){
    A.set([i, 0], matched_marker[i].x);
    A.set([i, 1], matched_marker[i].y);
    b_u.set([i,0], matched_image[i].x);
    b_v.set([i,0], matched_image[i].y);
  }
  //console.log(A);
  let A_T = math.transpose(A);
  let Atb_u = math.multiply(A_T, b_u);
  let Atb_v = math.multiply(A_T, b_v);
  let AtA_inv = math.inv(math.multiply(A_T, A));
  //console.log(AtA_inv);
  let C_0 = math.multiply(AtA_inv, Atb_u);
  let C_1 = math.multiply(AtA_inv, Atb_v);
  //console.log(C_0, C_1);
  let M = cv.matFromArray(3, 3, cv.CV_64FC1, [C_0.get([0,0]), C_0.get([1,0]), C_0.get([2,0]), C_1.get([0,0]), C_1.get([1,0]), C_1.get([2,0]), 0, 0 ,1]);
  //console.log(C_0, C_1, M);
  return M;
}

function CalculateHomography(matched_marker, matched_image){
  if(matched_marker.length < 4){
    let M = cv.matFromArray(3, 3, cv.CV_64FC1, [1, 0, 0, 0, 1, 0, 0, 0 ,1]);
    return M;
  }

  // TODO
}


class Marker{
  constructor(){
    this.InitMatchParameters();
    //TestPrespectiveCalculate();
  }
  GetSize(){
    return [this.marker_width, this.marker_height];
  }
  GetCenter(){
    return this.center;
  }

  LoadMarker(marker_image){
    this.marker = new cv.Mat();
    marker_image.copyTo(this.marker);
    cv.cvtColor(this.marker, this.marker, cv.COLOR_RGBA2GRAY, 0);
    // resize image to smaller one
    this.marker_height = parseInt(this.marker.rows*this.marker_width/this.marker.cols);
    let resize = new cv.Size(this.marker_width, this.marker_height);
    cv.resize(this.marker, this.marker, resize, 0, 0, cv.INTER_AREA);

    this.cols = this.marker.cols;
    this.rows = this.marker.rows;
    this.center = new cv.Point(parseInt(this.marker_width/2), parseInt(this.marker_height/2));
    this.marker_data = this.marker.data;


    // set the rectangle
    this.corners = []
    this.corners.push(new cv.Point(0,0));
    this.corners.push(new cv.Point(this.cols,0));
    this.corners.push(new cv.Point(0,this.rows));
    this.corners.push(new cv.Point(this.cols,this.rows));
    this.edges = [[0,1], [1,3], [3,2], [2,0]];

    // detect good features for latter match
    let [maxCorners, qualityLevel, minDistance] = [100, 0.1, 10];
    let none = new cv.Mat();
    this.featurePts = new cv.Mat();
    cv.goodFeaturesToTrack(this.marker, this.featurePts, maxCorners, qualityLevel, minDistance, none);
    this.nPts = this.featurePts.rows;
    //this.Feature_data = featurePts.data32F;
    none.delete(); //featurePts.delete();
    console.log("[MARKER] maker image loaded");
  }

  DrawRectangle(img, M_data){
    let color = new cv.Scalar(0,255,0,255);
    let new_corners = [];
    for(let i = 0; i < this.corners.length; i++){
      let new_pt = ApplyPerspectiveTransPt(M_data, this.corners[i])
      new_corners.push(new_pt);
      cv.circle(img, new_pt, 4, color, -1);
    }

    for(let i = 0; i < this.edges.length; i++){
      cv.line(img, new_corners[this.edges[i][0]], new_corners[this.edges[i][1]], color, 2);
    }
  }

  GetMarkerShow(){
    let Feature_data = this.featurePts.data32F;
    let img_show = new cv.Mat();
    cv.cvtColor(this.marker, img_show, cv.COLOR_GRAY2RGB, 0);
    let color = new cv.Scalar(255,0,0);
    for(let i = 0; i < this.nPts; i++){
      let pt = new cv.Point(Feature_data[i*2], Feature_data[i*2+1])
      cv.circle(img_show, pt, 4, color, -1);
    }
    let font = cv.FONT_HERSHEY_SIMPLEX;
    cv.putText(img_show, '#Pts:'+this.nPts,  new cv.Point(5, 25), font, 1, new cv.Scalar(0, 0, 255,255), 2, cv.LINE_4);
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
    //let marker_data = this.marker.data;

    for(let i = 0 ; i < length; i++){ // row
      let tmp_m = (tl_row + i) * this.cols;
      let tmp_p = (topleft.y + i) * cols;
      for(let j = 0; j < length; j++){ // col
        pixel_p = image_ori_data[tmp_p + topleft.x + j];
        pixel_m = this.marker_data[tmp_m + tl_col + j];
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

  InitMatchParameters(){
    this.marker_width = 180;
    this.marker_height = -1;
    this.neighbor_radius = 3;
    this.patch_radius = 5;
    this.ncc_threshold = 0.7;

    this.img_cols = 320;
    this.img_rows = 240;

    let t_size = this.neighbor_radius + this.patch_radius;
    this.bolder_check = [t_size, this.img_cols-t_size-1, t_size, this.img_rows-t_size-1];
  }

  InRange(x, y){
    if(x > this.img_cols || y > this.img_rows || x < 0 || y < 0){
      return false;
    }
    return true;
  }

  // simplified verison, to check only once, but with higher boder
  // to faster ensure all points will within the range of the image
  InRangeBorder(x, y){
    if(x > this.bolder_check[1] || y > this.bolder_check[3] || x < this.bolder_check[0] || y < this.bolder_check[2]){
      return false;
    }
    return true;
  }

  // we will warp transformation matrix (from marker to image)
  FindMarker(gray, init_M_im){
    // warp the marker image
    let dsize = new cv.Size(gray.cols, gray.rows);
    let dst = new cv.Mat();
    cv.warpPerspective(this.marker, dst, init_M_im, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    this.marker_data = dst.data;
    this.cols = gray.cols;


    let image_ori_data = gray.data;
    let Feature_data = this.featurePts.data32F;
    // loop for all marker points
    // project marker point to src image using M.
    // find a better corresponding point using NCC scores.
    let M_data = init_M_im.data64F;
    //console.log(M_data);
    let matched_marker = [];
    let matched_image = [];
    let count = 0;
    for(let i = 0; i < this.nPts; i++){
      //map the marker point to image plane, to get an initial guess of match point
      let pt = new cv.Point(Feature_data[i*2], Feature_data[i*2+1]);
      let [x_t, y_t] = ApplyPerspectiveTrans(M_data, pt.x, pt.y);
      let pt_trans = new cv.Point(x_t, y_t);
      //console.log(pt.x, pt.y, x_t, y_t);
      if(!this.InRangeBorder(x_t, y_t)){
        continue;
      }

      let best_pt = new cv.Point(0,0);
      let best_score = -1;
      for(let dx = -this.neighbor_radius; dx <= this.neighbor_radius; dx++){
        for(let dy = -this.neighbor_radius; dy <= this.neighbor_radius; dy++){
          //search the neighborhood to find the best match
          let topleft = new cv.Point(x_t+dx-this.patch_radius, y_t+dy-this.patch_radius);
          let [patchmean, patch_tmp] = CalculatePatchParam(image_ori_data, gray.cols, topleft, this.patch_radius);
          let score = this.CalculatePatchNCC(image_ori_data, gray.cols, topleft, pt_trans, this.patch_radius, patchmean, patch_tmp);
          if(score > best_score){
            best_score = score;
            best_pt = new cv.Point(x_t+dx, y_t+dy);
          }
        }
      }
      //console.log(best_score, this.ncc_threshold);

      if(best_score > this.ncc_threshold){
        count = count + 1;
        matched_marker.push(pt);
        matched_image.push(best_pt);
      }
    }
    //console.log(M_data, count);
    let M_esti = CalculatePerspective(matched_marker, matched_image);
    return [matched_marker.length, M_esti, matched_marker, matched_image];
  }

}
