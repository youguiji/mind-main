/*
 * @Description: 语音导航
 * @Version:
 * @Autor: Austral
 * @Date: 2024-04-15 19:57:13
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-16 09:43:44
 */
import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import WaveAnimation from './WaveAnimation';

const VoiceNavigaion = () => {
  const [showWave, setShowWave] = useState(false);

  const handleClick = () => {
    setShowWave(true);
  };

  return (
    <>
      <TouchableOpacity onPress={handleClick}>
        <Text>点击我</Text>
      </TouchableOpacity>
      {showWave && <WaveAnimation isVisible={true} text={'我要发布文章'} duration={50000} />}
    </>
  );
};

export default VoiceNavigaion;
