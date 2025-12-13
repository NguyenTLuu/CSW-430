/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useNavigation } from '@react-navigation/native';

export default function AddTransaction() {
    const navigation = useNavigation();

    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [custRes, servRes, userRes] = await Promise.all([
                    fetch('https://kami-backend-5rs0.onrender.com/customers'),
                    fetch('https://kami-backend-5rs0.onrender.com/services'),
                    fetch('https://kami-backend-5rs0.onrender.com/users'),
                ]);

                const custData = await custRes.json();
                const servData = await servRes.json();
                const userData = await userRes.json();

                setCustomers(custData);
                setServices(servData);
                setUsers(userData);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Could not fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleToggleService = (service, isChecked) => {
        if (isChecked) {
            setSelectedServices([
                ...selectedServices,
                {
                    _id: service._id,
                    price: service.price,
                    quantity: 1,
                    userId: users.length > 0 ? users[0]._id : null,
                },
            ]);
        } else {
            setSelectedServices(
                selectedServices.filter(item => item._id !== service._id),
            );
        }
    };

    const updateQuantity = (serviceId, delta) => {
        const updated = selectedServices.map(item => {
            if (item._id === serviceId) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        setSelectedServices(updated);
    };

    const updateExecutor = (serviceId, userId) => {
        const updated = selectedServices.map(item => {
            if (item._id === serviceId) return { ...item, userId: userId };
            return item;
        });
        setSelectedServices(updated);
    };

    const totalPrice = selectedServices.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const handleSubmit = async () => {
        if (!selectedCustomer) {
            Alert.alert('Error', 'Please select a customer');
            return;
        }
        if (selectedServices.length === 0) {
            Alert.alert('Error', 'Please select at least one service');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('@auth_token');
            const payload = {
                customerId: selectedCustomer,
                services: selectedServices.map(s => ({
                    _id: s._id,
                    quantity: s.quantity,
                    userId: s.userId,
                })),
            };

            const response = await fetch(
                'https://kami-backend-5rs0.onrender.com/transactions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                },
            );

            if (response.ok) {
                Alert.alert('Success', 'Transaction added successfully');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Failed to add transaction');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong');
        }
    };

    if (loading)
        return (
            <ActivityIndicator
                size="large"
                color="#d92b68"
                style={{ marginTop: 50 }}
            />
        );
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.label}>Customer *</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={customers}
                    maxHeight={300}
                    labelField="name"
                    valueField="_id"
                    placeholder="Select customer"
                    value={selectedCustomer}
                    onChange={item => {
                        setSelectedCustomer(item._id);
                    }}
                />

                <Text style={[styles.label, { marginTop: 20 }]}>Services</Text>
                {services.map(service => {
                    const isSelected = selectedServices.find(
                        s => s._id === service._id,
                    );

                    return (
                        <View key={service._id} style={styles.serviceItem}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="#d92b68"
                                unfillColor="#FFFFFF"
                                text={service.name}
                                iconStyle={{ borderColor: '#d92b68' }}
                                innerIconStyle={{ borderWidth: 2 }}
                                textStyle={{
                                    textDecorationLine: 'none',
                                    color: '#333',
                                    fontSize: 16,
                                }}
                                onPress={isChecked =>
                                    handleToggleService(service, isChecked)
                                }
                            />

                            {isSelected && (
                                <View style={styles.detailContainer}>
                                    <View style={styles.quantityRow}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                updateQuantity(service._id, -1)
                                            }
                                            style={styles.qtyBtn}
                                        >
                                            <Text style={styles.qtyText}>
                                                -
                                            </Text>
                                        </TouchableOpacity>

                                        <Text
                                            style={{
                                                marginHorizontal: 15,
                                                fontSize: 16,
                                            }}
                                        >
                                            {isSelected.quantity}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() =>
                                                updateQuantity(service._id, 1)
                                            }
                                            style={styles.qtyBtn}
                                        >
                                            <Text style={styles.qtyText}>
                                                +
                                            </Text>
                                        </TouchableOpacity>

                                        <Dropdown
                                            style={styles.executorDropdown}
                                            selectedTextStyle={{ fontSize: 12 }}
                                            data={users}
                                            labelField="name"
                                            valueField="_id"
                                            placeholder="Executor"
                                            value={isSelected.userId}
                                            onChange={item =>
                                                updateExecutor(
                                                    service._id,
                                                    item._id,
                                                )
                                            }
                                        />
                                    </View>
                                    <Text style={styles.priceText}>
                                        Price: {service.price.toLocaleString()}{' '}
                                        ₫
                                    </Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.summaryBtn}
                    onPress={handleSubmit}
                >
                    <Text style={styles.summaryText}>
                        See summary: ({totalPrice.toLocaleString()} ₫)
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#999',
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    serviceItem: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 10,
    },
    detailContainer: {
        marginTop: 10,
        marginLeft: 35,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    qtyBtn: {
        width: 30,
        height: 30,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    qtyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    executorDropdown: {
        width: 120,
        height: 30,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5,
        marginLeft: 20,
    },
    priceText: {
        color: '#d92b68',
        fontWeight: 'bold',
        marginTop: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        elevation: 5,
    },
    summaryBtn: {
        backgroundColor: '#d92b68',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    summaryText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
