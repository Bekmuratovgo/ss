import { useStore } from "effector-react";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "src/shared/components";
import { Car } from "src/shared/components/icons/Car";
import { colors, fonts } from "src/shared/style";
import { UserRoleBackend } from "src/types/role";


interface IPlanContainer {
    role: UserRoleBackend,
    description: string;
    price: number;
    onSubscribe: (type: string) => void;
    type: string;
};

const SubTypes = {
    [UserRoleBackend.DRIVER]: 'Водитель'
}

export const PlanContainer: React.FC<IPlanContainer> = ({ role, description, price, onSubscribe, type }) => {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Car fillColor={colors.black}/>
                <Text style={[fonts.label, styles.header_title]}>{SubTypes[role]}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.description}>{description}</Text>
                <View style={styles.options}>
                    <Text style={styles.price}>{price} р \ мес</Text>
                    <Button onPress={() => onSubscribe(type)} projectType="primary">
                        <Text style={styles.button_text}>Подписаться</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 250,
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 7,
        marginVertical: 10
    },
    header: {
        backgroundColor: colors.opacity,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        paddingVertical: 10
    },
    header_title: {
        fontSize: 18,
        color: colors.black
    },
    content: {
        flex: 1,
        padding: 15,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    description: {
        color: colors.white
    },
    options: {
    },
    price: {
        width: '100%',
        textAlign: 'center',
        color: colors.white
    },
    button_text: {
        textAlign: 'center',
        color: colors.black
    }
});