import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmployeeDisplay({ employee }) {
    if (!employee) {
        return <Text style={{ marginTop: 10, marginBottom: 10 }}>Nothing to show!!</Text>;
    }
    return (
        <View>
            <Text style={styles.lable}>Employee Information</Text>
            <Text>
                <Text style={{ fontWeight: 'bold' }}>Full Name:</Text> {employee.name}
            </Text>
            <Text>
                <Text style={{ fontWeight: 'bold' }}>Age:</Text> {employee.age}
            </Text>
            <Text>
                <Text style={{ fontWeight: 'bold' }}>Occupation:</Text> {employee.occupation}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    lable: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
