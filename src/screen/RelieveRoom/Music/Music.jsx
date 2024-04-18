import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import SoundPlayer from 'react-native-sound';
import { color } from '../../../assets/color';

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false); // 控制播放状态
  const [progress, setProgress] = useState(0); // 当前播放进度
  const [duration, setDuration] = useState(160); // 音频总时长
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // 当前播放歌曲索引
  const soundObject = useRef(null); // 保存音频播放对象的引用

  // 播放列表
  const playlist = [
    {
      title: 'Magnetic',
      url: 'https://webfs.hw.kugou.com/202403280927/16ed7273428239507429a5c88a4dd8a6/part/0/960151/KGTX/CLTX001/clip_20dce540ec786b564172ee43ea2fdbf9.mp3',
      cover: 'https://p3fx.kgimg.com/stdmusic/240/20240325/20240325110302667414.jpg',
    },
    {
      title: '小美满',
      url: 'https://webfs.hw.kugou.com/202403280930/1f38f028a486ef0b27fb32a52125739f/KGTX/CLTX001/04a21db1ab3c8e0d1d8f51f11bdb03a1.mp3',
      cover: 'https://imgessl.kugou.com/stdmusic/20240205/20240205142001926246.jpg',
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
          (error) => {
            if (error) {
              console.error('加载音频失败', error);
            } else {
              // 设置音频对象的循环播放模式
              soundObject.current = sound;
              soundObject.current.setNumberOfLoops(-1); // 无限循环播放
              // 获取音频文件时长
              soundObject.current.getDuration((duration) => {
                setDuration(duration);
              });
            }
          }
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
        soundObject.current.pause();
      } else {
        soundObject.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
 // 播放上一首歌曲
const prevTrack = () => {
  const newIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  setCurrentTrackIndex(newIndex);
  soundObject.current.pause();
  soundObject.current.release();
  const newSound = new SoundPlayer(playlist[newIndex].url, SoundPlayer.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('加载音频失败', error);
    } else {
      soundObject.current = newSound;
      soundObject.current.setNumberOfLoops(-1);
      soundObject.current.play();
      setIsPlaying(true); // 设置为播放状态
      soundObject.current.getDuration((duration) => {
        setDuration(duration);
      });
    }
  });
};

// 播放下一首歌曲
const nextTrack = () => {
  const nextIndex = (currentTrackIndex + 1) % playlist.length;
  setCurrentTrackIndex(nextIndex);
  if (isPlaying) { // 如果当前是播放状态，先暂停当前歌曲
    setIsPlaying(false);
    soundObject.current.stop();
  }
  soundObject.current.release(); // 释放当前歌曲资源
  const newSound = new SoundPlayer(playlist[nextIndex].url, SoundPlayer.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('加载音频失败', error);
    } else {
      soundObject.current = newSound;
      soundObject.current.setNumberOfLoops(-1);
      soundObject.current.play();
      setIsPlaying(true); // 设置为播放状态
      soundObject.current.getDuration((duration) => {
        setDuration(duration);
      });
    }
  });
};


  // 监听播放进度变化
  useEffect(() => {
    const interval = setInterval(() => {
      // 确保音频对象存在
      if (soundObject.current) {
        soundObject.current.getCurrentTime((seconds) => {
          setProgress((seconds / duration) * 100);
        });
      }
    }, 1000);

    // 清除定时器
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // 将秒数转换为分钟:秒的格式
  const formatTime = (seconds) => {
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
    <View style={styles.container}>
      {/* 音频封面图 */}
      <Image source={{ uri: playlist[currentTrackIndex].cover }} style={styles.cover} />
      {/* 音频标题 */}
      <Text style={styles.title}>{playlist[currentTrackIndex].title}</Text>
      {/* 播放进度条 */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      {/* 播放时长 */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(progress * duration / 100)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
      {/* 播放控制按钮 */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={prevTrack}>
          <Text style={styles.controlText}>上一首</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
          <Text style={styles.controlText}>{isPlaying ? '暂停' : '播放'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextTrack}>
          <Text style={styles.controlText}>下一首</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  progressBarContainer: {
    width: '80%',
    height: 5,
    backgroundColor: color.purple.light,
    marginBottom: 10,
    borderRadius: 20,
  },
  progressBar: {
    backgroundColor: '#FFFFFF',
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
  },
  controlText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginHorizontal: 10,
  },
});

export default Music;
