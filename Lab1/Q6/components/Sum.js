import { View, TextInput, Button, Text, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';

export default function Sum() {
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(0);
    const [sum, setSum] = useState(0);
    const [value, setValue] = useState('');
    const [isTwo, setIsTwo] = useState(false);

    const handlePress = () => {
        setSum(first + last);
    };
    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Enter a number"
                keyboardType="numeric"
                value={value}
                onChangeText={text => {
                    const filtered = text.replace(/[^0-9]/g, '');
                    setValue(filtered);
                    if (filtered.length >= 2) {
                        setIsTwo(true);
                        setFirst(Number(filtered[0]));
                        setLast(Number(filtered[filtered.length - 1]));
                    } else setIsTwo(false);
                }}
            />
            <Pressable onPress={handlePress} disabled={!isTwo} style={styles.btn}>
                <Text style={styles.btnText}>Calculate</Text>
            </Pressable>
            <Text style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Sum of last and first digit:</Text> {sum}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#3d8be3',
    },
    btnText: {
        color: 'white',
        padding: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 12,
        borderRadius: 8,
    },
});
