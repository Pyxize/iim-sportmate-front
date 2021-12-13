import * as React from 'react';
import Ionicons from "@expo/vector-icons/Ionicons"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../page/home/Home';


const Tab = createBottomTabNavigator()

const TabNavigation = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Accueil') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Évènement') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Accueil" component={Homepage} />
        <Tab.Screen name="Évènement" component={Homepage} />
      </Tab.Navigator>
    )
}

export default TabNavigation