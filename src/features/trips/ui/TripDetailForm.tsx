import { FC } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking,
} from "react-native";
import { colors } from "src/shared/style";
import { Order } from "src/types/order";
import { AddressBlock } from "./AddressBlock";
import { OrderStatusEnum } from "../model/orderEnum";
import { PhoneRoundedIcon, TelegramIcon, UnknownUser } from "src/shared/img";

type TripDetailFormProps = {
    order?: Order;
};

export const TripDetailForm: FC<TripDetailFormProps> = ({ order }) => {
    return (
        <>
            <ScrollView style={styles.body}>
                <View style={styles.info_holder}>
                    <AddressBlock
                        departureAddress={order?.order_start_full || ""}
                        departureCity={order?.order_start || ""}
                        arrivalAddress={order?.order_end_full || ""}
                        arrivalCity={order?.order_end || ""}
                    />
                </View>
                <View style={styles.params}>
                    <View style={styles.param_item}>
                        <Text style={styles.param_key}>Время подачи: </Text>
                        <Text style={styles.param_value}>
                            {order?.order_date} {order?.order_time}
                        </Text>
                    </View>
                    <View style={styles.param_item}>
                        <Text style={styles.param_key}>Расстояние: </Text>
                        <Text style={styles.param_value}>{null}</Text>
                    </View>
                    <View style={styles.param_item}>
                        <Text style={styles.param_key}>Дополнительно: </Text>
                        <Text style={styles.param_value}>
                            {[
                                order?.order_baby_chair ? "детское кресло" : "",
                                order?.order_animals ? "животные" : "",
                                order?.order_buster ? "бустер" : "",
                            ]
                                .filter(Boolean)
                                .join(",")}
                        </Text>
                    </View>
                    <View style={styles.param_item}>
                        <Text style={styles.param_key}>
                            количество человек:{" "}
                        </Text>
                        <Text style={styles.param_value}>
                            {order?.order_count_people
                                ? order?.order_count_people
                                : 1}
                        </Text>
                    </View>
                    <View style={styles.param_item}>
                        <Text style={styles.param_key}>
                            Пожелания к заказу:{" "}
                        </Text>
                        <Text style={styles.param_value}>
                            {order.order_comment}
                        </Text>
                    </View>
                </View>
                {order.order_driver && (
                    <>
                        <View style={styles.section}>
                            <Text style={styles.driver_title}>Водитель</Text>
                            <Text style={styles.driver_name}>
                                {order.order_driver.name}
                            </Text>
                            <View
                                style={{ flexDirection: "row", columnGap: 10 }}
                            >
                                <Image
                                    source={
                                        order.order_driver.avatar
                                            ? { uri: order.order_driver.avatar }
                                            : UnknownUser
                                    }
                                />
                                <View style={styles.driver_info}>
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: colors.opacity,
                                                fontSize: 16,
                                            }}
                                        >
                                            {order.order_tariff}
                                        </Text>
                                        <Text
                                            style={{
                                                color: colors.opacity,
                                                fontSize: 16,
                                            }}
                                        >
                                            {order.order_driver.carBrand}
                                        </Text>
                                        <Text
                                            style={{
                                                color: colors.opacity,
                                                fontSize: 16,
                                            }}
                                        >
                                            {order.order_driver.carModel}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: colors.opacity,
                                                fontSize: 16,
                                            }}
                                        >
                                            {order.order_driver.carNumber}
                                        </Text>
                                        <Text
                                            style={{
                                                color: colors.opacity,
                                                fontSize: 16,
                                            }}
                                        >
                                            {order.order_driver.carColor}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View
                                style={{ flexDirection: "row", columnGap: 5 }}
                            >
                                <Text
                                    style={{
                                        color: colors.white,
                                        fontWeight: "500",
                                        fontSize: 16,
                                    }}
                                >
                                    Тел. водителя:
                                </Text>
                                <Text
                                    style={{
                                        color: colors.white,
                                        fontWeight: "300",
                                        fontSize: 16,
                                    }}
                                >
                                    +7 988 888 88 88
                                </Text>
                            </View>
                        </View>
                    </>
                )}
                <View style={styles.price_holder}>
                    <Text style={styles.price_text}>
                        Цена: {order?.order_price || ""}р
                    </Text>
                    <Text style={styles.payment_text}>Наличные</Text>
                </View>
                <View style={styles.order_number}>
                    <Text style={styles.order_number_key}>Номер заказа:</Text>
                    <Text style={styles.order_number_value}>
                        {order?.order_id || ""}
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                {order?.order_status === OrderStatusEnum.selling && (
                    <Text style={styles.finding_driver_text}>
                        Водитель ищется...
                    </Text>
                )}
                <TouchableOpacity style={styles.footer_contact_button}>
                    <TouchableOpacity style={styles.footer_button_text}>
                        <Text style={styles.footer_button_text_new}>
                            {order.order_status === OrderStatusEnum.selling
                                ? "В ожидании..."
                                : "Связь"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.footer_button_icon}
                        onPress={() => {
                            Linking.openURL("https://t.me/ug_transfer_online");
                        }}
                    >
                        <TelegramIcon />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.footer_button_icon}
                        onPress={() => {
                            Linking.openURL(`tel:+79180295672`);
                        }}
                    >
                        <PhoneRoundedIcon />
                    </TouchableOpacity>
                </TouchableOpacity>
                <Text style={styles.footer_cancel_text}>
                    Для отмены заказа свяжитесь с диспетчером
                </Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    body: {
        flexGrow: 1,
    },
    info_holder: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.line,
    },
    section: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.line,
    },
    params: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomColor: colors.line,
        borderBottomWidth: 1,
    },
    param_item: {
        flexDirection: "row",
        alignItems: "center",
    },
    param_key: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.white,
        marginVertical: 3,
    },
    param_value: {
        fontSize: 16,
        fontWeight: "300",
        color: colors.white,
    },
    price_holder: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: colors.line,
        borderBottomWidth: 1,
    },
    price_text: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: "500",
    },
    payment_text: {
        color: colors.opacity,
        fontSize: 16,
    },
    order_number: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomColor: colors.line,
        borderBottomWidth: 1,
    },
    order_number_key: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "500",
    },
    order_number_value: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "300",
    },
    driver_title: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.white,
    },
    driver_name: {
        fontSize: 16,
        fontWeight: "300",
        color: colors.white,
        marginVertical: 10,
    },
    driver_info: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexGrow: 1,
    },
    footer: {
        paddingBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    finding_driver_text: {
        color: colors.error,
        fontWeight: "400",
        fontSize: 16,
        textAlign: "center",
        marginVertical: 10,
    },
    footer_contact_button: {
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 7,
        flexDirection: "row",
        alignItems: "center",
    },
    footer_button_text: {
        color: colors.stroke,
        textAlign: "center",
        marginVertical: 12,
        flexGrow: 1,
        fontSize: 16,
    },
    footer_button_text_new: {
        color: colors.stroke,
        textAlign: "center",
        fontSize: 16,
    },
    footer_button_icon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: "100%",
        borderLeftWidth: 1,
        borderLeftColor: colors.stroke,
    },
    footer_cancel_text: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: "300",
        color: colors.opacity,
        textAlign: "center",
    },
});
