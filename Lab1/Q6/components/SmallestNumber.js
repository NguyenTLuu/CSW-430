import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';

export default function SmallestNumber() {
    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(0);
    const [thirdNumber, setThirdNumber] = useState(0);
    const [smallest, setSmallest] = useState(0);

    const handlePress = () => {
        setSmallest(Math.min(firstNumber, secondNumber, thirdNumber));
    };
    return (
        <>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="1st number"
                    keyboardType="numeric"
                    value={firstNumber}
                    onChangeText={text => {
                        const filtered = text.replace(/[^0-9]/g, '');
                        setFirstNumber(filtered);
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="2nd number"
                    keyboardType="numeric"
                    value={secondNumber}
                    onChangeText={text => {
                        const filtered = text.replace(/[^0-9]/g, '');
                        setSecondNumber(filtered);
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="3rd number"
                    keyboardType="numeric"
                    value={thirdNumber}
                    onChangeText={text => {
                        const filtered = text.replace(/[^0-9]/g, '');
                        setThirdNumber(filtered);
                    }}
                />
            </View>
            <Button title="Find the smallest" color="blue" onPress={handlePress} />
            <Text style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>The smallest number:</Text> {smallest}
            </Text>
        </>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 12,
        borderRadius: 8,
        width: '30%',
    },
});
