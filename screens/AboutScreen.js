import React from "react";
import { WebView } from 'react-native-webview';

export function AboutScreen() {
  return (
    <WebView
    
      source={{ uri: "https://github.com/facebook/react-native" }}
      style={{ marginTop: 20 }}
    />
  );
}

