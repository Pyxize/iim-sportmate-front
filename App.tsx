import React, {useState} from 'react';
import {
  SafeAreaView,
  //ScrollView,
  //SafeAreaView,
  //ScrollView,
  //StatusBar,
  StyleSheet,
  Text,
  View,
  //useColorScheme,
  //View,
} from 'react-native';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Colors} from "./app/assets/styles/colors";
import {RootNavigator} from "./app/src/navigation/RootNavigator";

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <RootNavigator/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: 'center',
    backgroundColor: Colors.secondary
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
