import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  Button,
} from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import { color } from '../../../assets/color';
import Icon from '../../../components/Icon';
// import ImagePicker from 'react-native-image-picker';
const ForumAdd = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.uri) {
        setSelectedImage(response.uri);
      }
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
      <Pressable style={styles.bottomBox}>
        <TouchableOpacity>
          <Icon icode={'\ue60b'} size={26} />
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
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
