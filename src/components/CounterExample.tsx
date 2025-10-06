import { useAppDispatch, useAppSelector } from "@/src/hooks/use-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from "@/src/store/slices/counterSlice";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CounterExample() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Counter Example</Text>
      <Text style={styles.counter}>Count: {count}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(incrementByAmount(5))}
        >
          <Text style={styles.buttonText}>+5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={() => dispatch(reset())}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  counter: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#007AFF",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 60,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
