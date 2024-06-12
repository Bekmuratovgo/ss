import dayjs from "dayjs";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PhoneRoundedIcon, TelegramIcon } from "src/shared/img";
import { colors } from "src/shared/style";
import { OrderStatusEnum } from "../model/orderEnum";
import { AddressBlock } from "./AddressBlock";

interface ITripItemProps {
    departureCity: string;
    departureAddress: string;
    arrivalCity: string;
    arrivalAddress: string;
    price: string;
    distance: number;
    date: string;
    onPress: () => void;
    status: OrderStatusEnum;
}

export const TripItem: FC<ITripItemProps> = ({
    departureCity,
    departureAddress,
    arrivalCity,
    arrivalAddress,
    distance,
    price,
    date,
    onPress,
    status,
}) => {
    const orderStatusColor = {
        [OrderStatusEnum.selling]: colors.error,
        [OrderStatusEnum.cancelled]: colors.error,
        [OrderStatusEnum.in_process]: colors.green,
        [OrderStatusEnum.finished]: colors.opacity,
    };
    return (
        <TouchableOpacity style={[styles.container]} onPress={onPress}>
            <View style={styles.header}>
                <Text
                    style={[
                        styles.header_text,
                        { color: orderStatusColor[status] },
                    ]}
                >
                    {date}
                </Text>
                <Text style={styles.header_text}>{distance}км</Text>
            </View>
            <View style={styles.body}>
                <AddressBlock
                    departureCity={departureCity}
                    departureAddress={departureAddress}
                    arrivalCity={arrivalCity}
                    arrivalAddress={arrivalAddress}
                />
                <View style={styles.contact_container}>
                    <TouchableOpacity>
                        <PhoneRoundedIcon />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <TelegramIcon />
                    </TouchableOpacity>
                    <Text style={styles.contact_text}>
                        Связаться с оператором
                    </Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text
                    style={[
                        styles.status_text,
                        { color: orderStatusColor[status] },
                    ]}
                >
                    {status}
                </Text>
                <Text style={styles.price_text}>{price}р</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    header_text: {
        color: colors.opacity,
        fontSize: 16,
        fontWeight: "400",
    },
    body: {
        paddingVertical: 20,
    },
    info_container: {
        paddingBottom: 20,
        flexDirection: "row",
        columnGap: 10,
    },
    arrow_holder: {},
    text_block: {
        flexDirection: "column",
        rowGap: 20,
    },
    address_holder: {
        flexDirection: "column",
        rowGap: 5,
    },
    city_text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
    },
    address_text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "300",
    },
    contact_container: {
        flexDirection: "row",
        columnGap: 5,
    },
    contact_text: {
        fontSize: 16,
        color: colors.primary,
        marginHorizontal: 10,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    status_text: {
        fontSize: 16,
        fontWeight: "300",
    },
    price_text: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "500",
    },
});
