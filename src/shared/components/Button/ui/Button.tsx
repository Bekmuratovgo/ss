import React, { forwardRef, memo } from "react";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { colors } from "src/shared/style";

interface IButtonProps {
    onPress: () => void;
    children: React.ReactNode,
    projectType?: string;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>
};

export const Button = memo(forwardRef<any, IButtonProps>(({ onPress, children, projectType="default", disabled=false, style }, ref) => {
    const styleKey = projectType as keyof typeof styles;
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles[styleKey], style, disabled && styles.disabled]}
            disabled={disabled}>
            {children}
        </TouchableOpacity>
    )
}));

const styles = StyleSheet.create({
    default: {
    },
    disabled: {
        opacity: .4
    },
    primary: {
        width: '100%',
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 9
    },
    secondary: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.stroke,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 9
    },
    address_input: {
        flexDirection: 'row',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: colors.stroke,
        padding: 12,
        alignItems: 'center',
        columnGap: 10,
        backgroundColor: colors.gray,
        overflow: 'hidden'
    }
});