/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-12 10:18:51
 * @LastEditors: Austral
 * @LastEditTime: 2023-10-13 18:12:33
 */
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { View, Text, Modal, Animated } from 'react-native';
import { color } from '../assets/color';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible]);

  const showNotification = message => {
    setMessage(message);
    setIsVisible(true);
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      {isVisible && <Notification message={message} />}
    </NotificationContext.Provider>
  );
};

const Notification = ({ message }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        hideNotification();
      }, 2000);
    });

    return () => {
      // Cleanup animation
      fadeAnim.setValue(0);
    };
  }, [fadeAnim]);

  const hideNotification = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal transparent visible={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View
          style={{
            backgroundColor: color.gray.light,
            padding: 10,
            borderRadius: 10,
            opacity: fadeAnim,
          }}>
          <Text>{message}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Notification;
