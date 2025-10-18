import { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function Hailstone() {
    const [sequence, setSequence] = useState([]);
    const [value, setValue] = useState('');

    return (
        <>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a positive number"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={text => {
                        const filtered = text.replace(/[^0-9]/g, '');
                        setValue(filtered);
                        var n = filtered;
                        var newSequence = [];
                        while (n > 0 && n != 1) {
                            newSequence.push(n);
                            if (n % 2 == 0) {
                                n /= 2;
                            } else n = n * 3 + 1;
                        }
                        newSequence.push(1);
                        setSequence(newSequence);
                    }}
                />
            </View>
            <Text>
                <Text style={{ fontWeight: 'bold' }}>Hailstone sequence:</Text>{' '}
                {sequence.join(', ')}
            </Text>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 12,
        borderRadius: 8,
    },
});
