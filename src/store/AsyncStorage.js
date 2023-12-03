/*
 * @Description: 本地存储
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-10-20 16:30:04
 * @LastEditors: Austral
 * @LastEditTime: 2023-10-20 16:46:02
 */

import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * @description: 移除数据
 * @param {String} key 标识符
 * @return {Promise} Promise对象，表示异步操作的结果
 * @author: Austral
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed successfully');
  } catch (e) {
    console.error('Error removing data: ', e);
  }
}

/**
 * @description: 存储数据
 * @param {String} key 标识符
 * @return {Promise} Promise对象，表示异步操作的结果
 * @author: Austral
 */
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data stored successfully');
    return true;
  } catch (e) {
    console.error('Error storing data: ', e);
  }
}

/**
 * @description: 存储数据
 * @param {*} key 标识符
 * @return {*}
 * @author: Austral
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting data: ', error);
    return null;
  }
};
