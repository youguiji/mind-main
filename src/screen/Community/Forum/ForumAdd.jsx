/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-11-15 08:11:31
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-13 11:16:20
 */
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  FlatList,
  Button,
  ScrollView,
  Dimensions,
} from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import { color } from '../../../assets/color';
import Icon from '../../../components/Icon';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { addArticle } from '../../../network/modules/community';

const ForumAdd = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const screenWidth = Dimensions.get('window').width;
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [selectedImages, setSelectedImages] = useState([]);

  const openImagePicker = async () => {
    console.log('open successfully');
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 6 - selectedImages.length, // 限制选择的图片数量
        includeBase64: true,
        maxWidth: 1000,
        maxHeight: 1000,
      },
      response => {
        if (!response.didCancel && !response.errorCode) {
          // 更新选择的图片数组
          setSelectedImages([...selectedImages, ...response.assets]);
        }
      },
    );
  };

  const renderItem = ({ item }) => (
    <Image style={styles.image} source={{ uri: item.uri }} />
  );

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        titleRef.current.blur();
        contentRef.current.blur();
      }}>
      <TitleHeader
        title="发布动态"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => {
          return (
            <Pressable style={styles.btn}>
              <Text style={styles.btnText}>发布</Text>
            </Pressable>
          );
        }}
      />
      <TextInput
        placeholder="请输入标题"
        ref={titleRef}
        style={styles.title}
        value={title}
        onChange={setTitle}
      />
      <TextInput
        placeholder="分享你的经历和感受吧！"
        multiline={true}
        ref={contentRef}
        style={styles.content}
        value={content}
        onChange={setContent}
      />
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <Button title="选择图片" onPress={pickImage} />
      </View> */}
      <ScrollView contentContainerStyle={styles.imageContainer} horizontal>
        {selectedImages.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.bottomBox}>
        <Pressable onPress={openImagePicker}>
          <Icon icode={'\ue60b'} size={26} iconPress={openImagePicker} />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  btn: {
    backgroundColor: color.purple.deep,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
  },
  title: {
    marginTop: 40,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  content: {
    paddingHorizontal: 10,
    color: color.gray.deep,
  },
  bottomBox: {
    width: '100%',
    position: 'absolute',
    height: 40,
    justifyContent: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    bottom: 0,
  },
});

export default ForumAdd;
