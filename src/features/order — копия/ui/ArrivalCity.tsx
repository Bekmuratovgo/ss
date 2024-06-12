import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { colors, fonts } from "src/shared/style";
import { TBottomSheetMethods } from "../types/bottomSheetMethods";
import { FC, useEffect, useRef, useState } from "react";
import { CrossIcon } from "src/shared/img";
import {
    BottomSheetFlatList,
    BottomSheetModal,
    BottomSheetTextInput,
    useBottomSheet,
} from "@gorhom/bottom-sheet";
import { Button } from "src/shared/components/Button";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";
import { getCities } from "../model/order-actions";
import { useUnit } from "effector-react";
import {
    $main,
    setEditingOrder,
    setOrder,
} from "src/features/main/model/MainStore";
import { $bottomSheet } from "src/features/main/model/BottomSheetStore";
import { setSnapPoints } from "../model/bottomSheetStateStore";
import { BOTTOM_SHEET_SNAP_POINTS } from "../constants/SnapPoints";

type Props = TBottomSheetMethods & {};

const ArrivalCity: FC<Props> = function ({ setBottomSheetState }) {
    const [search, setSearch] = useState<string>(""); // Input state
    const [foundCities, setFoundCities] = useState<string[]>([]); // Fetched cities to select from list
    const [{ editingOrder }, handleSetEditingOrder] = useUnit([
        $main,
        setEditingOrder,
    ]);
    const [{ order }, handleSetOrder] = useUnit([$main, setOrder]);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [bottomSheet, setBottomSheet] = useState<BottomSheetStateEnum>(
        BottomSheetStateEnum.LOADING
    );
    const sheetModalRef = useRef<BottomSheetModal>(null);

    const [{ snapPoints }, handleSetSnapPoints] = useUnit([
        $bottomSheet,
        setSnapPoints,
    ]);
    const { snapToPosition } = useBottomSheet();
    const [snapPos, setSnapPos] = useState(
        BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.SET_ARRIVAL_CITY][0]
    );
    useEffect(() => {
        const points =
            BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.SET_ARRIVAL_CITY];
        let snapPoint = points[0];

        if (isKeyboardVisible && foundCities.length > 0) {
            snapPoint = "75%";
        } else if (isKeyboardVisible) {
            snapPoint = "60%";
        } else if (foundCities.length > 0) {
            snapPoint = "45%";
        }

        snapToPosition(snapPoint);
        handleSetSnapPoints(points);
        setSnapPos(snapPoint);
    }, [foundCities, isKeyboardVisible]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    /**
     * Move back to menu without changes
     */
    function close() {
        setBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_LOCATION);
    }

    /**
     * Changes text in search state and filters fetched cities (foundCities state)
     * @param text changing text of input
     */
    function handleChangeSearch(text: string) {
        setSearch(text);
        setFoundCities((prev) =>
            prev.filter((item) =>
                item.toLowerCase().includes(text.toLowerCase())
            )
        );
    }

    /**
     * Selects city and moves back to menu
     * @param selectedCity city to select
     */
    function handleSelectCity(selectedCity: string) {
        handleSetEditingOrder({
            ...editingOrder,
            arrival: { ...editingOrder.arrival, city: selectedCity },
        });
        setBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_LOCATION);
    }

    /**
     * Fetching cities from yandex
     */
    function handleSearchCities() {
        if (search === "") {
            return;
        }
        getCities(search)
            .then((res: any) => {
                console.log("found cities", res.results);
                const filteredCities = res.results
                    .map((item) => item.title.text)
                    .filter((city) =>
                        city.toLowerCase().includes(search.toLowerCase())
                    );
                setFoundCities(filteredCities);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    console.log("found cities", foundCities);
    /**
     * Bounced fetching cities
     */
    useEffect(() => {
        const getDataTimerId = setTimeout(handleSearchCities, 800);
        return () => {
            clearTimeout(getDataTimerId);
        };
    }, [search]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.container_header}>
                        <TouchableOpacity
                            onPress={close}
                            style={styles.close_button}
                        >
                            <CrossIcon />
                        </TouchableOpacity>
                        <Text style={[fonts.medium, styles.header_title]}>
                            Введите город
                        </Text>
                    </View>
                    <View style={styles.body}>
                        <BottomSheetTextInput
                            style={styles.input}
                            value={search}
                            autoFocus
                            onChangeText={handleChangeSearch}
                        />
                    </View>
                    {foundCities.length > 0 && (
                        <BottomSheetFlatList
                            data={foundCities}
                            keyExtractor={(city) => `${city}`}
                            style={styles.dropdown}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => handleSelectCity(item)}
                                    style={
                                        index === 0
                                            ? styles.dropdown_item_first
                                            : styles.dropdown_item
                                    }
                                >
                                    <Text
                                        style={[
                                            fonts.regular,
                                            styles.dropdown_item_text,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_header: {
        position: "relative",
    },
    close_button: {
        backgroundColor: colors.opacity,
        borderRadius: 12,
        padding: 8,
        position: "absolute",
        left: 20,
        top: 0,
        zIndex: 1,
    },
    header_title: {
        width: "100%",
        textAlign: "center",
        fontSize: 16,
        color: colors.white,
        marginVertical: 5,
    },
    body: {
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        marginTop: 10,
        borderColor: colors.stroke,
        borderRadius: 7,
        backgroundColor: colors.gray,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: colors.white,
    },
    dropdown: {
        width: "100%",
        paddingHorizontal: 20,
        maxHeight: 200,
    },
    dropdown_item: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.line,
    },
    dropdown_item_first: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.line,
        borderTopColor: colors.line,
    },
    dropdown_item_text: {
        color: colors.white,
        fontSize: 16,
    },
    button_holder: {
        // marginVertical: 20,
        paddingHorizontal: 20,
        // paddingBottom: 20
    },
    button_text: {
        textAlign: "center",
        fontSize: 16,
        color: colors.black,
    },
});

export default ArrivalCity;
