import { useUnit } from "effector-react";
import { FC, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native"
import { LightLogo } from "src/shared/img";
import { colors } from "src/shared/style";
import { $main, setFinishedOrder, setOrderProcessStatus } from "../model/MainStore";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";
import { Button } from "src/shared/components/Button";
import { TBottomSheetMethods } from "src/features/order/types/bottomSheetMethods";

type OrderFinishProps = TBottomSheetMethods &{
}
export const FinishedOrder: FC<OrderFinishProps> = ({setBottomSheetState}) => {
    const [{ finishedOrder }] = useUnit([$main]);
    const [
        { orderProcessStatus, order }, 
        handleSetOrderProcessStatus, 
        handleSetFinishedOrder
    ] = useUnit([$main, setOrderProcessStatus, setFinishedOrder]);
    
    // useEffect(() => {
    //     if (!finishedOrder) {
    //         handleSetBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
    //     }
    // }, [finishedOrder]);

    // if (!finishedOrder) {
    //     return null;
    // }

    const handleOkayClick = () => {
        handleSetOrderProcessStatus("null");

        setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
    }

    return(
        <View style={styles.container}>
            <Image source={LightLogo} style={styles.logo}/>
            <Text style={styles.primary_text}>Поездка завершена!</Text>
            <View style={{ marginVertical: 40}}>
                <View style={styles.description_line}>
                    <Text style={styles.description_key}>Проехана:</Text>
                    <Text style={styles.description_value}>{order?.distance}км</Text>
                </View>
                <View style={styles.description_line}>
                    <Text style={styles.description_key}>Стоимость:</Text>
                    <Text style={styles.description_value}>{order.price}р</Text>
                </View>
            </View>
            <Button projectType="primary" onPress={handleOkayClick}>
                <Text style={styles.button_text}>Окей</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20
    },
    logo: {
        width: 120,
        objectFit: "contain",
        alignSelf: "center",
        marginVertical: 15
    },
    primary_text: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginVertical: 10
    },
    description_line: {
        flexDirection: "row",
        columnGap: 5,
        justifyContent: "center"
    },
    description_key: {
        color: colors.white,
        fontWeight: "600",
        fontSize: 18,
        marginVertical: 4
    },
    description_value: {
        color: colors.white,
        fontWeight: "300",
        fontSize: 18,
        marginVertical: 4
    },
    button_text: {
        textAlign: "center",
        color: colors.black,
        fontSize: 18
    }
});