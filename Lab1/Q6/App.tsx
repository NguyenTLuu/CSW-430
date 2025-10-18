/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Alert } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import EmployeeInput from './components/EmployeeInput';
import EmployeeDisplay from './components/EmployeeDisplay';
import Sum from './components/Sum';
import SmallestNumber from './components/SmallestNumber';
import Hailstone from './components/Hailstone';

function App() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <AppContent />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

function AppContent() {
    const [employee, setEmployee] = useState(null);

    const handleUpdate = data => {
        setEmployee(data);
        if (!data.name && !data.age && !data.occupation) {
            Alert.alert('Please enter information!!');
        } else {
            Alert.alert('Updated successfully!!');
        }
    };

    return (
        <View style={styles.container}>
            <EmployeeInput onUpdate={handleUpdate} />
            <EmployeeDisplay employee={employee} />
            <Sum />
            <SmallestNumber />
            <Hailstone />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        padding: 15,
    },
});

export default App;
