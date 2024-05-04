import React, { useState, useRef } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { color } from '../../assets/color';
import { getCode, login } from '../../network/modules/user';
import { useDispatch } from 'react-redux/es/exports';
import Icon from '../../components/Icon';
import { LoginIn } from '../../store/modules/login';
import { useNotification } from '../../components/Notification';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const showNotification = useNotification();
  const phoneRef = useRef(null);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/systemImage/F0FA48FB26FB6DE0F8358ED6BC34C5D3.jpg')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <Pressable
            style={styles.outContent}
            onPress={event => {
              phoneRef.current.blur();
            }}>
            <View style={styles.contains}>
              {/* <View>
            <Dialog visible={visible} message="请输入登录邮箱" />
          </View> */}
              <Text
                style={{
                  fontSize: 40,
                  color: color.purple.light,
                  paddingTop: 10,
                  // paddingVertical: 20,
                }}>
                {' '}
                MindInsight{' '}
              </Text>
              <Text style={{ marginBottom: 10 }}>属于您的心理专属心理管家</Text>
              <Input
                type="text"
                placeholder="请输入登录邮箱或者手机号"
                style={StyleSheet.flatten([
                  // { width: '140%' },
                  styles.inputBoxItem1,
                ])}
                keyboardType="numeric"
                value={[phone, setPhone]}
                ref={phoneRef}
              />
              <View style={{ width: '100%', flexDirection: 'row',justifyContent: 'space-around' ,}}>
              <Button
                title="获取验证码"
                style={[
                  styles.inputBoxItem,
                  {
                    height: 40,
                  },
                ]}
                textStyle={{
                  fontSize: 14,
                  fontWeight: '500',
                }}
                onPress={async () => {
                  dispatch(LoginIn);
                  try {
                    if (phone.length != 0) {
                      const res = await getCode(phone, 'login');
                      console.log(res);
                      // if (res.code != '00000') {
                      //   showNotification(res.message);
                      // }
                      navigation.navigate('LOGINGETCODE', {
                        phone: phone,
                      });
                      showNotification('验证码已发送，请注意查收');
                    } else {
                      showNotification('请输入邮箱哦！');
                    }
                  } catch (error) {
                    console.error('Network Error: ', error.message);
                  }
                }}></Button>
              <Button
                title="密码登录"
                style={[
                  styles.inputBoxItem,
                  {
                    height: 40,
                  },
                ]}
                textStyle={{
                  fontSize: 14,
                  fontWeight: '500',
                }}
                onPress={() => {
                  navigation.navigate('LOGINREGISTER');
                }}></Button>
                </View>
              <Text
                style={{
                  color: '#000',
                  marginTop: 10,
                }}>
                其他方式登录
              </Text>
              <View style={styles.other}>
                <Pressable>
                  <Icon
                    style={{ marginRight: 20 }}
                    icode={'\ue618'}
                    size={20}
                    color="rgb(9,187,7)"
                  />
                </Pressable>
                <Pressable>
                  <Icon
                    style={{ marginRight: 20 }}
                    icode={'\ue6ca'}
                    size={20}
                    color="rgb(54,155,206)"
                  />
                </Pressable>
              </View>
              {/* <Text style={styles.slogan}>你的情绪，我能看见</Text> */}
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  outContent: {

    // justifyContent: 'center',
    // alignItems: 'center',
  },
  contains: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 50,
    paddingTop: 50,
    marginTop: 40,
    // backgroundColor: '#fff',
    display: 'flex',
    color: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  inputBoxItem1: {
    marginVertical: 10,
    marginLeft: 15,
  },
  inputBoxItem: {
    marginVertical: 10,
    // marginLeft: 20,
    padding: 0,
    width: '40%',
  },
  btn: {
    width: '80%',
  },
  other: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '30%',
    justifyContent: 'space-between',
  },
  bottom: {
    color: '#fff',
    position: 'absolute',
    bottom: 100,
  },
  slogan: {
    color: 'rgb(248,246,242)',
    fontSize: 20,
    position: 'absolute',
    bottom: 120,
  },
});

export default Login;
