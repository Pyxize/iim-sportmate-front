
import React, {useState} from 'react';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Signin from "../page/login/signin/Signin";

const Stack = createNativeStackNavigator();

export const LandingNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Signin" component={Signin} />
        </Stack.Navigator>
    )
}



