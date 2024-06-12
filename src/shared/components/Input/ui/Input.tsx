import React from "react";
import { 
    KeyboardTypeOptions, 
    StyleSheet, 
    View, 
    TextInput, 
    TouchableOpacity
} from "react-native"
import { colors } from "src/shared/style";

interface IInputProps {
    value: string;
    onChange: (text: string) => void;
    placeholder?: string;
    projectType?: string;
    disabled?: boolean;
    leftIcon?: any;
    rightIcon?: any;
    onRightIconPress?: () => void;
    keyboardType?: KeyboardTypeOptions;
    multiline?: boolean;
    textAlign?: "center" | "left" | "right",
    textAlignVertical?: "auto" | "top" | "center" | "bottom";
    numberOfLines?: number;
}

export const Input: React.FC<IInputProps> = ({ 
    leftIcon, 
    rightIcon, 
    value, 
    onChange, 
    disabled=false, 
    placeholder="", 
    projectType="default", 
    onRightIconPress,
    keyboardType="default",
    textAlign = "left",
    multiline = false,
    textAlignVertical = "auto",
    numberOfLines = 1
}) => {
    const containerStyleKey = projectType as keyof typeof containerStyles;
    const inputStyleKey = projectType as keyof typeof inputStyles;

    return (
        <View style={[containerStyles[containerStyleKey], containerStyles.initial]}>
            {leftIcon}
            <TextInput 
                value={value} 
                onChangeText={onChange} 
                placeholder={placeholder}
                style={[inputStyles[inputStyleKey], inputStyles.initial]}
                editable={!disabled}
                placeholderTextColor={colors.opacity}
                keyboardType={keyboardType}
                textAlign={textAlign}
                multiline={multiline}
                textAlignVertical={textAlignVertical}
                numberOfLines={numberOfLines}/>
            {
                onRightIconPress
                ? <TouchableOpacity onPress={onRightIconPress}>{rightIcon}</TouchableOpacity>
                : rightIcon
            }
        </View>
    );
};

const containerStyles = StyleSheet.create({
    initial: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        overflow: 'hidden'
    },
    default: {
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 7,
        backgroundColor: colors.gray,
        paddingVertical: 12,
        paddingHorizontal: 10
    },
    rightButton: {
        backgroundColor: 'transparent',
    },
    profile_phone: {
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 7,
        backgroundColor: colors.gray,
        paddingVertical: 12,
        paddingHorizontal: 10
    }
});
const inputStyles = StyleSheet.create({
    initial: {
        flexGrow: 1,
        width: '90%'
    },
    default: {
        padding: 0,
        color: colors.white
    },
    profile_phone: {
        padding: 0,
        color: colors.green
    }
});