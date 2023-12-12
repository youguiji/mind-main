/*
 * @Description: 
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-12-08 10:59:26
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-11 13:08:53
 */

/**
 * @description: 获取当前时间2023-11-11 12:12:23
 * @return {string} formattedTime
 * @author: Austral
 */
export const currentTime = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedTime;
}

/**
 * @description: 
 * @param {*} timeStr
 * @return {*}
 * @author: Austral
 */
export const transforTime = (timeStr) => {
  // 创建一个 Date 对象
  const dateObj = new Date(timeStr);

  // 提取月份和日期
  const month = dateObj.getMonth() + 1; // getMonth() 返回的是 0 到 11，所以要加 1
  const day = dateObj.getDate();

  // 将月份转换为英文
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

  const monthName = monthNames[month - 1]; // 数组是从0开始的，所以要减 1

  // 返回一个包含月份和日期的对象
  return {
    month: monthName,
    day: day
  };
}

export const extractTimeFromDateTime = (dateTimeString) => {
  const dateObject = new Date(dateTimeString);
  const timeString = `${String(dateObject.getHours()).padStart(2, '0')}:${String(dateObject.getMinutes()).padStart(2, '0')}`;
  return timeString;
}