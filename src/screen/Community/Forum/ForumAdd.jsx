/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-11-15 08:11:31
 * @LastEditors: Austral
 * @LastEditTime: 2024-02-05 22:07:36
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
import Tag from '../../../components/Tag';
import { store } from '../../../store/configureStore';

const ForumAdd = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [nextId, setNextId] = useState(1);
  const [nextTagId, setNextTagId] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const titleRef = useRef(null);
  const [tags, setTags] = useState([]);
  const contentRef = useRef(null);
  const [newTag, setNewTag] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);

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
          setSelectedImages([
            ...selectedImages,
            { id: nextId, url: response.assets[0].uri, rank: nextId },
          ]);
          setNextId(nextId + 11);
          console.log(selectedImages);
        }
      },
    );
  };

  const addTag = () => {
    if (newTag.trim() !== '') {
      setTags([...tags, { id: nextTagId, tagName: newTag, rank: nextTagId }]);
      setNewTag('');
      setIsAddingTag(false);
      setNextTagId(prevId => prevId + 1);
      console.log(tags);
    }
  };

  const handleTagPress = () => {
    setIsAddingTag(true);
  };

  const handleTextInputBlur = () => {
    // 处理 TextInput 失焦事件
    setIsAddingTag(false);
  };

  const handleTextInputSubmit = () => {
    // 处理 TextInput 完成事件
    addTag();
  };

  // const publish = () => {
  //   addArticle(content, title, tags, selectedImages, null, 2)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const publish = data => {
    const formData = new FormData();
    formData.append('type', '2');
    formData.append('title', title);
    formData.append('content', content);

    // 添加标签
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    // 添加图片
    selectedImages.forEach((image, index) => {
      formData.append(`pictures[${index}]`, {
        url: image.url,
        type: 'image/jpeg',
        name: `image_${index}.jpg`,
        rank: index,
        id: index,
      });
    });
    const params = {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        MindInsight: store.getState().user.token,
      },
      timeout: 5000,
    };
    return fetch(
      'http://110.42.236.60:8080//publication/publication/manage',
      params,
    )
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error('Error:', error);
        return { error: '请求异常，请重试' };
      });
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
            <Pressable style={styles.btn} onPress={publish}>
              <Text style={styles.btnText}>发布</Text>
            </Pressable>
          );
        }}
      />
      <TextInput
        placeholder="请输入标题"
        ref={titleRef}
        style={styles.title}
        defaultValue={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        placeholder="分享你的经历和感受吧！"
        multiline={true}
        ref={contentRef}
        style={styles.content}
        defaultValue={content}
        onChangeText={text => setContent(text)}
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
      {/* 添加tag */}
      <View style={styles.tags}>
        {tags.map((tag, index) => (
          <Tag text={tag.tagName} />
        ))}
        {isAddingTag && (
          <TextInput
            style={styles.input}
            placeholder="输入标签"
            value={newTag}
            onChangeText={text => setNewTag(text)}
            onBlur={handleTextInputBlur}
            onSubmitEditing={handleTextInputSubmit}
          />
        )}
        {!isAddingTag && (
          <TouchableOpacity style={styles.addButton} onPress={handleTagPress}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.imageContainer} horizontal>
        {selectedImages.map((image, index) => (
          <Image key={index} source={{ uri: image.url }} style={styles.image} />
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
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  btn: {
    backgroundColor: color.purple.deep,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 0,
    marginLeft: 10,
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
    //color: color.gray.deep,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: color.purple.light,
    borderRadius: 10,
    width: 30,
    height: 30,
    paddingHorizontal: 8, // 左右内边距
    paddingVertical: 3, // 上下内边距
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
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
