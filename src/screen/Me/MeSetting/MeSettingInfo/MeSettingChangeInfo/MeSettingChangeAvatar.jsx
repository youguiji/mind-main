/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-11-17 20:01:29
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-10 14:16:25
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  //Button,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TitleHeader from '../../../../../components/TitleHeader';
import Navigation from '../../../../../navigations';
import { commonStyles } from '../../../../../assets/commonStyle';
import { changeAvatar, getUserInfo } from '../../../../../network/modules/user';
import { changeUserInfo } from '../../../../../network/modules/user';
import { Avatar } from '@rneui/base/dist/Avatar/Avatar';
import Button from '../../../../../components/Button';
import { selectUserInfo } from '../../../../../store/modules/user';

const MeSettingChangeAvatar = ({ navigation }) => {
  const [imgList, setImgList] = useState('');
  useEffect(() => {
    getUserInfo().then(res => {
      console.log(res);
      setImgList(res.data.avatar);
      console.log(imgList);
    });
    return () => {};
  }, []);

  const uploadImageToServer = async img => {
    try {
      const formData = new FormData();

      // 将图片文件添加到表单数据
      formData.append('image', {
        uri: img,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      });


      changeAvatar(formData)
      .then(res => {
        console.log(res);
      })
      .catch(err=>{
        console.log(err);
      });
      
    } catch (error) {
      console.error('Image Upload Error:', error);
    }
  };

  const handleClick = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: true,
        maxWidth: 1000,
        maxHeight: 1000,
      },
      res => {
        const curFiles = res.assets[0];
        console.log(res.uri);
        const base64Image = `data:${curFiles.type};base64,${curFiles.base64}`;
        setImgList(base64Image);
        uploadImageToServer(imgList);
        console.log('imglist:  ' + imgList);
      },
    );
  };
  return (
    <View>
      <TitleHeader
        title={'修改头像'}
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={StyleSheet.flatten([commonStyles.marginTop, styles.box])}>
        <Avatar
          style={styles.img}
          size={256 * 2}
          source={imgList ? { uri: imgList } : null}
        />

        <Button style={styles.btn} title="点击选择图片" onPress={handleClick} />
        {/* {imgList.map(item => {
          return (
            <Image
              key={item.url}
              style={{ width: 200, height: 200 }}
              source={{ uri: item.uri }}
            />
          );
        })} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    marginTop: -100,
    width: 300,
    height: 300,
  },
  btn: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default MeSettingChangeAvatar;
