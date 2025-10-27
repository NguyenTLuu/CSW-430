/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { TouchableOpacity, View, Text } from "react-native";
import {} from "react-native-safe-area-context";
import React, { useState } from "react";
import styles from "./styles";

function App() {
    const [displayValue, setDisplayValue] = useState("0");
    const [operator, setOperator] = useState(null);
    const [firstValue, setFirstValue] = useState("");

    const handleNumberInput = (num) => {
        if (displayValue === "0") {
            setDisplayValue(num.toString());
        } else {
            setDisplayValue(displayValue + num);
        }
    };

    const handleOperatorInput = (operator) => {
        setOperator(operator);
        setFirstValue(displayValue);
        setDisplayValue("");
    };

    const handleEqual = () => {
        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(displayValue);

        if (operator === "+") {
            setDisplayValue((num1 + num2).toString());
        } else if (operator === "-") {
            setDisplayValue((num1 - num2).toString());
        } else if (operator === "*") {
            setDisplayValue((num1 * num2).toString());
        } else if (operator === "/") {
            setDisplayValue((num1 / num2).toString());
        }

        setOperator(null);
        setFirstValue("");
    };

    const handleClear = () => {
        setDisplayValue("0");
        setOperator(null);
        setFirstValue("0");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.display}>{displayValue}</Text>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.numberBtn}
                    onPress={() => handleNumberInput(1)}
                >
                    <Text style={styles.inputText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.numberBtn}
                    onPress={() => handleNumberInput(2)}
                >
                    <Text style={styles.inputText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.numberBtn}
                    onPress={() => handleNumberInput(3)}
                >
                    <Text style={styles.inputText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.operBtn}
                    onPress={() => handleOperatorInput("+")}
                >
                    <Text style={styles.inputText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.numberBtn}
                    onPress={() => handleNumberInput(4)}
                >
                    <Text style={styles.inputText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.numberBtn}
                    onPress={() => handleNumberInput(5)}
                >
                    <Text style={styles.inputText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.numberBtn}
                    onPress={() => handleNumberInput(6)}
                >
                    <Text style={styles.inputText}>6</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.operBtn}
                    onPress={() => handleOperatorInput("-")}
                >
                    <Text style={styles.inputText}>-</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.numberBtn}
                    onPress={() => handleNumberInput(7)}
                >
                    <Text style={styles.inputText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.numberBtn}
                    onPress={() => handleNumberInput(8)}
                >
                    <Text style={styles.inputText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.numberBtn}
                    onPress={() => handleNumberInput(9)}
                >
                    <Text style={styles.inputText}>9</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.operBtn}
                    onPress={() => handleOperatorInput("*")}
                >
                    <Text style={styles.inputText}>*</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.numberBtn}
                    onPress={() => handleNumberInput(0)}
                >
                    <Text style={styles.inputText}>0</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                        flex: 1,
                        backgroundColor: "#bdb5b0ff",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 70,
                        borderRadius: 35,
                        margin: 5,
                    }}
                    onPress={() => handleEqual()}
                >
                    <Text style={styles.inputText}>=</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.operBtn}
                    onPress={() => handleOperatorInput("/")}
                >
                    <Text style={styles.inputText}>/</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                        flex: 1,
                        backgroundColor: "#e0ac8bff",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 70,
                        borderRadius: 35,
                        margin: 5,
                    }}
                    onPress={() => handleClear()}
                >
                    <Text>C</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default App;
