/*
 * @Description: 修改生日
 * @Version:
 * @Autor: Austral
 * @Date: 2023-09-23 13:15:46
 * @LastEditors: Austral
 * @LastEditTime: 2023-11-26 20:05:08
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Platform,
  DatePickerIOS,
  StyleSheet,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TitleHeader from '../../../../../components/TitleHeader';
import { changeUserInfo } from '../../../../../network/modules/user';

const MeSettingChangeBirth = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    getUserInfo().then(res => {
      console.log(res);
    });
    return () => {
      cleanup;
    };
  }, [input]);

  const onDateChange = (event, selected) => {
    if (event.type === 'dismissed') {
      // DatePicker dismissed, do nothing
      return;
    }
    console.log(selected);
    setSelectedDate(selected || selectedDate);
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <TitleHeader
        title="修改出生日期"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{ marginTop: 40 }}>
        {Platform.OS === 'ios' ? (
          <DatePickerIOS
            date={selectedDate}
            onDateChange={date => setSelectedDate(date)}
            mode="date"
          />
        ) : (
          <Pressable style={styles.box} onPress={() => setShowDatePicker(true)}>
            <Text>出生日期</Text>
            <Text style={styles.selectedDateText}>
              {selectedDate.toDateString()}
            </Text>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedDateText: {
    fontSize: 18,
    marginVertical: 20,
  },
});

export default MeSettingChangeBirth;
