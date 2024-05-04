/*
 * @Description: 心理咨询师资质认证
 * @Version:
 * @Autor: Austral
 * @Date: 2024-02-26 22:12:06
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-29 18:08:41
 */
import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Pressable } from 'react-native';
import { useNotification } from '../../../components/Notification';
import CustomTextInput from '../../../components/CustomTextInput';
import TitleHeader from '../../../components/TitleHeader';
import Icon from '../../../components/Icon';
import { color } from '../../../assets/color';

const MeCertification = ({ navigation }) => {
  const showNotification = useNotification();
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [location, setLocation] = useState('');
  const [education, setEducation] = useState('');
  const [resume, setResume] = useState('');
  const [level, setLevel] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  const handleSubmit = () => {
    console.log('提交认证信息');
    showNotification('提交成功，请等待工作人员审核！');
  };

  return (
    <View style={{ height: '100%' }}>
      <TitleHeader
        title="身份信息填写"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{ marginTop: 40 }}>
        <View style={{ marginVertical: 10 }}>
          <CustomTextInput
            title="真实姓名:"
            value={name}
            onChangeText={setName}
            placeholder="请输入姓名"
          />
          <CustomTextInput
            title="身份证号:"
            value={idNumber}
            onChangeText={setIdNumber}
            placeholder="请输入身份证号"
          />
          <CustomTextInput
            title="所在地区:"
            value={location}
            onChangeText={setLocation}
            placeholder="请输入所在地区"
          />
          <CustomTextInput
            title="教育背景:"
            value={education}
            onChangeText={setEducation}
            placeholder="请输入教育背景"
          />
        </View>
        <CustomTextInput
          title="个人履历:"
          value={resume}
          onChangeText={setResume}
          placeholder="请输入个人履历"
          multiline
        />
        {/* <TitleHeader title="资质认证" /> */}

        <CustomTextInput
          title="从业时间:"
          value={experience}
          onChangeText={setExperience}
          placeholder="请输入从业时间"
        />
        <CustomTextInput
          title="擅长专业:"
          value={specialization}
          onChangeText={setSpecialization}
          placeholder="请输入擅长专业"
        />
        <CustomTextInput
          title="执业证号:"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
          placeholder="请输入执业证号"
        />
        <CustomTextInput
          title="咨询师等级:"
          value={level}
          onChangeText={setLevel}
          placeholder="请输入咨询师等级"
        />
        <View
          style={{
            backgroundColor: '#fff',
            height: 40,
            // borderBottomWidth: 1,
            // borderColor: '#ccc',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 10,
          }}>
          <Text style={{ color: '#000' }}>证明图片</Text>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            height: 90,
            // borderBottomWidth: 1,
            // borderColor: '#ccc',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              width: 70,
              height: 70,
              backgroundColor: '#F5F5F5',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 14,
            }}>
            <Icon icode={'\ue60b'} size={20} color={'#ccc'} />
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#fff',
          paddingVertical: 8,
        }}>
        <Pressable
          style={{
            backgroundColor: color.purple.deep,
            borderRadius: 10,
            width: '90%',
            paddingHorizontal: 14,
            alignItems: 'center',
            paddingVertical: 10,
            marginLeft: 10,
          }}>
          <Text style={{ color: '#fff', fontSize: 14 }}>提交认证信息</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 15,
  },
});

export default MeCertification;
