import React, { useRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ title, value, onChangeText, onBlur, placeholder }) => {
  const inputRef = useRef(null);

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 40,
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    height: 40,
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default CustomTextInput;
