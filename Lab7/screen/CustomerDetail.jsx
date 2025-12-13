/* eslint-disable react-native/no-inline-styles */
import {
    Text,
    View,
    ActivityIndicator,
    Alert,
    StyleSheet,
    FlatList,
} from 'react-native';
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

export default function CustomerDetail({ route, navigation }) {
    const [data, setData] = useState(null);
    const { id } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            // eslint-disable-next-line react/no-unstable-nested-components
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
                        <MenuOption onSelect={() => handleEdit()}>
                            <Text style={{ padding: 10, fontSize: 16 }}>
                                Edit
                            </Text>
                        </MenuOption>
                        <MenuOption onSelect={() => handleDelete()}>
                            <Text style={{ padding: 10, fontSize: 16 }}>
                                Delete
                            </Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            ),
        });
    }, [navigation, data]);

    useEffect(() => {
        getCustomerDetail();
    }, [id]);

    const handleDelete = async () => {
        const token = await AsyncStorage.getItem('@auth_token');
        Alert.alert(
            'Alert',
            'Are you sure you want to remove this client? This will not be possible to return',
            [
                { text: 'CANCEL', style: 'cancel' },
                {
                    text: 'DELETE',
                    onPress: async () => {
                        try {
                            await fetch(
                                `https://kami-backend-5rs0.onrender.com/customers/${data._id}`,
                                {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`,
                                    },
                                },
                            );
                            navigation.goBack();
                        } catch (e) {
                            console.log(e);
                        }
                    },
                },
            ],
        );
    };

    const handleEdit = () => {
        navigation.navigate('EditCustomer', { customerData: data });
    };

    const getCustomerDetail = async () => {
        try {
            const repsone = await fetch(
                `https://kami-backend-5rs0.onrender.com/Customers/${id}`,
            );

            if (repsone.ok) {
                const detail = await repsone.json();
                setData(detail);
            } else {
                throw new Error('Fail to get Customer detail');
            }
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
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
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
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
                paddingHorizontal: 20,
            }}
        >
            <View>
                <View style={styles.container}>
                    <Text style={styles.title}>General information</Text>
                    <View style={styles.line}>
                        <Text style={styles.heading}>Name: </Text>
                        <Text>{data.name}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.heading}>Phone: </Text>
                        <Text>{data.phone}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.heading}>Total spent: </Text>
                        <Text>{data.totalSpent}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.heading}>Time: </Text>
                        <Text>{formatDate(data.createdAt)}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.heading}>Last Updated: </Text>
                        <Text>{formatDate(data.updatedAt)}</Text>
                    </View>
                </View>
                {console.log(data.transactions)}
                <View style={styles.container}>
                    <Text style={styles.title}>Transaction History</Text>
                    <FlatList
                        data={data.transactions}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.container}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading}>
                                        {item.id} {' - '}
                                    </Text>
                                    <Text style={styles.heading}>
                                        {formatDate(item.customer.createdAt)}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: 10,
                                    }}
                                >
                                    <View>
                                        {item.services.map(s => {
                                            return <Text>- {s.name}</Text>;
                                        })}
                                    </View>
                                    <View>
                                        <Text style={styles.price}>
                                            {item.price} đ
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#d92b68',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    line: {
        flexDirection: 'row',
    },
    heading: {
        fontWeight: 'bold',
    },
    container: {
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10,
        padding: 15,
    },
    price: {
        color: '#d92b68',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
