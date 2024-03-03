/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-11-17 20:01:29
 * @LastEditors: Austral
 * @LastEditTime: 2024-02-05 21:56:58
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
import { Buffer } from 'buffer';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TitleHeader from '../../../../../components/TitleHeader';
import Navigation from '../../../../../navigations';
import { commonStyles } from '../../../../../assets/commonStyle';
import { changeAvatar, getUserInfo } from '../../../../../network/modules/user';
import { changeUserInfo } from '../../../../../network/modules/user';
import { Avatar } from '@rneui/base/dist/Avatar/Avatar';
import Button from '../../../../../components/Button';
import { selectUserInfo } from '../../../../../store/modules/user';
import { store } from '../../../../../store/configureStore';

const MeSettingChangeAvatar = ({ navigation }) => {
  const [imgList, setImgList] = useState('');
  useEffect(() => {
    getUserInfo().then(res => {
      console.log(res);
      setImgList(res.data.avatar);
      console.log(imgList);
    });
  }, []);

  // const uploadImageToServer = async img => {
  //   try {
  //     const formData = new FormData();
  //     let file = { uri: source };
  //     // 将图片文件添加到表单数据
  //     formData.append('image', {
  //       uri: img,
  //       type: 'image/jpeg',
  //       name: 'avatar.jpg',
  //     });

  //     // changeAvatar(formData)
  //     //   .then(res => {
  //     //     console.log(res);
  //     //   })
  //     //   .catch(err => {
  //     //     console.log(err);
  //     //   });
  //   } catch (error) {
  //     console.error('Image Upload Error:', error);
  //   }
  // };

  const uploadImg = async params => {
    let { formData } = params;
    return await uploadRequest(formData);
  };

  const uploadRequest = data => {
    const params = {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        MindInsight: store.getState().user.token,
      },
      timeout: 5000, // 5s超时
    };
    return fetch('http://110.42.236.60:8080/profile/user/avatar', params)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        return { error: '请求异常，请重试' };
      });
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
        console.log(res);
        const curFiles = res.assets[0];
        setImgList(curFiles.uri);
        // console.log(res.assets instanceof File);
        // const base64Image = `data:${curFiles.type};base64,${curFiles.base64}`;
        // const byteCharacters = atob(curFiles.base64);
        // const byteNumbers = new Array(byteCharacters.length);
        // for (let i = 0; i < byteCharacters.length; i++) {
        //   byteNumbers[i] = byteCharacters.charCodeAt(i);
        // }
        // const byteArray = new Uint8Array(byteNumbers);
        // const blob = new Blob([byteArray], { type: 'image/png' });
        // changeAvatar(blob, curFiles.fileName)
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });

        const formData = new FormData();
        let file = {
          uri: curFiles.uri,
          type: 'multipart/form-data',
          name: curFiles.fileName,
        };
        formData.append('file', file);
        let params = { formData };

        let imgResult = uploadImg(params).then(res => {
          console.log('res');
          console.log(res);
          setImgList(res.data);
        });
        console.log(imgResult);
        //setImgList(base64Image);
        //uploadImageToServer(imgList);
        //console.log('imglist:  ' + imgList);
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
