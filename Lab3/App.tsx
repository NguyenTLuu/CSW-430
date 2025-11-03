import React from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MyBottomNavigation from "./Navigation/BottomNavigation";

function App() {
    const isDarkMode = useColorScheme() === "dark";
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar
                    barStyle={isDarkMode ? "light-content" : "dark-content"}
                    backgroundColor="transparent"
                    translucent={true}
                />

                <MyBottomNavigation />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default App;
