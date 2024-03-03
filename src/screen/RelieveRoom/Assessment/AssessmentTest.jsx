import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView
} from 'react-native';
import { color } from '../../../assets/color';
import TitleHeader from '../../../components/TitleHeader';

// 自定义 Radio 组件
const Radio = ({ value, selected, onSelect }) => {
  return (
    <Pressable
      onPress={onSelect}
      style={[styles.radio, selected && styles.selected]}>
      <Text>{value}</Text>
    </Pressable>
  );
};

const AssessmentTest = ({ navigation }) => {
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: '1、你跟男女性朋友能否无所不谈？',
      options: ['是', '否'],
    },
    {
      question: '2、当恋爱出现问题时，你是否自然就会责备自己，认为是自己的错？',
      options: ['是', '否'],
    },
    {
      question: '3、你是否不太愿意跟随自己的浪漫直觉行事？',
      options: ['是', '否'],
    },
    {
      question: '6、你是否愿意做一个独身女（男）郎？',
      options: ['是', '否'],
    },
    {
      question: '7、你是否要经过长时间相处才能够真正信任一个人？',
      options: ['是', '否'],
    },
    {
      question: '10、你看见一对情侣在街上手牵手，会感到妒忌吗？',
      options: ['是', '否'],
    },
    {
      question: '13、若男（女）朋友对你很差，你还会跟他继续拍拖？',
      options: ['是', '否'],
    },
    {
      question: '14、你是否宁愿“拍散拖”，多余拥有一段认真的恋爱关系？',
      options: ['是', '否'],
    },
    {
      question:
        '16、如果你的男（女）友说：“我们的性格不合，还是分手吧。”你会哀求他不要抛弃你吗？',
      options: ['是', '否'],
    },
    {
      question:
        '19、如果你认为改变自己的外貌能令分手的男（女）友回心转意，你会那样做吗？',
      options: ['是', '否'],
    },
    {
      question:
        '20、你是否一想到要对一个男（女）人做出承诺便害怕得要拔足逃跑？',
      options: ['是', '否'],
    },
  ];

  const results = [
    '根据你的回答，你的心理状态较为稳定。',
    '根据你的回答，你可能存在一定程度的焦虑情绪。',
    // 其他答案...
  ];

  const updateAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const showResults = () => {
    setShowResult(true);
  };

  return (
    <View style={styles.container}>
      <TitleHeader
        title="失恋时你有一颗什么心"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => {
          return (
            <Pressable style={styles.btn} onPress={()=>{navigation.navigate('AssessmentResult')}}>
              <Text style={styles.btnText}>完成</Text>
            </Pressable>
          );
        }}
      />
      <ScrollView
        style={{
          marginTop: 40,
          padding: 10,
          backgroundColor: '#fff',
          height: '100%',
        }}>
        {!showResult ? (
          <View>
            {questions.map((q, index) => (
              <View key={index} style={styles.questionContainer}>
                <Text style={styles.questionText}>{q.question}</Text>
                <View style={styles.optionsContainer}>
                  {q.options.map((option, optionIndex) => (
                    <Radio
                      key={optionIndex}
                      value={option}
                      selected={answers[index] === option}
                      onSelect={() => updateAnswer(index, option)}
                    />
                  ))}
                </View>
              </View>
            ))}
            <Button
              title="完成"
              onPress={() => {
                navigation.navigate('');
              }}
            />
          </View>
        ) : (
          // <View>
          //   <Text style={styles.resultText}>{results[0]}</Text>
          // </View>
          <View></View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  questionContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    // borderWidth: 1,
    // borderColor: color.purple.light,
    padding: 10,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '20',
  },
  optionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: 20,
  },
  radio: {
    //borderWidth: 1,
    //borderColor: '#ccc',
    padding: 10,
    borderRadius: 20,
  },
  selected: {
    // backgroundColor: 'green',
    borderWidth: 1,
    borderColor: color.purple.light,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: color.purple.deep,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default AssessmentTest;
