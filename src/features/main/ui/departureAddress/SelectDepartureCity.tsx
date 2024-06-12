import { BottomSheetFlatList, BottomSheetTextInput, useBottomSheet } from "@gorhom/bottom-sheet";
import { useUnit } from "effector-react";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useKeyboardVisibility } from "src/features/useKeyboardVisibility";
import { Button } from "src/shared/components/Button";
import { CrossIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { ICity } from "src/types/city";
import { BOTTOM_SHEET_SNAP_POINTS } from "../../constants/SnapPoints";
import { BottomSheetStateEnum } from "../../enums/bottomSheetState.enum";
import { $bottomSheet, setBottomSheetState, setSnapPoints } from "../../model/BottomSheetStore";
import { getCities } from "../../model/main-actions";
import { $main, setEditingOrder } from "../../model/MainStore";

interface ISelectDepartureCityProps {};

export const SelectDepartureCity: React.FC<ISelectDepartureCityProps> = () => {
    const { snapToIndex } = useBottomSheet();
    const [{snapPoints}, handleSetSnapPoints, handleSetBottomSheetState] = useUnit([$bottomSheet, setSnapPoints, setBottomSheetState]);
    const [{order, editingOrder}, handleSetEditingOrder] = useUnit([$main, setEditingOrder]);
    const [ foundCities, setFoundCities ] = useState<ICity[]>([]);
    const keyboardVisible = useKeyboardVisibility();
    const [snapPos, setSnapPos] = useState(BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.SET_DEPARTURE_CITY][0]);
    const [city, setCity] = useState(editingOrder.departure.city);

    const handleClose = () => {
        handleSetBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_LOCATION);
    }

    const handleSelectCity = (selectedCity: string) => {
        handleSetEditingOrder({...editingOrder, departure: {...editingOrder.departure, city: selectedCity}});
        handleSetBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_LOCATION);

    }

    const handleApply = () => {
        handleSetEditingOrder({...editingOrder, departure: {...editingOrder.departure, city}});
        handleSetBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_LOCATION);
    }

    const handleChangeCity = (text: string) => {
        setCity(text);
        setFoundCities(prev => prev.filter(item => item.city.toLowerCase().includes(text.toLowerCase())));
    }

    const handleSearchCities = () => {
        if (city === "") {
            return;
        }
        getCities(city).then((res: ICity[]) => {
            setFoundCities(res);
        }).catch(err => {
            console.error(err);
        });
    }

    useEffect(() => {
        const getData = setTimeout(handleSearchCities, 2000);
        return () => {
            clearTimeout(getData);
        };
    }, [city]);

    useEffect(() => {
        if (!keyboardVisible && city.length === 0) {
            snapToIndex(0);
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
                <Text style={[fonts.medium, styles.header_title]}>С какого города едем?</Text>
            </View>
            <View style={styles.body}>
                <BottomSheetTextInput
                    style={styles.input} 
                    value={city} 
                    placeholder="Город"
                    placeholderTextColor={colors.opacity}
                    onChangeText={handleChangeCity}/>
            </View>
            {
                foundCities.length > 0 &&
                <BottomSheetFlatList
                data={foundCities}
                keyExtractor={(i) => `${i.id}`}
                style={styles.dropdown}
                renderItem={({item, index}) => (
                    <TouchableOpacity 
                            onPress={() => handleSelectCity(item.city)}
                            style={index === 0 ? styles.dropdown_item_first : styles.dropdown_item}>
                                <Text style={[fonts.regular, styles.dropdown_item_text]}>{item.city}</Text>
                    </TouchableOpacity>
                )}/>
            }
            <View style={styles.button_holder}>
                <Button onPress={handleApply} projectType="primary">
                    <Text style={[fonts.medium, styles.button_text]}>Применить</Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1
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
        paddingHorizontal: 20,
        borderWidth: 2,
        maxHeight: 200
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
        marginVertical: 20
    },
    button_text: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.black
    }
});