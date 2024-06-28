import {OrderDriver} from "src/types/order";
import React from 'react'
import {Image, StyleSheet, Text, View} from "react-native";

export type DriverBlockProps = {
  driver: OrderDriver
}

export const DriverBlock = ({driver}: DriverBlockProps) => {
  return (
    <View style={styles.container}>
      <Text>{driver.firstName} {driver.lastName}</Text>
      <View style={styles.block}>
        <Image style={styles.avatar} source={{uri: driver.avatar}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  block: {

  },
  avatar: {
    width: 100,
    height: 100,
  }
})
