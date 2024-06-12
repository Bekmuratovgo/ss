import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from 'src/shared/style';

interface IStatusContainer {
    subStatus: boolean;
}

export const StatusContainer: React.FC<IStatusContainer> = ({ subStatus }) => {
    return (
        <View style={styles.status}>
            <Text style={[fonts.label, styles.status_label]}>Подписка:</Text>
            {
                subStatus
                ?
                <Text style={[fonts.label, styles.status_value, { color: colors.green }]}>
                    АКТИВНА
                </Text>
                :
                <Text style={[fonts.label, styles.status_value, { color: colors.error }]}>
                    НЕАКТИВНА
                </Text>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    status: {
        backgroundColor: colors.gray,
        padding: 10,
        borderRadius: 7,
        height: 120
    },
    status_label: {
        fontSize: 16,
        color: colors.white
    },
    status_value: {
        fontSize: 16,
        marginVertical: 5
    } 
});