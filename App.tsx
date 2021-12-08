import React from 'react';
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
import Form from './app/components/form/Form';
import Welcome from './app/components/start/Welcome'
import {Colors} from "./app/assets/styles/colors";
import {SafeAreaWrapped} from "./app/assets/styles/styles";
import {NativeRouter, Route, Routes, Switch} from "react-router-native";
import Register from "./app/components/register/Register";
import Signin from "./app/components/signin/Signin";

/*
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

*/

const App = () => {
  return (
      <NativeRouter>
          <Routes>
            <Route exact path="/" element={<Welcome/>} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/signin" element={<Signin />} />
          </Routes>
      </NativeRouter>
  );
};

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
