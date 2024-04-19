/*
 * @Description: 弹窗
 * @Version:
 * @Autor: Austral
 * @Date: 2023-12-13 04:35:19
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-13 05:20:25
 */
import React,{useState} from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import Button from './Button';
const ModalComponent = ({ visible, title, onClose, onConfirm, parameter }) => {
  const [modalParameter, setModalParameter] = useState(parameter);
  const handleConfirm = () => {
    onConfirm(modalParameter);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="取消"
              style={{ paddingHorizontal: 20 }}
              onPress={onClose}
            />
            <Button
              title="确定"
              style={{ paddingHorizontal: 20 }}
              onPress={handleConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '60%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
  },
});

export default ModalComponent;
