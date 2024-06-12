// PinCodeInput.tsx
import React, { Dispatch, SetStateAction } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  Dimensions,
} from "react-native";
import { colors } from "src/shared/style";
const { width, height } = Dimensions.get("window");

interface PincodeInputProps {
  onPinEntered?: (pin: string) => void;
  onTextChange?: Dispatch<SetStateAction<string>>;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  cellStyle?: StyleProp<ViewStyle>;
  cellStyleFocused?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  codeLength?: number;
  cellSpacing?: number;
  value?: string;
  error?: boolean;
}

export const PincodeInput: React.FC<PincodeInputProps> = ({
  onPinEntered,
  onTextChange,
  containerStyle,
  inputStyle,
  cellStyle,
  cellStyleFocused,
  textStyle,
  codeLength = 4,
  cellSpacing = 13,
  value = "",
  error = false
}) => {
  const handlePinChange = (input: string) => {
    // Ensure input is numeric and limit to codeLength characters
    const newPin = input.replace(/[^0-9]/g, "").slice(0, codeLength);

    // If the PIN is complete, trigger the onPinEntered callback
    if (onPinEntered && newPin.length === codeLength) {
      onPinEntered(newPin);
    }

    // Call the onTextChange callback if provided
    if (onTextChange) {
      onTextChange(newPin);
    }
  };

  // Calculate adaptive cell size based on screen dimensions
  const cellSize = Math.min(
    (width - cellSpacing * (codeLength - 1)) / codeLength,
    height * 0.1
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.pinContainer}>
        {[...Array(codeLength)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.pinCell,
              cellStyle,
              value.length === index &&
                value.length < codeLength &&
                cellStyleFocused,
              { width: cellSize, height: cellSize, borderColor: error ? colors.error : colors.primary },
            ]}
          >
            <Text style={[styles.pinText, textStyle]}>{value[index]}</Text>
          </View>
        ))}
      </View>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={handlePinChange}
        keyboardType="numeric"
        maxLength={codeLength}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  pinCell: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  pinText: {
    fontSize: 52,
    paddingBottom: "5%",
  },
  input: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    opacity: 0,
  },
});
