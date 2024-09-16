import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false); // Track the toggle state

  const handleToggle = () => {
    setIsToggled(!isToggled); // Toggle the state
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isToggled ? styles.on : styles.off]} // Style changes based on the state
        onPress={handleToggle}
      >
        <Text style={styles.buttonText}>{isToggled ? 'ON' : 'OFF'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  on: {
    backgroundColor: 'green', // Style for "ON" state
  },
  off: {
    backgroundColor: 'red', // Style for "OFF" state
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ToggleButton;
