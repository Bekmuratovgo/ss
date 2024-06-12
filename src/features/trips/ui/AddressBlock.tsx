import { useUnit } from "effector-react";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ArrowDownIcon } from "src/shared/img";
import { colors } from "src/shared/style";
import { $main, setEditingOrder, setOrder } from 'src/features/main/model/MainStore';

type AddressBlockProps = {
    departureCity: string;
    arrivalCity: string;
    departureAddress: string;
    arrivalAddress: string;
}

export const AddressBlock: FC<AddressBlockProps> = ({departureCity, arrivalCity, departureAddress, arrivalAddress}) => {
    const [{ order, editingOrder, }, handleSetOrder, handleSetEditingOrder] =
    useUnit([$main, setOrder, setEditingOrder]);
    return(
        <View style={styles.info_container}>
            <View style={styles.arrow_holder}>
                <ArrowDownIcon />
            </View>
            <View style={styles.text_block}>
                <View style={styles.address_holder}>
                    <Text style={styles.city_text}>Откуда: {' '}
                        <Text style={{ color: colors.green }}>г.{departureCity}</Text>
                    </Text>
                    <Text style={styles.address_text}>{departureAddress}</Text>
                </View>
                {[ ...order.additionalArrivals].map((arrival, index) => (
                <View style={{ display: "flex", flexDirection: "row" }} key={index}>
                   <Text style={styles.city_text}>Остановка {index} : {' '}<Text>г.{arrival.city}</Text></Text>
                    <Text style={styles.address_text}>{arrival.address}</Text>
               
                </View>
            ))}
                <View style={styles.address_holder}>
                    <Text style={styles.city_text}>Куда: {' '}<Text  style={{ color: colors.green }}>г.{arrivalCity}</Text></Text>
                    <Text style={styles.address_text}>{arrivalAddress}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    info_container: {
        paddingBottom: 20,
        flexDirection: 'row',
        columnGap: 10
    },
    arrow_holder: {},
    text_block: {
        flexDirection: 'column',
        rowGap: 20
    },
    address_holder: {
        flexDirection: 'column',
        rowGap: 5
    },
    city_text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600"
    },
    address_text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "300"
    },
});