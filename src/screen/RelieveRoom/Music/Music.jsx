import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';
import SoundPlayer from 'react-native-sound';
import { color } from '../../../assets/color';
import Icon from '../../../components/Icon';

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false); // 控制播放状态
  const [progress, setProgress] = useState(0); // 当前播放进度
  const [duration, setDuration] = useState(160); // 音频总时长
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // 当前播放歌曲索引
  const soundObject = useRef(null); // 保存音频播放对象的引用

  // 播放列表
  const playlist = [
    {
      title: 'Windy Hill',
      url: 'https://img3.tukuppt.com/newpreview_music/09/01/89/5c8a1cc9e7c3786323.mp3',
      time: 160,
    },
    {
      title: '卡农',
      url: 'https://m801.music.126.net/20240429145601/dea91d50033a245af4879393f2ee4fd9/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/17608047630/e685/5f6c/98d7/91dafbab5c87994b08227753b647b739.mp3',
      time: 300,
    },
    {
      title: '贝加尔湖畔',
      url: 'https://m701.music.126.net/20240429145826/703a579bdc115d6f806c04ba056367b3/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/33824597240/7bb9/1d8e/11b1/f2b4a60b480d9c4c754379bc102e7bff.mp3',
      time: 142,
    },
    // 其他歌曲信息...
  ];

  useEffect(() => {
    // 加载音频文件
    const loadAudio = async () => {
      try {
        // 创建音频对象
        const sound = new SoundPlayer(
          playlist[currentTrackIndex].url,
          SoundPlayer.MAIN_BUNDLE,
          error => {
            if (error) {
              console.error('加载音频失败', error);
            } else {
              // 设置音频对象的循环播放模式
              soundObject.current = sound;
              soundObject.current.setNumberOfLoops(-1); // 无限循环播放
              // 获取音频文件时长
              soundObject.current.getDuration(duration => {
                setDuration(duration);
              });
            }
          },
        );
      } catch (error) {
        console.error('加载音频失败', error);
      }
    };
    loadAudio();

    // 组件卸载时释放音频资源
    return () => {
      if (soundObject.current) {
        soundObject.current.release();
      }
    };
  }, [currentTrackIndex]);

  // 切换播放/暂停状态
  const togglePlayPause = () => {
    // 确保音频对象存在
    if (soundObject.current) {
      if (isPlaying) {
        console.log('true');
        soundObject.current.pause();
      } else {
        soundObject.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  // 播放上一首歌曲
  const prevTrack = () => {
    console.log('pre');
    const newIndex =
      (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(newIndex);
    soundObject.current.pause();
    soundObject.current.release();
    const newSound = new SoundPlayer(
      playlist[newIndex].url,
      SoundPlayer.MAIN_BUNDLE,
      error => {
        if (error) {
          console.error('加载音频失败', error);
        } else {
          soundObject.current = newSound;
          soundObject.current.setNumberOfLoops(-1);
          soundObject.current.play();
          setIsPlaying(true); // 设置为播放状态
          soundObject.current.getDuration(duration => {
            setDuration(duration);
          });
        }
      },
    );
  };

  // 播放下一首歌曲
  const nextTrack = () => {
    console.log('next');
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    if (isPlaying) {
      // 如果当前是播放状态，先暂停当前歌曲
      setIsPlaying(false);
      soundObject.current.stop();
    }
    soundObject.current.release(); // 释放当前歌曲资源
    const newSound = new SoundPlayer(
      playlist[nextIndex].url,
      SoundPlayer.MAIN_BUNDLE,
      error => {
        if (error) {
          console.error('加载音频失败', error);
        } else {
          soundObject.current = newSound;
          soundObject.current.setNumberOfLoops(-1);
          soundObject.current.play();
          setIsPlaying(true); // 设置为播放状态
          soundObject.current.getDuration(duration => {
            setDuration(duration);
          });
        }
      },
    );
  };

  // 监听播放进度变化
  useEffect(() => {
    const interval = setInterval(() => {
      if (soundObject.current) {
        soundObject.current.getCurrentTime(seconds => {
          setProgress((seconds / duration) * 100);
        });
      }
    }, 1000);

    // 清除定时器
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // 将秒数转换为分钟:秒的格式
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // // 切歌功能
  // const nextTrack = () => {
  //   // 计算下一首歌曲的索引
  //   const nextIndex = (currentTrackIndex + 1) % playlist.length;
  //   setCurrentTrackIndex(nextIndex);
  //   // 停止当前播放
  //   if (isPlaying) {
  //     setIsPlaying(false);
  //     soundObject.current.stop();
  //   }
  // };

  return (
    <ImageBackground
      source={require('../../../assets/systemImage/1.png')}
      resizeMode="cover"
      style={styles.backgroundImage}>
      {/* 音频封面图 */}
      {/* <Image
        source={{ uri: playlist[currentTrackIndex].cover }}
        style={styles.cover}
      /> */}
      <View style={{ position: 'absolute', top: 45, right: 25 }}>
        <Icon icode={'\ue608'} size={20} />
      </View>
      {/* 音频标题 */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>{playlist[currentTrackIndex].title}</Text>
        <Icon icode={'\ue8c3'} size={25} color={'rgb(1,0,36)'} />
      </View>
      {/* 播放进度条 */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      {/* 播放时长 */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {formatTime((progress * playlist[currentTrackIndex].time) / 100)}
        </Text>
        <Text style={styles.timeText}>
          {formatTime(playlist[currentTrackIndex].time)}
        </Text>
      </View>
      {/* 播放控制按钮 */}
      <View style={styles.controls}>
        {/* 上一首 */}
        <Pressable onPress={prevTrack} style={styles.controlBox}>
          <Icon size={40} icode={'\ue63c'} color={'rgb(1,0,39)'} />
          {/* <Text style={styles.controlText}>上一首</Text> */}
        </Pressable>
        <Pressable onPress={togglePlayPause} style={styles.play}>
          <Text style={styles.controlText}>
            {isPlaying ? (
              // 暂停
              <Icon size={40} icode={'\ue87a'} color={'rgb(1,0,39)'} />
            ) : (
              // 播放
              <Icon size={40} icode={'\ue87c'} color={'rgb(1,0,39)'} />
            )}
          </Text>
        </Pressable>
        {/* 下一首 */}
        <Pressable
          onPress={nextTrack}
          style={styles.controlBox}>
          <Icon size={40} icode={'\ue63e'} color={'rgb(1,0,39)'} />

          {/* <Text style={styles.controlText}>下一首</Text> */}
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 35,
  },
  cover: {
    width: 200,
    height: 200,
  },
  titleBox: {
    position: 'absolute',
    bottom: 200,
    left: 45,
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'rgb(1,0,39)',
  },
  progressBarContainer: {
    width: '80%',
    height: 2,
    backgroundColor: 'rgb(193,185,181)',
    marginBottom: 10,
    borderRadius: 20,
  },
  progressBar: {
    backgroundColor: 'rgb(26,26,26)',
    height: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  controlBox: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ccc',
    width: 50,
    height: 50,
  },
  play: {
    marginLeft: 30,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 0,
    width: 84,
    height: 82,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: '#ccc',
    // backgroundColor: 'blue',
  },
  controlText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginHorizontal: 10,
  },
});

export default Music;
