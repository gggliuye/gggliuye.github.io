---
layout: page_tree_math
title: Snapdragon Neural Processing Engine SDK
---


## Set up SNPE

1. create a python 3.6 environment, since snpe require py36.
```
conda create -n py36 python=3.6.3 anaconda
```

2. Download libs from [Tools & Resources Archive](https://developer.qualcomm.com/software/qualcomm-neural-processing-sdk/tools-archive) and prepare environment following [instruction](https://developer.qualcomm.com/sites/default/files/docs/snpe/setup.html).
```
unzip -X snpe-X.Y.Z.zip
source snpe-X.Y.Z/bin/dependencies.sh
source snpe-X.Y.Z/bin/check_python_depends.sh
```

3. set up android and python paths.
```
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/home/yeliu/anaconda3/envs/py36/lib
export ANDROID_NDK_ROOT=/opt/android-sdk/ndk
SNPE_PATH=/home/yeliu/Downloads/dep/snpe-2.10.0.4541
source ${SNPE_PATH}/bin/envsetup.sh -p /home/yeliu/anaconda3/envs/py36/lib/python3.6/site-packages/torch
```

## PyTorch to SNPE

1. [convert model](https://developer.qualcomm.com/sites/default/files/docs/snpe/model_conv_pytorch.html) from torchscript to dlc (convert non-quantized models into a non-quantized DLC file).
```
conda activate py36
snpe-pytorch-to-dlc --input_network models/yolo/yolov8s.torchscript \
                    --input_dim input "1,3,640,640" \
                    --output_path models/yolo/yolov8s.dlc
snpe-pytorch-to-dlc --input_network models/yolo/yolov8n.torchscript \
                    --input_dim input "1,3,640,640" \
                    --output_path models/yolo/yolov8n.dlc
```

2. [quantize the model](https://developer.qualcomm.com/sites/default/files/docs/snpe/model_conversion.html). quantize the model to one of supported fixed point formats (to Tensorflow-style 8-bit fixed point format).
```
snpe-dlc-quantize --input_dlc models/yolo/yolov8n.dlc --input_list data/image_file_list.txt \
                  --output_dlc models/yolo/yolov8n_quantized.dlc \
                  --axis_quant --use_enhanced_quantizer
```
* [Quantized vs Non-Quantized Models](https://developer.qualcomm.com/sites/default/files/docs/snpe/quantized_models.html).
* input data are created by python `np.tofile()`, and should had followed exactly the same preprocessing steps.
* more can do : model offline graph cache preparation using [snpe-dlc-graph-prepare](https://developer.qualcomm.com/sites/default/files/docs/snpe/offline_graph_caching.html).

## Example and ONNX

[here for an example](https://github.com/yeliu-deepmirror/ace/blob/master/artifacts/development/yolo_snpe.ipynb) converting [yolov8](https://github.com/ultralytics/ultralytics) to SNPE. with four steps : **Pytorch -> ONNX -> SNPE -> Quantize**.
* With converting an unsupported module (Silu to fcn of sigmoid)., check [supported layers](https://developer.qualcomm.com/sites/default/files/docs/snpe/network_layers.html).
* <u>Regarding the ONNX conversion and implementation, SNPE will process with NHWC but Pytorch was trained under NCHW. So we better transform the model to ONNX (which will be in NHWC) then use snpe-onnx-to-dlc.</u> ([snpe forum](https://developer.qualcomm.com/forum/qdn-forums/software/qualcomm-neural-processing-sdk/69045))
  * this will make the yolo example faster.
