import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function EmployeeInput({ onUpdate }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [occupation, setOccupation] = useState('');

    const handlePress = () => {
        onUpdate({ name, age, occupation });
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />
            <TextInput
                style={styles.input}
                placeholder="Occupation"
                value={occupation}
                onChangeText={setOccupation}
            />
            <Button title="Update" onPress={handlePress} style={styles.btn} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 15,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 12,
        borderRadius: 8,
    },
    btn: {
        borderRadius: 30,
    },
});
