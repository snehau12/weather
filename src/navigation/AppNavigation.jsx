import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Today from '../screens/Today';
import Days from '../screens/Days';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="Today" component={Today} />
                <Stack.Screen name="Days" component={Days} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
