/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';

const SettingScreen = ({ navigation }) => {
    const logout = async () => {
        await AsyncStorage.removeItem('@auth_token');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
            }}
        >
            <View style={{ paddingHorizontal: 10 }}>
                <Button
                    buttonColor="#d92b68"
                    textColor="white"
                    mode="contained"
                    onPress={() => logout()}
                >
                    Logout
                </Button>
            </View>
        </SafeAreaView>
    );
};
export default SettingScreen;
