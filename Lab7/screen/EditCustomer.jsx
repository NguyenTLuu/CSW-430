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

export default function EditCustomer({ navigation, route }) {
    const { customerData } = route.params;
    console.log(customerData);
    const [name, setName] = useState(customerData.name);
    const [phone, setPhone] = useState(customerData.phone);

    const handleUpdateCustomer = async () => {
        if (!name || !phone) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('@auth_token');
            if (!token) {
                Alert.alert('Error', 'Token not found');
                return;
            }

            const response = await fetch(
                `https://kami-backend-5rs0.onrender.com/Customers/${customerData._id}`,
                {
                    method: 'PUT',
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
                Alert.alert('Success', 'Update successfully!', [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.goBack();
                        },
                    },
                ]);
            } else {
                const errorData = await response.json();
                console.log(response);
                console.log(errorData);
                Alert.alert('Error', errorData.message || 'Update failed');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
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
                    onPress={handleUpdateCustomer}
                >
                    <Text style={styles.buttonText}>Update</Text>
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
