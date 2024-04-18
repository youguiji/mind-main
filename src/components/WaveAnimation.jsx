import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native'; // 导入Easing

const WaveAnimation = ({ duration, isVisible }) => {
  const waveAnimations = useRef([...Array(15)].map(() => new Animated.Value(20))).current;

  useEffect(() => {
    if (isVisible) {
      const middleIndex = Math.floor(waveAnimations.length / 2);

      const animations = waveAnimations.map((animation, index) => {
        const distanceToMiddle = Math.abs(index - middleIndex);
        const height = 60 - distanceToMiddle * 4; // 根据距离中间的距离计算高度

        return Animated.loop(
          Animated.sequence([
            Animated.timing(animation, {
              toValue: height + 10,
              duration: duration / 4, // 从最小值到最大值的时间
              useNativeDriver: false,
              easing: Easing.out(Easing.ease),
            }),
            Animated.timing(animation, {
              toValue: 60, // 最大值
              duration: duration / 4, // 从最小值到最大值的时间
              useNativeDriver: false,
              easing: Easing.out(Easing.ease),
            }),
            Animated.timing(animation, {
              toValue: 20, // 最小值
              duration: duration / 4, // 从最大值到最小值的时间
              useNativeDriver: false,
              easing: Easing.out(Easing.ease),
            }),
            Animated.timing(animation, {
              toValue: 30, // 中间值
              duration: duration / 4, // 从最大值到最小值的时间
              useNativeDriver: false,
              easing: Easing.out(Easing.ease),
            }),
          ])
        );
      });

      Animated.parallel(animations).start();
    } else {
      // 如果不可见，则停止动画
      waveAnimations.forEach(animation => animation.stopAnimation());
    }
  }, [duration, isVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.wave}>
        {waveAnimations.map((animation, index) => (
          <Animated.View
            key={index}
            style={[styles.waveLine, { height: animation }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    flexDirection: 'row',
    width: '120%',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  waveLine: {
    width: 5,
    backgroundColor: 'blue',
    borderRadius: 3,
  },
});

export default WaveAnimation;
