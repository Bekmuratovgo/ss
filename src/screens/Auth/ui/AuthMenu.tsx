import { FC } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { Button } from "src/shared/components/Button";
import { Logo } from "src/shared/img";
import { colors, fonts } from "src/shared/style";

interface IAuthMenuProps {
    onSignin: () => void;
    onSignup: () => void;
    onPrivacyPolicy: () => void;
}

export const AuthMenu: FC<IAuthMenuProps> = ({
    onSignin,
    onSignup,
    onPrivacyPolicy
}) => {
    return(
        <View style={[styles.layout, Platform.OS === "ios" && {paddingBottom: 20}]}>
            <View />
            <Image source={Logo} style={styles.logo}/>
            <View style={styles.footer}>
                <View style={styles.description}>
                    <Text style={[fonts.medium, styles.description_text]}>Поможем найти тех, кто нужен Вам и отвезет Вас куда угодно</Text>
                </View>

                <View style={styles.buttons_holder}>
                    {/* <Button onPress={onSignin} projectType="secondary">
                        <Text style={[fonts.medium, styles.button_text, { color: colors.white }]}>Авторизация</Text>
                    </Button> */}
                    <Button onPress={onSignup} projectType="primary">
                        <Text style={[fonts.medium, styles.button_text, { color: colors.black }]}>Войти</Text>
                    </Button>
                 
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: 'rgba(7, 7, 7, .7)',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        objectFit: 'contain',
        width: '70%',
        paddingHorizontal: 20
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%'
    },
    description: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    description_text: {
        width: '70%',
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
        marginVertical: 20
    },
    buttons_holder: {
        flexDirection: 'column',
        rowGap: 10
    },
    button_text: {
        fontSize: 16,
        textAlign: 'center'
    },
    privacy_text: {
        width: '100%',
        fontSize: 14,
        color: colors.white,
        textDecorationLine: 'underline',
        textAlign: 'center'
    }
});