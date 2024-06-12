import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Platform } from "react-native";
import { CARS_CLASSES, PAYMENT_METHODS } from "../constants/constants";
import { ArrowRightPrimaryIcon, ClockIcon, CrossIcon, EditOptionsIcon, LocationMarkIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { BottomSheetScrollView, useBottomSheet } from "@gorhom/bottom-sheet";
import DatePicker from "react-native-date-picker";
import dayjs from 'dayjs';
import { Button } from "src/shared/components/Button";
import { useUnit } from "effector-react";
import { $main, setOrder, setOrderDetailsModal, setStatus } from "../model/MainStore";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";
import { setBottomSheetState } from "../model/BottomSheetStore";
import { CreateOrderDto } from "../types/dto/createOrder.dto";
import { createOrder } from "../model/main-actions";
import { MainStatusEnum } from "../enums/mainStatus.enum";
import { $profile } from "src/features/profile";
import { useToast } from "react-native-toast-notifications";

interface ISetAddress {
    setBottomSheetState
}

export const SetAddress: React.FC<ISetAddress> = ({
    setBottomSheetState
}) => {
    const toast = useToast();
    const [{ order, status }, { profile }, handleSetOrder, handleSetOrderDetailsModal, handleSetStatus] = useUnit([$main, $profile, setOrder, setOrderDetailsModal, setStatus]);
    const { carClass, date: shipDate, paymentMethod, price } = order;

    const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

    const getDepartureAddressButton = useCallback(() => {
        if (order.departure.address === "" || order.departure.city === "") {
            return "Откуда едем?";
        }
        return order.departure.city + ', ' + order.departure.address;
    }, [order.departure]);
    const getArrivalAddressButton = useCallback(() => {
        if (order.arrival.address === "" || order.arrival.city === "") {
            return "Куда едем?";
        }
        return order.arrival.city + ', ' + order.arrival.address;
    }, [order.arrival]);
    
    // Open departure address menu sheet
    const handleOpenDepartureAddress = () => {
        setBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_LOCATION);
    }

    // Open arrival address menu sheet
    const handleOpenArrivalAddress = () => {
        setBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_LOCATION);
    }

    // Open payment methods sheet
    const handleOpenPaymentSheet = () => {
        setBottomSheetState(BottomSheetStateEnum.DEFINED_PAYMENT_METHOD);
    }

    // Open datepicker
    const handleOpenDatepicker = () => {
        setDatePickerOpen(true);
    }

    // Close datepicker
    const handleCloseDatepicker = () => {
        setDatePickerOpen(false);
    }

    // Confirm date picker
    const handleConformDatepicker = (date: Date) => {
        setDatePickerOpen(false);
        handleSetOrder({...order, date});
    }

    // Open order details modal
    const handleOpenOrderDetails = () => {
        handleSetOrderDetailsModal(true);
    }

    // Create order
    const handleCreateOrder = async () => {
        if (!profile) {
            return;
        }
        
        const newOrder: CreateOrderDto = {
            from: order.departure.city,
            to: order.arrival.city,
            fulladressend: order.departure.address,
            fulladressstart: order.arrival.address,
            date: dayjs(order.date).format('DD.MM.YYYY'),
            time: dayjs(order.date).format('hh:mm'),
            comment: order.comment,
            countPeople: order.passangersAmount !== '' ? order.passangersAmount : "1",
            tariffId: CARS_CLASSES[order.carClass].label,
            isAnimal: order.params.animalTransfer,
            isBaby: order.params.babyChair,
            isBuster: order.params.buster,
            isBagage: order.baggage !== '' ? order.baggage : "1",
            full_price: `${order.price}`,
            phone_number: profile.phone_number
        };
        try {
            handleSetStatus(MainStatusEnum.CREATING_ORDER);
            const response: any = await createOrder(newOrder);
            if (response && response.status === "true") {
                setBottomSheetState(BottomSheetStateEnum.ORDER_PROCESS);
            }
            else if (response && response.error_message && response.status === 'false') {
                toast.show(response.error_message, {
                    type: "danger",
                    placement: "top",
                    textStyle: {
                        textAlign: "center"
                    }
                })
            }
        } catch (err) {
            toast.show('Не получилось создать заказ', {
                type: "error"
            })
            console.error('Failed to create order', err);
        } finally {
            handleSetStatus(MainStatusEnum.NULL);
        }
    }

    return(
        <>
            <View style={styles.container}>
                <View style={styles.address_holder}>
                    <Button onPress={handleOpenDepartureAddress} projectType="address_input">
                        <LocationMarkIcon />
                        <Text 
                            numberOfLines={1}
                            style={[fonts.regular, styles.address_input_text]} 
                            ellipsizeMode="tail">{getDepartureAddressButton()}</Text>
                        <EditOptionsIcon />
                    </Button>
                    <Button onPress={handleOpenArrivalAddress} projectType="address_input">
                        <ArrowRightPrimaryIcon style={{ marginHorizontal: 8 }} />
                        <Text 
                            numberOfLines={1}
                            style={[fonts.regular, styles.address_input_text]} 
                            ellipsizeMode="tail">{getArrivalAddressButton()}</Text>
                        <TouchableOpacity onPress={(e) => {
                            e.stopPropagation();
                            handleSetOrder({...order, arrival: { city: "", address: "" }})
                        }}>
                            <CrossIcon style={{ marginHorizontal: 7 }}/>
                        </TouchableOpacity>
                    </Button>
                </View>
                <View style={styles.carOptions_holder}>
                    <Text style={[fonts.regular, styles.carOption_title, Platform.OS === "ios" && {marginTop: 20}]}>Класс авто</Text>
                    {
                        Platform.OS === "ios"
                        ?
                        <ScrollView horizontal contentContainerStyle={styles.carClass_list}>
                            {
                                CARS_CLASSES.map(({label, img}, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        onPress={() => handleSetOrder({...order, carClass: index})}
                                        style={[styles.carClass_item, index === carClass && styles.activeCarClass]}>
                                            <Image source={img} style={styles.carClass_img}/>
                                            <Text style={styles.carClass_text}>{label}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                        :
                        <BottomSheetScrollView horizontal contentContainerStyle={styles.carClass_list}>
                            {
                                CARS_CLASSES.map(({label, img}, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        onPress={() => handleSetOrder({...order, carClass: index})}
                                        style={[styles.carClass_item, index === carClass && styles.activeCarClass]}>
                                            <Image source={img} style={styles.carClass_img}/>
                                            <Text style={styles.carClass_text}>{label}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </BottomSheetScrollView>
                    }
                </View>
            </View>

            <View style={styles.details}>
                <TouchableOpacity 
                    style={styles.payment_block}
                    onPress={handleOpenPaymentSheet}>
                        <Text style={styles.payment_title}>Оплата</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10, marginVertical: 5 }}>
                            {PAYMENT_METHODS[paymentMethod].Icon}
                            <Text style={[fonts.regular, styles.payment_text]}>{PAYMENT_METHODS[paymentMethod].label}</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.time_block}
                    onPress={handleOpenDatepicker}>
                        <Text style={styles.payment_title}>Время и дата</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10, marginVertical: 5 }}>
                            <ClockIcon width={25} style={styles.payment_icon}/>
                            <Text style={[fonts.regular, styles.payment_text]}>{dayjs(shipDate).format('DD.MM.YYYY hh:mm')}</Text>
                        </View>
                </TouchableOpacity>
                <DatePicker 
                    modal
                    mode="datetime"
                    locale="RU"
                    date={order.date}
                    open={datePickerOpen} 
                    onConfirm={handleConformDatepicker}
                    onCancel={handleCloseDatepicker}
                    confirmText="Выбрать"
                    cancelText="Отменить"
                    title="Выберите дату и время"/>
            </View>
            <View style={styles.price_holder}>
                <Text style={[fonts.medium, styles.price_text]}>{price && `Цена: ${price}р`}</Text>
            </View>
            <View style={styles.button_holder}>
                <Button projectType="secondary" onPress={handleOpenOrderDetails}>
                    <Text style={[fonts.medium, styles.secondary_button_text]}>Дополнительно</Text>
                </Button>
                <Button projectType="primary" onPress={handleCreateOrder} disabled={status === MainStatusEnum.CREATING_ORDER}>
                    <Text style={[fonts.medium, styles.primary_button_text]}>Заказать авто</Text>
                </Button>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    address_holder: {
        flexDirection: 'column',
        rowGap: 10,
        marginVertical: 20,
    },
    address_input_text: {
        fontSize: 16,
        color: colors.opacity,
        flexGrow: 1,
        width: '80%'
    },
    carOptions_holder: {
        marginBottom: 2,
        height: 140
    },
    carOption_title: {
        color: colors.white,
        fontSize: 16
    },
    carClass_list: {
        columnGap: 10
    },
    carClass_item: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    activeCarClass: {
        borderColor: colors.stroke,
    },
    carClass_img: {
        width: 100,
        height: 50,
        objectFit: "contain"
    },
    carClass_text: {
        color: colors.white,
        textAlign: 'center'
    },
    details: {
        borderTopColor: colors.stroke,
        borderBottomColor: colors.stroke,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop: 20,
        flexDirection: 'row'
    },
    payment_block: {
        width: '50%',
        borderRightColor: colors.stroke,
        borderRightWidth: 1,
        paddingVertical: 15,
        flexDirection: 'column',
        rowGap: 15,
        paddingHorizontal: 20,
    },
    payment_title: {
        color: colors.white,
    },
    payment_icon: {
        height: 25
    },
    payment_text: {
        color: colors.white
    },
    time_block: {
        width: '50%',
        paddingVertical: 15,
        flexDirection: 'column',
        rowGap: 15,
        paddingHorizontal: 20,
    },
    price_holder: {
        padding: 20
    },
    price_text: {
        color: colors.primary,
        textAlign: 'center',
        fontSize: 16
    },
    button_holder: {
        flexDirection: 'column',
        rowGap: 10,
        paddingHorizontal: 20
    },
    primary_button_text: {
        color: colors.black,
        textAlign: 'center',
        fontSize: 16
    },
    secondary_button_text: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 16
    }
});