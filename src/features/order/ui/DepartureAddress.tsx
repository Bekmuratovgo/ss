import {getKeyboardEventType} from "src/helpers/getKeyboardEventType";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { TBottomSheetMethods } from "../types/bottomSheetMethods";
import { FC, useEffect, useRef, useState } from "react";
import { CrossIcon, BuildingIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { BottomSheetFlatList, BottomSheetModal, useBottomSheet } from "@gorhom/bottom-sheet";
import { $main, setEditingOrder, setOrder } from "src/features/main/model/MainStore";
import { useUnit } from "effector-react";
import { Button } from "src/shared/components/Button";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";
import { getAddress } from "../model/order-actions";
import { $bottomSheet } from 'src/features/main/model/BottomSheetStore';
import { setSnapPoints } from "../model/bottomSheetStateStore";
import { BOTTOM_SHEET_SNAP_POINTS } from "../constants/SnapPoints";

type Props = TBottomSheetMethods & {};

const DepartureAddress: FC<Props> = function({setBottomSheetState}) {
    const [search, setSearch] = useState<string>(""); // Input state
    const [foundAddress, setFoundAddress] = useState<string[]>([]); // Fetched cities to select from list

    const [{ order, editingOrder, }, handleSetOrder, handleSetEditingOrder] =
    useUnit([$main, setOrder, setEditingOrder]);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);


    const [bottomSheet, setBottomSheet] = useState<BottomSheetStateEnum>(BottomSheetStateEnum.LOADING);
    const sheetModalRef = useRef<BottomSheetModal>(null);

    const [{snapPoints}, handleSetSnapPoints] = useUnit([$bottomSheet, setSnapPoints]);
    const { snapToPosition } = useBottomSheet();
    const [snapPos, setSnapPos] = useState(BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.SET_DEPARTURE_ADDRESS][0]);
    useEffect(() => {
        const points = BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.SET_DEPARTURE_ADDRESS];
        let snapPoint = points[0];

       if (isKeyboardVisible && foundAddress.length > 0) {
            snapPoint = '75%';
        } else if (isKeyboardVisible) {
            snapPoint = '60%';
        } else if (foundAddress.length > 0) {
            snapPoint = '45%';
        }

        snapToPosition(snapPoint);
        handleSetSnapPoints(points);
        setSnapPos(snapPoint);
    }, [foundAddress, isKeyboardVisible]);


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          getKeyboardEventType('show'),
          () => {
            setKeyboardVisible(true);
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          getKeyboardEventType('hide'),
          () => {
            setKeyboardVisible(false);
          }
        );

        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);
    /**
     * Move back to menu without changes
     */
    function close() {
        setBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_LOCATION);
    }

    /**
     * Changes text in search state and filters fetched cities (foundCities state)
     * @param text changing text of input
     */
    function handleChangeSearch(text: string) {
        setSearch(text);
        setFoundAddress(prev => prev.filter(item => item.toLowerCase().includes(text.toLowerCase().trim())));
    }

    /**
     * Selects city and moves back to menu
     * @param selectedAddress city to select
     */
    function handleSelectAddress(selectedAddress: string) {
        handleSetEditingOrder({...editingOrder, departure: {...editingOrder.departure, address: selectedAddress}});
        setBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_LOCATION);
    }

    /**
     * Fetching cities from yandex
     */
    function handleSearchAddress() {
        if (search === "") {
            return;
        }
        const searchQuery = editingOrder.departure.city ? `${editingOrder.departure.city},${search}` : search;
        console.log('search query' , searchQuery)
        getAddress(searchQuery.trim()).then((res: any) => {
            setFoundAddress(res.results.map((item) => item.title.text));
        }).catch(err => {
            console.error(err);
        });
    }


    /**
     * Bounced fetching cities
     */
    useEffect(() => {
        const getDataTimerId = setTimeout(handleSearchAddress, 800);
        return () => {
            clearTimeout(getDataTimerId);
        };
    }, [search]);

    return(


        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.container_header}>
                    <TouchableOpacity
                        onPress={close}
                        style={styles.close_button}>
                            <CrossIcon />
                    </TouchableOpacity>
                    <Text style={[fonts.medium, styles.header_title]}>Введите адрес</Text>
                </View>
                <View style={styles.body}>
                    <TextInput
                            style={styles.input}
                            value={search}
                            autoFocus
                            onChangeText={handleChangeSearch}/>
                </View>
                {
                    foundAddress.length > 0 &&
                    <BottomSheetFlatList
                    data={foundAddress}
                    keyExtractor={(address) => `${address}`}
                    style={styles.dropdown}
                    renderItem={({item, index}) => (
                        <TouchableOpacity
                                onPress={() => handleSelectAddress(item)}
                                style={index === 0 ? styles.dropdown_item_first : styles.dropdown_item}>
                                    <Text style={[fonts.regular, styles.dropdown_item_text]}>{item}</Text>
                        </TouchableOpacity>
                    )}/>
                }

            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container_header: {
        position: 'relative'
    },
    close_button: {
        backgroundColor: colors.opacity,
        borderRadius: 12,
        padding: 8,
        position: 'absolute',
        left: 20,
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
        paddingVertical: Platform.OS === 'ios' ?  35 : 0,
        marginTop :  Platform.OS === 'android' ?  35 : 0,        paddingHorizontal: 20
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 7,
        backgroundColor: colors.gray,
        paddingVertical: 12,
        height: 44,
        paddingHorizontal: 10,
        color: colors.white
    },
    dropdown: {
        width: '100%',
        paddingHorizontal: 20,

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
        // marginVertical: 20,
        paddingHorizontal: 20,
        // paddingBottom: 20
    },
    button_text: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.black
    }
});
export default DepartureAddress;
