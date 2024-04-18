/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-11-15 08:11:31
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-17 15:11:03
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
import Spinner from '../../../components/Spinner';

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
  const [isVisible, setIsVisible] = useState(false);
  const [recordText, setRecordText] = useState('');
  const [recordIndex, setRecordIndex] = useState(0);
  const recordStrings = ['今天天气很好', '让人的心情也好起来了'];
  const recordTimerRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const startRecord = () => {
    setIsVisible(true);
    setRecordIndex(0);
    setTitle('');
    setContent('');
    const titleText = recordStrings[0];
    const contentText = recordStrings[1];

    const totalLength = titleText.length + contentText.length;
    let index = 0;

    const intervalId = setInterval(() => {
      if (index < totalLength) {
        if (index < titleText.length) {
          setTitle(prevTitle => prevTitle + titleText.charAt(index));
        } else {
          setContent(
            prevContent =>
              prevContent + contentText.charAt(index - titleText.length),
          );
        }
        index++;
      } else {
        clearInterval(intervalId);
        setIsVisible(false);
      }
    }, 300);
  };

  const stopRecord = () => {
    setIsVisible(false);
  };

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

  const publish = navigation => {
    const formData = new FormData();
    formData.append('type', '2');
    formData.append('title', title);
    formData.append('content', content);

    // 添加标签
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    // 添加图片
    const imagesData = selectedImages.map((image, index) => ({
      url: image.url,
      type: 'image/jpeg',
      name: `image_${index}.jpg`,
      rank: index,
      id: index,
    }));

    formData.append('pictures', JSON.stringify(imagesData));

    const params = {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        MindInsight: store.getState().user.token,
      },
      timeout: 5000,
    };

    console.log('params', params.body);
    console.log('formData 参数:', formData);
    return fetch(
      'http://110.42.236.60:8080//publication/publication/manage',
      params,
    )
      .then(response => {
        console.log('Response:', response);
        return response.json(); // 这里添加了 return
      })
      .then(data => {
        navigation.goBack();
        // console.log(data.json());
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
        return { error: '请求异常，请重试' };
      });
  };

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
        // headerRight={() => {
        //   return (
        // <Pressable style={styles.btn} onPress={publish}>
        //   <Text style={styles.btnText}>发布</Text>
        // </Pressable>
        //   );
        // }}
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
          <Tag key={index} text={tag.tagName} />
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
      <ScrollView
        contentContainerStyle={styles.imageContainer}
        showsVerticalScrollIndicator={false}
        horizontal>
        {selectedImages.map((image, index) => (
          <Image key={index} source={{ uri: image.url }} style={styles.image} />
        ))}
      </ScrollView>

      {isVisible && (
        <View style={{ position: 'absolute', bottom: 100, left: '45%' }}>
          <Spinner />
        </View>
      )}
      <View style={styles.bottomBox}>
        <Pressable onPress={openImagePicker}>
          <Icon icode={'\ue60b'} size={26} iconPress={openImagePicker} />
        </Pressable>
        <Pressable
          style={styles.recordContainer}
          onPressIn={startRecord}
          onPressOut={stopRecord}>
          <Text>按住说话</Text>
          {/* <Text>{recordText}</Text> */}
        </Pressable>
        <Pressable style={styles.btn} onPress={() => publish(navigation)}>
          <Text style={styles.btnText}>发布</Text>
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
    paddingHorizontal: 14,
    paddingVertical: 5,
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
    borderBottomColor: 'rgb(242,242,242)',
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
    width: 40,
    height: 40,
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
    flexDirection: 'row',

    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: 'rgb(242,242,242)',
    borderTopWidth: 1,
    paddingHorizontal: 10,
    bottom: 0,
  },
});

export default ForumAdd;
