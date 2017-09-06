import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}>
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 4,
    backgroundColor: "blue",
    padding:10
  },
  buttonText: {
    color: 'white',
    fontSize: 25
  }
});

export default Button;
