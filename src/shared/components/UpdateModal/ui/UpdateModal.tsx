import React from 'react';
import { Modal, View, Text, Button, Linking, Platform, StyleSheet } from 'react-native';

const UpdateModal = ({ visible }) => {
  const handleUpdatePress = () => {
    const storeUrl =
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/app/idYOUR_APP_ID'
        : 'https://play.google.com/store/apps/details?id=YOUR_APP_PACKAGE';

    Linking.openURL(storeUrl);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Вышла новая версия приложения</Text>
          <Button title="Обновить" onPress={handleUpdatePress} />
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
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default UpdateModal;
