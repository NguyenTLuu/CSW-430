import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
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

const Stack = createNativeStackNavigator();

function App() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <PaperProvider>
            <MenuProvider>
                <SafeAreaProvider>
                    <StatusBar
                        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    />

                    <NavigationContainer>
                        <Stack.Navigator
                            initialRouteName="Login"
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
