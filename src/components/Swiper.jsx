/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-11-15 08:11:31
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-14 17:15:40
 */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import Icon from './Icon';

const { width } = Dimensions.get('window');

const Swiper = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageHeight, setImageHeight] = useState(200); // 默认图片高度
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // 根据第一张图片的纵横比调整图片高度
    if (images.length > 0) {
      Image.getSize(images[0], (imgWidth, imgHeight) => {
        const aspectRatio = imgWidth / imgHeight;
        const calculatedHeight = width / aspectRatio;
        setImageHeight(calculatedHeight);
      });
    }
  }, [images]);

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  const scrollToIndex = index => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        animated: true,
        x: width * index,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollViewRef}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={[styles.image, { height: imageHeight }]}
          />
        ))}
      </ScrollView>

      {/* 指示点 */}
      {/* <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? 'blue' : 'gray' },
            ]}
            onTouchStart={() => scrollToIndex(index)}
          />
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: 10,
    marginVertical: 5,
    // width: '98%',
    // height: 250,
    // borderRadius: 10,
    // padding: 5,
  },
  image: {
    width, // 这里没有固定的高度
    // height: 250,
    borderRadius: 10,

    // marginHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // margin: 5,
  },
});

export default Swiper;
