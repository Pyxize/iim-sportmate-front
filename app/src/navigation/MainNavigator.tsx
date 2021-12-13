import React, {useState} from 'react';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../page/home/Home";

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}


