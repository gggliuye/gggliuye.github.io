## Example test

./example database_path sparse_map_path voc_indices_path
test_images_path focus_length width height

* winter map (~ 1500 images)

./example /home/viki/UTOPA/Server_Localization/Maps/winter_update/database.db /home/viki/UTOPA/Server_Localization/Maps/winter_update/sparse/ /home/viki/UTOPA/Server_Localization/Maps/winter_update/VocIndex.bin /home/viki/UTOPA/Server_Localization/Maps/Test_images_p20pro/ 2814 3648 2736

* spring map (~ 200 images)

./example /home/viki/UTOPA/Server_Localization/Maps/spring/database.db /home/viki/UTOPA/Server_Localization/Maps/spring/sparse/ /home/viki/UTOPA/Server_Localization/Maps/spring/VocIndex.bin /home/viki/UTOPA/Server_Localization/Maps/Test_images_p20pro/ 2814 3648 2736

## Make indices test

./make_index database_path sparse_map_path voc_indices_path vocab_path

* winter map

./make_index /home/viki/UTOPA/Server_Localization/Maps/winter_update/database.db /home/viki/UTOPA/Server_Localization/Maps/winter_update/sparse/ /home/viki/UTOPA/Server_Localization/Maps/winter_update/VocIndex.bin /home/viki/UTOPA/Server_Localization/vocabs/vocab_tree_flickr100K_words32K.bin

* spring map

./make_index /home/viki/UTOPA/Server_Localization/Maps/spring/database.db /home/viki/UTOPA/Server_Localization/Maps/spring/sparse/ /home/viki/UTOPA/Server_Localization/Maps/spring/VocIndex.bin /home/viki/UTOPA/Server_Localization/vocabs/vocab_tree_flickr100K_words32K.bin

## Time analysis (before update)

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


## Plugin test

./test_plugin /home/viki/UTOPA/Server_Localization/Maps/winter_update/database.db /home/viki/UTOPA/Server_Localization/Maps/winter_update/sparse/ /home/viki/UTOPA/Server_Localization/Maps/winter_update/VocIndex.bin /home/viki/UTOPA/Server_Localization/Maps/success_images.txt /home/viki/UTOPA/Server_Localization/Maps/runtime_result_voc.txt 2814


## test

./Test2 /data/Maps/kexuecheng/database.db /data/Maps/kexuecheng/sparse/ /data/Maps/kexuecheng/VocIndex.bin /data/Maps/kexuecheng/images/images/ 1400

./test_plugin /data/Maps/kexuecheng/database.db /data/Maps/kexuecheng/sparse/ /data/Maps/kexuecheng/VocIndex.bin /data/Maps/kexuecheng/images/images/ 1400




## Back
[Back](../)


## Home
[Home](../../)
