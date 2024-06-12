import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "src/shared/components/Button";
import { Input } from "src/shared/components/Input";
import { BuildingIcon, CrossIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { useKeyboardVisibility } from "src/features/useKeyboardVisibility";
import { BottomSheetTextInput, useBottomSheet } from "@gorhom/bottom-sheet";
import { BOTTOM_SHEET_SNAP_POINTS } from "../../constants/SnapPoints";
import { BottomSheetStateEnum } from "../../enums/bottomSheetState.enum";
import { useUnit } from "effector-react";
import { $main, setEditingOrder } from "../../model/MainStore";
import { setBottomSheetState } from "../../model/BottomSheetStore";

interface ISelectArrivalAddressProps {
};

export const SelectArrivalAddress: React.FC<ISelectArrivalAddressProps> = ({}) => {
    const { snapToPosition } = useBottomSheet();
    const [handleSetBottomSheetState] = useUnit([setBottomSheetState]);
    const [{editingOrder, order}, handleSetEditingOrder] = useUnit([$main, setEditingOrder])
    const keyboardVisible = useKeyboardVisibility();

    const handleAddressChange = (address: string) => {
        handleSetEditingOrder({...editingOrder, arrival: { ...editingOrder.arrival, address }})
    }

    const handleClose = () => {
        handleSetEditingOrder({...editingOrder, arrival: order.arrival});
        handleSetBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_LOCATION)
    }

    const handleApply = () => {
        handleSetBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_LOCATION)
    }

    useEffect(() => {
        const snapPoint = BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.SET_ARRIVAL_ADDRESS][0];
        if (Platform.OS === "ios") {
            snapToPosition(keyboardVisible ? snapPoint + 320 : snapPoint);
        }
        else {

            snapToPosition(keyboardVisible ? snapPoint + 280 : snapPoint);
        }
    }, [keyboardVisible]);


    return(
        <View style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity 
                    onPress={handleClose}
                    style={styles.close_button}>
                        <CrossIcon />
                </TouchableOpacity>
                <Text style={[fonts.medium, styles.header_title]}>В какой адрес едем?</Text>
            </View>
            <View style={styles.body}>
                {/* <BuildingIcon /> */}
                <BottomSheetTextInput 
                    style={styles.input}
                    value={editingOrder.arrival.address} 
                    placeholder="Адрес"
                    placeholderTextColor={colors.opacity}
                    onChangeText={handleAddressChange}/>
                <View style={styles.button_holder}>
                    <Button onPress={handleApply} projectType="primary">
                        <Text style={[fonts.medium, styles.button_text]}>Применить</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    container_header: {
        position: 'relative',
    },
    close_button: {
        backgroundColor: colors.opacity,
        borderRadius: 12,
        padding: 8,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1
    },
    header_title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        color: colors.white,
        marginVertical: 5
    },
    body: {
        paddingVertical: 35
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 7,
        backgroundColor: colors.gray,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: colors.white
    },
    dropdown: {
        width: '100%',
        marginTop: 10
    },
    dropdown_item: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.line
    },
    dropdown_item_first: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.line,
        borderTopWidth: 1,
        borderTopColor: colors.line,
    },
    dropdown_item_text: {
        color: colors.white,
        fontSize: 16
    },
    button_holder: {
        marginVertical: 20,
        marginTop: 50
    },
    button_text: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.black
    }
});