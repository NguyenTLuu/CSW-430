/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    Alert,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomerScreen = ({ navigation }) => {
    const [data, setData] = useState([]);

    useFocusEffect(
        useCallback(() => {
            getCusomer();
        }, []),
    );

    const getCusomer = async () => {
        try {
            const respone = await fetch(
                `https://kami-backend-5rs0.onrender.com/customers`,
            );
            if (!respone.ok) {
                throw new Error('Fail to get customer data');
            }

            const dataCustomer = await respone.json();
            setData(dataCustomer);
        } catch (err) {
            Alert.alert(err);
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'white',
            }}
        >
            <View>
                <FlatList
                    data={data}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.customerContainer}>
                                <View style={styles.information}>
                                    <Text>
                                        <Text style={styles.title}>
                                            Customer:{' '}
                                        </Text>
                                        {item.name}
                                    </Text>
                                    <Text>
                                        <Text style={styles.title}>
                                            Phone:{' '}
                                        </Text>
                                        {item.phone}
                                    </Text>
                                    <Text>
                                        <Text style={styles.title}>
                                            Total money:&nbsp;
                                        </Text>
                                        <Text style={{ color: '#d92b68' }}>
                                            {item.totalSpent} đ
                                        </Text>
                                    </Text>
                                </View>
                                <View style={styles.icon}>
                                    <Icon
                                        name="crown"
                                        color="#d92b68"
                                        size={25}
                                    />
                                    <Text
                                        style={{
                                            color: '#d92b68',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Guest
                                    </Text>
                                </View>
                            </View>
                        );
                    }}
                />
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => navigation.navigate('AddCustomer')}
                >
                    <Text style={styles.plusSign}>+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    customerContainer: {
        flexDirection: 'row',
        flex: 1,
        padding: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 7,
        borderRadius: 10,
    },
    information: {
        flexDirection: 'column',
        flex: 1,
    },
    title: {
        color: 'gray',
        fontWeight: 'bold',
    },
    icon: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addBtn: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#d92b68',
        borderRadius: 30,
    },
    plusSign: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        marginTop: -2,
    },
});

export default CustomerScreen;
