import React from "react";
import { Image, Modal, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "src/shared/components";
import { colors, fonts } from "src/shared/style";
// @ts-ignore
import Logo from '@assets/img/logo.png';

interface ICompletedSubscription {
    isOpen: boolean;
    onClose: () => void;
}

export const CompletedSubcription: React.FC<ICompletedSubscription> = ({ isOpen, onClose }) => {
    return(
        <Modal 
            visible={isOpen}>
                <SafeAreaView style={styles.layout}>
                    <View />
                    <View style={styles.content}>
                        <Image source={Logo} style={styles.logo}/>
                        <Text style={[fonts.label, styles.title]}>Подписка оформлена!</Text>
                    </View>
                    <View style={styles.button_holder}>
                        <Button onPress={onClose} projectType="primary">
                            <Text style={[fonts.label, styles.button_text]}>Ок</Text>
                        </Button>
                    </View>
                </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    content: {
        paddingHorizontal: 20,
        flexDirection: 'column',
        alignItems: 'center'
    },
    logo: {
        width: '55%',
        objectFit: 'contain'
    },
    title: {
        color: colors.white
    },
    button_holder: {
        paddingHorizontal: 20,
        marginVertical: 10
    },
    button_text: {
        textAlign: 'center',
        color: colors.black,
        fontSize: 16,
    }
});