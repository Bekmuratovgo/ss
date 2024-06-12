import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "src/shared/style";

type LinkItemProps = {
    onPress: () => void;
    leftIcon?: any;
    rightIcon?: any;
    title: string;
}

export const LinkItem: FC<LinkItemProps> = ({ onPress, leftIcon, rightIcon, title }) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <View style={styles.button_leftSize}>
                {leftIcon}
                <Text style={styles.title}>{title}</Text>
            </View>
            {rightIcon}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.board,
        borderWidth: 1,
        borderColor: colors.stroke,
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 7
    },
    button_leftSize: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 12
    },
    title: {
        color: colors.white,
        fontSize: 16
    }, 
});