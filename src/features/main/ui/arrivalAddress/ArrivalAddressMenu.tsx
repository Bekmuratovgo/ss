import { useBottomSheet } from '@gorhom/bottom-sheet';
import { useUnit } from 'effector-react';
import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Button } from 'src/shared/components/Button';
import { BuildingIcon, CrossIcon, LocationMarkIcon } from 'src/shared/img';
import { colors, fonts } from 'src/shared/style';
import { BottomSheetStateEnum } from '../../enums/bottomSheetState.enum';
import { setBottomSheetState } from '../../model/BottomSheetStore';
import { $main, setEditingOrder, setOrder } from '../../model/MainStore';

interface IArriveAddressMenu {};

export const ArriveAddressMenu: React.FC<IArriveAddressMenu> = ({  }) => {
    const { snapToIndex } = useBottomSheet();
    const [handleSetBottomSheetState] = useUnit([setBottomSheetState]);
    const [{ order, editingOrder }, handleSetOrder, handleSetEditingOrder] = useUnit([$main, setOrder, setEditingOrder]);

    const handleApply = () => {
        handleSetOrder({...order, arrival: editingOrder.arrival});
        handleSetBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
    }
    const handleClose = () => {
        handleSetEditingOrder({...editingOrder, arrival: order.arrival});
        handleSetBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
    }

    
    useEffect(() => {
        snapToIndex(0);
    }, []);
    return(
        <View style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity 
                    onPress={handleClose}
                    style={styles.close_button}>
                        <CrossIcon />
                </TouchableOpacity>
                <Text style={[fonts.medium, styles.header_title]}>Куда едем?</Text>
            </View>
            <View style={styles.container_body}>
                <Button onPress={() => handleSetBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_CITY)} projectType="address_input">
                    <BuildingIcon width={25}/>
                    <Text 
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[fonts.regular, styles.button_text]}>{editingOrder.arrival.city || "Выберите город"}</Text>
                </Button>
                <Button onPress={() => handleSetBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_ADDRESS)} projectType="address_input">
                    <LocationMarkIcon width={25}/>
                    <Text 
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[fonts.regular, styles.button_text]}>{editingOrder.arrival.address || "Адрес"}</Text>
                </Button>
            </View>
            <View style={styles.buttons_holder}>
                <Button onPress={handleApply} projectType="primary">
                    <Text style={[fonts.medium, styles.apply_button_text]}>Применить</Text>
                </Button>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    container_header: {
    },
    header_title: {
        width: '100%',
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
        marginVertical: 5
    },
    close_button: {
        backgroundColor: colors.opacity,
        borderRadius: 12,
        padding: 8,
        position: 'absolute',
        left: 0,
        zIndex: 1
    },
    button_text: {
        fontSize: 16,
        color: colors.white,
        width: '90%'
    },
    container_body: {
        marginVertical: 35,
        flexDirection: 'column',
        rowGap: 10
    },
    buttons_holder: {

    },
    apply_button_text: {
        textAlign: 'center',
        color: colors.black,
        fontSize: 16
    }
});