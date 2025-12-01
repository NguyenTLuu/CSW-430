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

const TransactionScreen = ({ navigation }) => {
    const [data, setData] = useState([]);

    useFocusEffect(
        useCallback(() => {
            getCusomer();
        }, []),
    );

    const getCusomer = async () => {
        try {
            const respone = await fetch(
                `https://kami-backend-5rs0.onrender.com/transactions`,
            );
            if (!respone.ok) {
                throw new Error('Fail to get customer data');
            }

            const transactionData = await respone.json();
            setData(transactionData);
        } catch (err) {
            Alert.alert(err);
        }
    };

    const formatDate = isoString => {
        const date = new Date(isoString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
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
                            <TouchableOpacity
                                style={styles.transactionContainer}
                                onPress={() =>
                                    navigation.navigate('TransactionDetail', {
                                        id: item._id,
                                    })
                                }
                            >
                                <View style={styles.information}>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {item.id} - {formatDate(item.createdAt)}
                                    </Text>
                                    {item.services.map((s, inx) => {
                                        return (
                                            <Text key={inx}>- {s.name}</Text>
                                        );
                                    })}
                                    <Text style={{ color: 'gray' }}>
                                        Customer: {item.customer.name}
                                    </Text>
                                </View>
                                <View style={styles.price}>
                                    <Text
                                        style={{
                                            color: '#d92b68',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {item.price.toLocaleString('vi-VN')} đ
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                <TouchableOpacity style={styles.addBtn}>
                    <Text style={styles.plusSign}>+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    transactionContainer: {
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
    price: {
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

export default TransactionScreen;
