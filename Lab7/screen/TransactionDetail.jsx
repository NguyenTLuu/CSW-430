/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { Text, View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TransactionDetail({ route, navigation }) {
    const { id } = route.params;
    const [data, setData] = useState(null);

    const discount = data?.priceBeforePromotion - data?.price;

    useEffect(() => {
        getTransactionDetail();
    }, [id]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Menu>
                    <MenuTrigger>
                        <Icon
                            name="ellipsis-vertical"
                            size={24}
                            color="white"
                            style={{ marginRight: 10 }}
                        />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => console.log('See details')}>
                            <Text style={{ padding: 10, fontSize: 16 }}>
                                See more details
                            </Text>
                        </MenuOption>
                        <MenuOption onSelect={handleConfirmDelete}>
                            <Text
                                style={{
                                    padding: 10,
                                    fontSize: 16,
                                    color: 'red',
                                }}
                            >
                                Cancel transaction
                            </Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            ),
        });
    }, [navigation, data]);

    const handleConfirmDelete = () => {
        Alert.alert(
            'Warning',
            'Are you sure you want to cancel this transaction? This will affect the customer transaction information', // Nội dung
            [
                {
                    text: 'CANCEL',
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: handleDeleteTransaction,
                },
            ],
        );
    };

    const handleDeleteTransaction = async () => {
        try {
            const token = await AsyncStorage.getItem('@auth_token');
            const response = await fetch(
                `https://kami-backend-5rs0.onrender.com/transactions/${id}`, //
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.ok) {
                // Xóa thành công thì quay lại màn hình trước
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Failed to cancel transaction');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Something went wrong');
        }
    };

    const formatDate = isoString => {
        const date = new Date(isoString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const getTransactionDetail = async () => {
        try {
            const repsone = await fetch(
                `https://kami-backend-5rs0.onrender.com/transactions/${id}`,
            );

            if (repsone.ok) {
                const detail = await repsone.json();
                setData(detail);
            } else {
                throw new Error('Fail to get Transaction detail');
            }
        } catch (err) {
            Alert.alert(err);
        }
    };

    if (!data) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" color="#d92b68" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>General information</Text>
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.line}>
                            <Text style={styles.inforHeader}>
                                Transaction Code
                            </Text>
                            <Text style={styles.infor}>{data.id}</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.inforHeader}>Customer</Text>
                            <Text style={styles.infor}>
                                {data.customer.name} - {data.customer.phone}
                            </Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.inforHeader}>
                                Creation time
                            </Text>
                            <Text style={styles.infor}>
                                {formatDate(data.createdAt)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Service list</Text>
                    <View style={{ marginTop: 10 }}>
                        {data.services.map((s, inx) => {
                            return (
                                <View key={inx} style={styles.line}>
                                    <View
                                        style={{
                                            justifyContent: 'space-between',
                                            flex: 1,
                                            flexDirection: 'row',
                                            paddingRight: 10,
                                        }}
                                    >
                                        <Text>{s.name}</Text>
                                        <Text>x {s.quantity}</Text>
                                    </View>
                                    <Text style={styles.infor}>
                                        {s.price.toLocaleString('vi-VN')} đ
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                    <View
                        style={{
                            borderTopWidth: 1,
                            borderBlockColor: '#d2d2d2ff',
                            marginTop: 10,
                            paddingTop: 10,
                        }}
                    >
                        <View style={styles.line}>
                            <Text style={styles.inforHeader}>Total</Text>
                            <Text style={styles.infor}>
                                {data.priceBeforePromotion.toLocaleString(
                                    'vi-VN',
                                )}{' '}
                                đ
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Cost</Text>
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.line}>
                            <Text style={styles.inforHeader}>
                                Amount of money
                            </Text>
                            <Text style={styles.infor}>
                                {data.priceBeforePromotion.toLocaleString(
                                    'vi-VN',
                                )}{' '}
                                đ
                            </Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.inforHeader}>Discount</Text>
                            <Text style={styles.infor}>
                                - {discount.toLocaleString('vi-VN')} đ
                            </Text>
                        </View>
                        <View
                            style={{
                                borderTopWidth: 1,
                                borderBlockColor: '#d2d2d2ff',
                                marginTop: 10,
                                paddingTop: 10,
                            }}
                        >
                            <View
                                style={[styles.line, { alignItems: 'center' }]}
                            >
                                <Text
                                    style={{ fontWeight: 'bold', fontSize: 20 }}
                                >
                                    Total payment
                                </Text>
                                <Text
                                    style={[
                                        styles.infor,
                                        { fontSize: 20, color: '#d92b68' },
                                    ]}
                                >
                                    {data.price.toLocaleString('vi-VN')} đ
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    infor: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right',
    },
    inforHeader: {
        fontWeight: 'bold',
        color: '#817e7eff',
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: '#d92b68',
        fontWeight: 'bold',
    },
    mainContainer: {
        paddingHorizontal: 20,
        flex: 1,
    },

    container: {
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10,
        padding: 15,
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: 10,
    },
});
