import React from "react";
import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, fonts } from "src/shared/style";

interface IScreenHeaderProps {
    leftIcon?: any;
    title?: string;
    onLeftIconPress?: () => void;
    titleColor?: string;
    leftIconStyle?: StyleProp<ViewStyle>;
}

export const ScreenHeader: React.FC<IScreenHeaderProps> = ({ leftIcon=null, title="", onLeftIconPress = () => {}, titleColor=colors.white, leftIconStyle }) => {
    return(
        <View style={styles.container}>
            <View style={styles.leftIcon_holder}>
                <TouchableOpacity style={styles.left_button} onPress={onLeftIconPress}>
                    {leftIcon}
                </TouchableOpacity>
            </View>

            <Text style={[fonts.medium, styles.title, { color: titleColor || colors.white }]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
        zIndex: 4
    },
    leftIcon_holder: {
        position: 'absolute',
        top: 8,
        left: 10,
        zIndex: 9999999,
    },
    left_button: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 12,
        padding: 10,
    },
    title: {
        width: '100%',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15
    }
});