import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const WebViewAdmin = () => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: "https://blood-link-web-lovat.vercel.app/" }} />
      {/* <WebView source={{ uri: "http://192.168.100.20:3000/" }} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewAdmin;
