import { FC } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "src/shared/components/Button";
import { ArrowLeftIcon, Logo } from "src/shared/img";
import { colors } from "src/shared/style";

interface IConfirmDeleteAccount {
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmDeleteAccount: FC<IConfirmDeleteAccount> = ({ onClose, onConfirm }) => {
    return(
        <SafeAreaView style={styles.layout}>
            <View style={styles.header}>
                <Button
                    onPress={onClose}
                    projectType="header_left_icon"
                    style={{ width: 10}}>
                        <ArrowLeftIcon />
                </Button>
            </View>
            <View style={styles.body}>
                <View style={styles.container}>
                <Image source={Logo} style={styles.logo}/>

                </View>
                <Text style={styles.title}>Вы действительно хотите удалить аккаунт?</Text>
                <Text style={styles.reminder}>Все ваши данные и поездки будут стерты</Text>
            </View>
            <View style={styles.footer}>
                <Button onPress={onConfirm} projectType="secondary">
                    <Text style={styles.secondary_button_text}>Удалить</Text>
                </Button>
                <Button onPress={onClose} projectType="primary">
                    <Text style={styles.primary_button_text}>Назад</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    body: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    logo: {
        maxWidth: '100%', 
        maxHeight: 100,
        objectFit: 'contain'
    },
    container: {
        maxWidth: '60%',
        marginVertical: 20
    },
    title: {
        color: colors.white,
        fontSize: 16,
        width: '50%',
        textAlign: 'center',
        marginVertical: 10
    },
    reminder: {
        color: colors.error,
        fontSize: 16,
        width: '60%',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: "300"
    },
    footer: {
        flexDirection: 'column',
        rowGap: 10,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    secondary_button_text: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 16,
        fontWeight: "400"
    },
    primary_button_text: {
        textAlign: 'center',
        color: colors.black,
        fontSize: 16,
        fontWeight: "400"
    }
});