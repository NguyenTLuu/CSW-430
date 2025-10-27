import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 100,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    numberBtn: {
        flex: 1,
        backgroundColor: "#e8e7e7ff",
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        borderRadius: 35,
        margin: 5,
    },

    operBtn: {
        backgroundColor: "#bbacacff",
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        width: 70,
        borderRadius: 35,
        margin: 5,
    },

    inputText: {
        fontSize: 24,
        fontWeight: "semibold",
    },
    display: {
        fontSize: 35,
        fontWeight: "",
    },
});
