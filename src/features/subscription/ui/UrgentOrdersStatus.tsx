import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from 'src/shared/style';

interface IUrgentOrdersStatus {
    subscribed: boolean;
}

export const UrgentOrdersStatus: React.FC<IUrgentOrdersStatus> = ({ subscribed }) => {
    return(
        <View style={styles.container}>
            <Text style={[fonts.label, styles.title]}>Срочные заказы:</Text>
            <Text style={[styles.status, { color: subscribed ? colors.green : colors.error }]}>{subscribed ? "АКТИВНО" : "НЕАКТИВНО"}</Text>
            <Text style={[fonts.info, styles.text]}>Уведомления и всплывающие окна работают только при активном{"\n"} 
                <Text style={{ color: colors.green, textDecorationLine: 'underline' }}>"Срочном заказе"</Text>
            </Text>
            <View style={styles.button_holder}>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={[fonts.info, styles.button_text]}>{'Подробнее>'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 7,
        backgroundColor: colors.gray
    },
    title: {
        color: colors.white,
        fontSize: 16
    },
    status: {
        fontSize: 16,
        marginVertical: 5
    },
    text: {
        fontSize: 14,
        color: colors.white
    },
    button_holder: {
        width: '100%',
        flexDirection: 'row-reverse'
    },
    button_text: {
        color: colors.white,
        textDecorationLine: 'underline',
        fontSize: 14
    }
});