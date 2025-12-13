/* eslint-disable react-native/no-inline-styles */
import {
    StatusBar,
    StyleSheet,
    useColorScheme,
    ActivityIndicator,
    View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screen/LoginScreen';
import MainNavigator from './navigation/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import ServiceDetailScreen from './screen/ServiceDetailScreen';
import AddServiceScreen from './screen/AddServiceScreen';
import { MenuProvider } from 'react-native-popup-menu';
import UpdateServiceScreen from './screen/UpdateServiceScreen';
import AddCustomer from './screen/AddCustomer';
import TransactionDetail from './screen/TransactionDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import CustomerDetail from './screen/CustomerDetail';
import EditCustomer from './screen/EditCustomer';
import AddTransaction from './screen/AddTransaction';

const Stack = createNativeStackNavigator();

function App() {
    const isDarkMode = useColorScheme() === 'dark';

    const [initialRoute, setInitialRoute] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('@auth_token');

                if (token) {
                    setInitialRoute('Main');
                } else {
                    setInitialRoute('Login');
                }
            } catch (error) {
                console.log('Lỗi kiểm tra token:', error);
                setInitialRoute('Login');
            } finally {
                setIsLoading(false);
            }
        };

        checkToken();
    }, []);

    if (isLoading) {
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
        <PaperProvider>
            <MenuProvider>
                <SafeAreaProvider>
                    <StatusBar
                        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    />

                    <NavigationContainer>
                        <Stack.Navigator
                            initialRouteName={initialRoute}
                            screenOptions={{
                                headerStyle: {
                                    backgroundColor: '#d92b68',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }}
                        >
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Main"
                                component={MainNavigator}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="AddService"
                                component={AddServiceScreen}
                                options={{ title: 'Add Service' }}
                            />
                            <Stack.Screen
                                name="ServiceDetail"
                                component={ServiceDetailScreen}
                                options={{ title: 'Service Detail' }}
                            />
                            <Stack.Screen
                                name="UpdateService"
                                component={UpdateServiceScreen}
                                options={{ title: 'Update service' }}
                            />
                            <Stack.Screen
                                name="AddCustomer"
                                component={AddCustomer}
                                options={{ title: 'Add customer' }}
                            />
                            <Stack.Screen
                                name="TransactionDetail"
                                component={TransactionDetail}
                                options={{ title: 'Transaction Detail' }}
                            />
                            <Stack.Screen
                                name="CustomerDetail"
                                component={CustomerDetail}
                                options={{ title: 'Customer Detail' }}
                            />
                            <Stack.Screen
                                name="EditCustomer"
                                component={EditCustomer}
                                options={{ title: 'Edit Customer' }}
                            />
                            <Stack.Screen
                                name="AddTransaction"
                                component={AddTransaction}
                                options={{ title: 'Add Transaction' }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </MenuProvider>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
});

export default App;
