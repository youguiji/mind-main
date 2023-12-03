/*
 * @Description: 
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-07-09 15:34:24
 * @LastEditors: Austral
 * @LastEditTime: 2023-11-17 20:15:06
 */
/**
 * @format
 */

import {AppRegistry,StatusBar} from 'react-native';
import {name as appName} from './app.json';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react'; // redux-persist
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { store, persistor } from './src/store/configureStore';
import Navigation from './src/navigations/index';
import LoginNavigation from './src/navigations/modules/login';
import { useSelector,useDispatch,Provider } from 'react-redux';
import { NotificationProvider } from './src/components/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 导入AsyncStorage
import NetInfo from '@react-native-community/netinfo'; //检查网络状态
import { useNotification } from './src/components/Notification';

const Tab = createBottomTabNavigator();

const App= ()=> {
  const isLogin = useSelector(state=>state.login.isLogin);
  const [isConnect, setIsConnect] = useState(true);
  const notification = useNotification();
  const dispatch = useDispatch();

  useEffect(() => {
    //检查网络连接
    const Internet = NetInfo.addEventListener(state => {
      console.log('网络连接类型：', state.type);
      console.log('是否在线：', state.isConnected);
      setIsConnect(state.isConnected);

      if (isConnect) {
        const checkToken = async () => {
          try {
            const token = AsyncStorage.getItem('token');
            if (token) {
              dispatch(setUserToken(token));
            }
          } catch (error) {
            console.error('Error reading token feom AsyncStorage:',error);
          }
        }
        checkToken()
      } else {
        notification('请检查网络状态！');
      }
    })

    return () => {
      Internet();
    }

  }, [])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <NotificationProvider>
        <>
          <StatusBar 
            animated={true}
            translucent={true}
            backgroundColor="rgba(255, 255, 255, 0)"
            barStyle="dark-content" />
                {isLogin ? <Navigation /> : <LoginNavigation />}
        
        </>
        </NotificationProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const RootComponent = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
      <App />
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);


AppRegistry.registerComponent(appName, () => RootComponent);
