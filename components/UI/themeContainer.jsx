import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const ThemeContainer = ({ children, bgColor }) => {
  const bgStyle = { backgroundColor: bgColor || '#f3f4f6' };

  return (
    <SafeAreaView style={bgStyle}>
      <View style={[bgStyle, styles.container]}>
          {children}
      </View>
      <StatusBar backgroundColor="#F42F47" style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
   // paddingHorizontal: 16, 
    width: '100%',
    height: '100%',
  },
});

export default ThemeContainer;
