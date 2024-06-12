import { BottomSheetTextInput, useBottomSheet } from "@gorhom/bottom-sheet";
import { useUnit } from "effector-react";
import React, { useEffect } from "react";
import { Keyboard, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useKeyboardVisibility } from "src/features/useKeyboardVisibility";
import { Button } from "src/shared/components/Button";
import { Input } from "src/shared/components/Input";
import { BuildingIcon, CrossIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { BOTTOM_SHEET_SNAP_POINTS } from "../../constants/SnapPoints";
import { BottomSheetStateEnum } from "../../enums/bottomSheetState.enum";
import { setBottomSheetState } from "../../model/BottomSheetStore";
import { $main, setEditingOrder } from "../../model/MainStore";

interface ISelectDepartureAddressProps {
};

export const SelectDepartureAddress: React.FC<ISelectDepartureAddressProps> = () => {
    const { snapToPosition } = useBottomSheet();
    const [handleSetBottomSheetState] = useUnit([setBottomSheetState]);
    const [{editingOrder, order}, handleSetEditingOrder] = useUnit([$main, setEditingOrder])
    const keyboardVisible = useKeyboardVisibility();

    const handleAddressChange = (address: string) => {
        handleSetEditingOrder({...editingOrder, departure: { ...editingOrder.departure, address }})
    }

    const handleClose = () => {
        handleSetEditingOrder({...editingOrder, departure: order.departure});
        handleSetBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_LOCATION);
    }

    const handleApply = () => {
        handleSetBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_LOCATION)
    }

    return(
        <View style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity 
                    onPress={handleClose}
                    style={styles.close_button}>
                        <CrossIcon />
                </TouchableOpacity>
                <Text style={[fonts.medium, styles.header_title]}>С какого адреса едем?</Text>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.body}>
                    {/* <BuildingIcon /> */}
                    <BottomSheetTextInput
                        style={styles.input} 
                        value={editingOrder.departure.address} 
                        placeholder="Адрес"
                        placeholderTextColor={colors.opacity}
                        onChangeText={handleAddressChange}/>
                    <View style={styles.button_holder}>
                        <Button onPress={handleApply} projectType="primary">
                            <Text style={[fonts.medium, styles.button_text]}>Применить</Text>
                        </Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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