import React, {useState} from 'react';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../page/home/Home";
import ActivityAction from '../page/activity/ActivityAction';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name='ActivityAction' component={ActivityAction}/>
        </Stack.Navigator>
    )
}


