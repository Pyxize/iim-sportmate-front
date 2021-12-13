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
import Form from './app/src/components/login/form/Form';
import Welcome from './app/src/page/start/Welcome'
import {Colors} from "./app/assets/styles/colors";
import {SafeAreaWrapped} from "./app/assets/styles/styles";
import {NativeRouter, Route, Routes} from "react-router-native";
import Register from "./app/src/page/login/register/Register";
import Signin from "./app/src/page/login/signin/Signin";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./app/src/page/home/Home";
import {RootNavigator} from "./app/src/navigation/RootNavigator";


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