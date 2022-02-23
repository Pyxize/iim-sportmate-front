import React, {useMemo, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Welcome from "../page/start/Welcome";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import TabNavigation from './Tab-navigator';
import ActivityAction from '../page/activity/ActivityAction';


const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
    /*
    const login = true
    const CurrentNavigator = useMemo(() => {
        if (login){
            return <Stack.Screen name="MainNavigator" component={MainNavigator} />
        }
    }, [])

     */
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={Welcome}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name='ActivityAction' component={ActivityAction}/>
                <Stack.Screen name="Home" component={TabNavigation}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


