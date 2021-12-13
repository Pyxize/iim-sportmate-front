<<<<<<< HEAD
import React, {useState} from 'react';
=======
import * as React from 'react';
>>>>>>> fb6bfcf1 (Update .gitignore and add navbar)
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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Form from './app/src/components/login/form/Form';
import Welcome from './app/src/page/start/Welcome'
import {Colors} from "./app/assets/styles/colors";
import {SafeAreaWrapped} from "./app/assets/styles/styles";
import {NativeRouter, Route, Routes} from "react-router-native";
import Register from "./app/src/page/login/register/Register";
import Signin from "./app/src/page/login/signin/Signin";
<<<<<<< HEAD
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./app/src/page/home/Home";
import {RootNavigator} from "./app/src/navigation/RootNavigator";

=======
import Home from "./app/src/page/home/Home"
import TabNavigator from './app/src/components/navigation/tab-navigator';
>>>>>>> fb6bfcf1 (Update .gitignore and add navbar)

/*
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

*/

const Stack = createNativeStackNavigator();

const App = () => {
<<<<<<< HEAD


  return(
    <RootNavigator/>
  )
}


=======
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Home" component={TabNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};
>>>>>>> fb6bfcf1 (Update .gitignore and add navbar)


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

/*
 <NavigationContainer>
   <Stack.Navigator>
       <Stack.Screen name="Welcome" component={Welcome} options={{title: 'Sportmate'}} />
       <Stack.Screen name="Signin" component={Signin} options={{title: 'Connexion'}} />
       <Stack.Screen name="Register" component={Register} options={{title: 'Inscription'}} />
       <Stack.Screen name="Home" component={Home} options={{title: 'Accueil'}} />
   </Stack.Navigator>
 </NavigationContainer>

  */
/*
<NavigationContainer>
  {isLoading ? ()}
 <AuthStackScreen />
</NavigationContainer>
*/