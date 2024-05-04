/*
 * @Description:咨询室
 * @Version:
 * @Autor: Austral
 * @Date: 2024-02-23 11:09:06
 * @LastEditors: Austral
 * @LastEditTime: 2024-05-03 14:14:38
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import ConsultantCard from '../Components/ConsultantCard';
import { ScrollView } from 'react-native-gesture-handler';
import Search from '../../../components/Search';
import Icon from '../../../components/Icon';

const ConsultingRoom = ({ navigation }) => {
  const [consultant, setConsultant] = useState([
    {
      avatar: 'https://cdn.psy.com.cn/2023/07/19/16440426.png',
      username: '郭蓄芳',
      line1: '国家二级心理咨询师,心理治疗室主任',
      boldText:
        '家庭关系、情绪管理、亲密关系：抑郁、焦虑恐惧、强迫等心理困扰。',
      tagText: '压抑心理',
    },
    {
      avatar: 'https://cdn.psy.com.cn/2018/12/18/15071232.jpg',
      username: '郑海涛',
      line1: '国家三级心理咨询师,易术心理剧初级导演,莫雷诺学院初级导演',
      boldText: '团体心理剧、个人成长议题咨询、家庭关系咨询',
      tagText: '情感困惑',
    },
    {
      avatar: 'https://cdn.psy.com.cn/2023/07/19/16142866.png',
      username: '李芳宁',
      line1: '国家二级心理咨询师,十年+经验',
      line2: '神经症心理、神经官能症心理、疑病症、性心理',
      boldText: '神经症心理、神经官能症心理、疑病症、性心理',
      tagText: '压抑心理',
    },
    {
      avatar: 'https://cdn.psy.com.cn/2023/07/19/16455447.png',
      username: '蒋静',
      line1: '国家二级咨询师 ,十二年+经验',
      line2:
        '青少年和儿童的心理咨询和辅导，亲子关系修复和维护，婚姻情感恋爱咨询',
      boldText:
        '青少年和儿童的心理咨询和辅导，亲子关系修复和维护，婚姻情感恋爱咨询',
      tagText: '压抑心理',
    },
    {
      avatar: 'https://cdn.psy.com.cn/2023/07/19/16280842.png',
      username: '杨昌宇',
      line1: '国家二级咨询师,心理系导师',
      line2:
        '青少年和儿童的心理咨询和辅导，亲子关系修复和维护，婚姻情感恋爱咨询',
      boldText: '成人心理咨询、青少年咨询、伴侣及家庭治疗',
      tagText: '压抑心理',
    },
    {
      avatar:
        'https://ossimg.xinli001.com/op/df/2023822/1692675773097a6wf6CfXxuFEvEQ45UpkcyEfBHZ1OpKW.png',
      username: '黎燕',
      line1: '国家二级咨询师 国家一级婚姻家庭咨询师 性与亲密关系高级咨询师',
      line2:
        '青少年和儿童的心理咨询和辅导，亲子关系修复和维护，婚姻情感恋爱咨询',
      boldText: '婆媳关系、亲密关系',
      tagText: '压抑心理',
    },
    {
      avatar:
        'https://ossimg.xinli001.com/op/df/2023822/1692676546685aOqgWHIrk4RtwOM2Qh88ZSW7otxg4A2r.png',
      username: '严林',
      line1: '国家二级心理咨询师、NGH国际催眠治疗师      ',
      line2:
        '青少年和儿童的心理咨询和辅导，亲子关系修复和维护，婚姻情感恋爱咨询',
      boldText: '女性成长、童年创伤、个人体验',
      tagText: '压抑心理',
    },
  ]);
  const sections = ['全部 ∨', '排序 ∨', '性别 ∨', '擅长 ∨', '筛选 ∨'];

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <TitleHeader title="咨询师推荐" />
      {/* 搜索框 */}
      <Pressable
        style={styles.searchContainer}
        onPress={() => console.log('搜索框点击')}>
        <Icon size={16} icode={'\ue60e'} />
        <Text style={styles.text}>请输入咨询师姓名</Text>
      </Pressable>
      <View style={styles.container}>
        {sections.map((section, index) => (
          <View
            key={index}
            style={[
              styles.section,
              index !== sections.length - 1 && styles.borderRight,
            ]}>
            <Text style={styles.sectionText}>{section}</Text>
          </View>
        ))}
      </View>
      <ScrollView
        style={{ width: '100%', backgroundColor: 'rgb(252,254,251)' }}
        showsVerticalScrollIndicator={false}>
        {consultant.map(item => {
          return (
            <ConsultantCard
              key={item.id}
              avatar={item.avatar}
              username={item.username}
              line1={item.line1}
              boldText={item.boldText}
              tagText={item.tagText}
              onPressChat={() => {
                /* 处理按钮点击事件 */
                navigation.navigate('ConsultingDetail', { receiverInfo: item });
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgb(245,245,245)',
    // backgroundColor: 'rgb(252,254,251)'
  },
  section: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#ccc',
  },
  sectionText: {
    fontSize: 12,
  },
  borderRight: {
    // borderRightWidth: 1,
  },
  searchContainer: {
    width: '98%',
    flexDirection: 'row',
    paddingHorizontal: 14,
    marginTop: 40,
    marginBottom: 8,
    marginHorizontal: 3,
    paddingVertical: 8,
    backgroundColor: 'rgb(245,245,245)',
    borderRadius: 24,
  },
  text: {
    fontSize: 12,
    color: 'rgb(154,154,154)',
    paddingLeft: 4,
  },
});

export default ConsultingRoom;
