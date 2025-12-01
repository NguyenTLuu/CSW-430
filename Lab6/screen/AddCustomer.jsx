/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddCustomer() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleAddService = async () => {
        if (!name || !phone) {
            Alert.alert('Error', 'Please fill both fields');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('@auth_token');
            if (!token) {
                Alert.alert('Error', 'Can find login token');
                return;
            }

            const response = await fetch(
                'https://kami-backend-5rs0.onrender.com/customers',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: name,
                        phone: phone,
                    }),
                },
            );
            if (response.ok) {
                Alert.alert('Success', 'A new customer has been added!!');
                setName('');
                setPhone('');
            } else {
                const errorData = await response.json();
                Alert.alert(
                    'Error',
                    errorData.message || 'Fail to add a new customer',
                );
            }
        } catch (err) {
            Alert.alert('Network error', err.message);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}
            >
                <Text style={styles.label}>Customer name *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Input your customer's name"
                    value={name}
                    placeholderTextColor="#666"
                    onChangeText={setName}
                />

                <Text style={styles.label}>Phone *</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholderTextColor="#666"
                    placeholder="Input phone number"
                    keyboardType="numeric"
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddService}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
        fontSize: 16,
    },
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#d92b68',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
