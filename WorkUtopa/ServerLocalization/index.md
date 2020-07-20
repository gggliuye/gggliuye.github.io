# Localization Tests

## Example test

./example database_path sparse_map_path voc_indices_path
test_images_path focus_length width height

* winter map (~ 1500 images)

./example /home/viki/UTOPA/Server_Localization/Maps/winter_update/database.db /home/viki/UTOPA/Server_Localization/Maps/winter_update/sparse/ /home/viki/UTOPA/Server_Localization/Maps/winter_update/VocIndex.bin /home/viki/UTOPA/Server_Localization/Maps/Test_images_p20pro/ 2814 3648 2736

## Make indices test

./make_index database_path sparse_map_path voc_indices_path vocab_path

* winter map

./make_index /home/viki/UTOPA/Server_Localization/Maps/winter_update/database.db /home/viki/UTOPA/Server_Localization/Maps/winter_update/sparse/ /home/viki/UTOPA/Server_Localization/Maps/winter_update/VocIndex.bin /home/viki/UTOPA/Server_Localization/vocabs/vocab_tree_flickr100K_words32K.bin


## Time analysis (before update) -- 2020/04

1. SIFT feature extraction about 0.03 second.
2. SIFT feature match test : CPU takes about 10 seconds, GPU takes about 0.002-0.005 second.
3. QueryAndFindWordIds, which is the Voc Tree match time.
* Winter map (~ 1500 images) Voc Tree match time :
   1 find word ids time : 0.223392
   2 inverted index query time : 2.9389
   3 sort scores time : 0.000421505
* Spring map (~ 200 images) Voc Tree match time :
   1 find word ids time : 0.225403
   2 inverted index query time : 0.62357
   3 sort scores time : 5.9781e-05

* Voc tree match is not designed for our objective (use some rough pose estimation to accelerate the process of image match).
* We could build a KNN tree (based on real distance) for neighbour search.


## Java Plugin test

./test_plugin /home/viki/UTOPA/Server_Localization/Maps/winter_update/database.db /home/viki/UTOPA/Server_Localization/Maps/winter_update/sparse/ /home/viki/UTOPA/Server_Localization/Maps/winter_update/VocIndex.bin /home/viki/UTOPA/Server_Localization/Maps/success_images.txt /home/viki/UTOPA/Server_Localization/Maps/runtime_result_voc.txt 2814

## 2020/06/16

### Tested in real scene

* The accuracy is relatively high, for most of the cases. While, for the part of the scene with some small structured buildings, the mesh didn't match well. 
* The success rate is extremely low. which is the major part of later work. (To find out the reason, and optimize the condition)

## 2020/06/17

* For this scene, we have more than 2000 image frames in the database. However, the images are mostly the same, From logical thought, we should not us a large vocabulary tree for it. So I will test the image localization success rate for both cases.

### Test VocIndex_32K

* Slow (1~2s)
* ==> Success rate 0.100000 [ 13 / 130 ]

### Test VocIndex_256K

* match speed about two times faster (~ 0.7s)
* ==> Success rate 0.161538 [ 21 / 130 ]

### Test VocIndex_1M

* Faster (~ 0.5s)
* ==> Success rate 0.123077 [ 16 / 130 ]

# Map Building Tests

## Remark

* The work space should be empty, as I will remove all the files in it. I hope this will not delete some files important.
* all the images in one folder must be taken by the same type of device. (and image folder name should be longer than 4 char)

## Parameters note

* float feature_parallax_threshold : The minimal parallax between two extracted frames. 
     larger  -> less frames
     smaller -> more frames

## Test build

./Make_map work_space_path resource_path

./Make_map /home/viki/UTOPA/Server_Localization/Maps/build_test/work_space_2 /home/viki/UTOPA/Server_Localization/Maps/build_test/build_sources_2 /home/viki/UTOPA/Server_Localization/vocabs/vocab_tree_flickr100K_words32K.bin /home/viki/UTOPA/Server_Localization/vocabs/vocab_tree_flickr100K_words256K.bin /home/viki/UTOPA/Server_Localization/vocabsvocab_tree_flickr100K_words1M.bin 

## Test Extract_image

./Extract_image /home/viki/UTOPA/Server_Localization/Maps/winter_garden /home/viki/Lucas/winter_gardon 50 20 0.3

## Test add images

./Make_map_add /home/viki/UTOPA/Server_Localization/Maps/build_test/work_space_2 /home/viki/UTOPA/Server_Localization/Maps/build_test/addition_resources /home/viki/UTOPA/Server_Localization/vocabs/vocab_tree_flickr100K_words32K.bin /home/viki/UTOPA/Server_Localization/vocabs/vocab_tree_flickr100K_words256K.bin /home/viki/UTOPA/Server_Localization/vocabsvocab_tree_flickr100K_words1M.bin 

## Test scale calculation

./Test_scale /home/viki/UTOPA/Server_Localization/Test_kexuecheng_B/work_space/database.db /home/viki/UTOPA/Server_Localization/Test_kexuecheng_B/work_space/sparse/ /home/viki/UTOPA/Server_Localization/Test_kexuecheng_B/work_space/VocIndex.bin /home/viki/UTOPA/Server_Localization/Test_kexuecheng_B/ArCore_result/Trajectory.txt /home/viki/UTOPA/Server_Localization/Test_kexuecheng_B/ArCore_result/images/ 496 282

// 282 images : 0.180249

## State manager 

1. DataPrepare : seperate videos. 
2. Feature Extractor : no built in callback exist. -> but I can roughly estimate the time
3. Feature Matcher : no built in callback exist. -> but I can roughly estimate the time
4. Sparse Reconstruction : has callback well built.
5. Dense Reconstruction : no built in callback exist. -> estimate by counting files in workspace folder
   * photometric 
   * geometric
   * fusion : estimate 


## winter scale

Done

## Further

* Set the video camera id to identity, and optimize the video camera parameters.
* Set the maximal image size of the MVS process to accelerate.
* Loop closure parameters could be modified.

# 2020/02/mid 
## 3D Reconstruction

* Test one 
 1) Record images by various devices, collect images use colmap to build a consist map.
 2) Record RGB image from a logi camera, while collect depth data from MyntEye IR mode.
 3) Offline localize the images, and use Voxblox to reconstruct the model.

* Problem with test one
 1) The recored depth data is damanged, as I used opencv to save depth as image 
    (loss info while encoding).
 2) Only a small part of the images is successfully localized, as the scene is lack of features.
    and also because of the small FOV of logi camera.

* TODO 
 1) Remake a dataset without flaw.
 2) Develop a realtime version of the algorithm.

# Back
[Back](../)


# Home
[Home](../../)
