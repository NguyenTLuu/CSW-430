import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screen/HomeScreen';
import TransactionScreen from '../screen/TransactionScreen';
import CustomerScreen from '../screen/CustomerScreen';
import SettingScreen from '../screen/SettingScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#d92b68',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Transaction') {
                        iconName = 'cash';
                    } else if (route.name === 'Customer') {
                        iconName = 'account';
                    } else if (route.name === 'Setting') {
                        iconName = 'cog';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#d92b68',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen name="Transaction" component={TransactionScreen} />
            <Tab.Screen name="Customer" component={CustomerScreen} />
            <Tab.Screen name="Setting" component={SettingScreen} />
        </Tab.Navigator>
    );
};

export default MainNavigator;
