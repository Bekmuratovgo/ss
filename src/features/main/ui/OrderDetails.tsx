import React, { useEffect, useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "src/shared/components/Button";
import { Input } from "src/shared/components/Input";
import { BaggageIcon, CrossIcon, UserIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import Checkbox from '@react-native-community/checkbox';
import { useUnit } from "effector-react";
import { $main, setOrder, setOrderDetailsModal } from "../model/MainStore";
import { BottomSheetStateEnum } from "../../order/enums/bottomSheetState.enum";
import { TBottomSheetMethods } from "src/features/order/types/bottomSheetMethods";
import { BottomSheetModal, useBottomSheet } from "@gorhom/bottom-sheet";
import { $bottomSheet, setSnapPoints } from 'src/features/main/model/BottomSheetStore';
import { BOTTOM_SHEET_SNAP_POINTS } from "../constants/SnapPoints";


type OrderDetailsProps = TBottomSheetMethods & {};

export const OrderDetails: React.FC<OrderDetailsProps> = ({setBottomSheetState}) => {
    const [{order}, handleSetOrder, handleSetOrderDetailsModal] = useUnit([$main, setOrder, setOrderDetailsModal]);
    const [baggage, setBaggage] = useState<string>(order.baggage);
    const [passangersAmount, setPassangersAmount] = useState<string>(order.passangersAmount);
    const [params, setParams] = useState(order.params);
    const [comment, setComment] = useState<string>(order.comment);

    const handleApplyChanges = () => {
        handleSetOrder({...order, baggage, passangersAmount, params, comment});
        handleSetOrderDetailsModal(false);
        setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);

    }


    const [bottomSheet, setBottomSheet] = useState<BottomSheetStateEnum>(BottomSheetStateEnum.LOADING);
    const sheetModalRef = useRef<BottomSheetModal>(null);

    const [{snapPoints}, handleSetSnapPoints] = useUnit([$bottomSheet, setSnapPoints]);
    const { snapToPosition } = useBottomSheet();
    const [snapPos, setSnapPos] = useState(BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.ORDER_DETAIL][0]);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        const points = BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.ORDER_DETAIL];
       

                    snapToPosition(points[0]);
                    handleSetSnapPoints(points);
                    setSnapPos(points[0]);
                    
       
    }, []);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true); 
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false);
          }
        );
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);
    function close() {
        setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
    }

    return(
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.layout}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.close_holder}
                    onPress={() => close()}>
                        <CrossIcon />
                </TouchableOpacity>
                <Text style={[fonts.medium, styles.header_title]}>Дополнительно</Text>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <View style={styles.body}>
                        <Input 
                            placeholder="Багаж" 
                            value={baggage}
                            onChange={setBaggage}
                            keyboardType="numeric"
                            leftIcon={<BaggageIcon />}/>
                        <Input 
                            placeholder="Количество человек" 
                            value={passangersAmount}
                            onChange={setPassangersAmount}
                            keyboardType="numeric"
                            leftIcon={<UserIcon />}/>
                                                   <View style={styles.option_holder_border}></View>

                        <View style={styles.option_holder}>
                            <TouchableOpacity style={styles.option_button} onPress={(e) => setParams(prev => ({...prev, babyChair: !prev.babyChair}))}>
                                
                                <Checkbox
                                    value={params.babyChair}   
                                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], marginTop : 5 }}

                                    onValueChange={() => Platform.OS !== "ios" && setParams(prev => ({...prev, babyChair: !prev.babyChair}))}
                                    tintColor={colors.white}
                                    boxType="cirlce"
                                    tintColors={{ true: colors.white, false: colors.white }}
                                    onCheckColor={colors.white}
                                    onTintColor={colors.white}/>
                                <Text style={styles.option_text}>Детское кресло</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.option_holder}>
                            <TouchableOpacity style={styles.option_button} onPress={(e) => setParams(prev => ({...prev, buster: !prev.buster}))}>
                                <Checkbox
                                    value={params.buster}
                                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], marginTop : 5 }}

                                    tintColors={{ true: colors.white, false: colors.white }}
                                    tintColor={colors.white}
                                    boxType="cirlce"
                                    onValueChange={(e) => Platform.OS !== "ios" && setParams(prev => ({...prev, buster: !prev.buster}))}
                                    onCheckColor={colors.white}
                                    onTintColor={colors.white}/>
                                <Text style={styles.option_text}>Бустер</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.option_holder}>
                            <TouchableOpacity style={styles.option_button} onPress={(e) => setParams(prev => ({...prev, animalTransfer: !prev.animalTransfer}))}>
                                <Checkbox
                                    value={params.animalTransfer}
                                    onValueChange={() => Platform.OS !== "ios" && setParams(prev => ({...prev, animalTransfer: !prev.animalTransfer}))}
                                    boxType="cirlce"
                                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], marginTop : 5 }}
                                    tintColors={{ true: colors.white, false: colors.white }}

                                    tintColor={colors.white}
                                    
                                    onCheckColor={colors.white}
                                    onTintColor={colors.white}
                                    />
                                <Text style={styles.option_text}>Перевозка животных</Text>
                            </TouchableOpacity>
                        </View>
                        <Input 
                            placeholder="Пожелания к заказу"
                            value={comment} 
                            onChange={setComment} 
                            textAlignVertical="top"
                            multiline 
                            numberOfLines={3}/>
                     
                    </View>
                    <View style={styles.button_holder}>
                        <Button onPress={handleApplyChanges} projectType="primary">
                            <Text style={[fonts.medium, styles.button_text]}>Применить</Text>
                        </Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background,
        zIndex: 9999
    },
    header: {
        position: 'relative',
        paddingVertical: 15
    },
    close_holder: {
        position: 'absolute',
        left: 15,
        top: 12,
        padding: 8,
        borderRadius: 12,
        backgroundColor: colors.opacity,
        zIndex: 10

    },
    header_title: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'center'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    body: {
        paddingVertical: 10,
        flexDirection: 'column',
        rowGap: 10
        
    },
    option_holder: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        marginBottom: 10,
        paddingBottom : 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.line
  
    },
    option_holder_border: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.line,

    },
    option_button: {
        flexDirection: 'row', 
        alignItems: 'center',
        columnGap: Platform.OS === "ios" ? 10 : 0
    },
    option_text: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.white
    },
    button_holder: {
        marginVertical: 1,
        paddingBottom : 10,
    },
    button_text: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.black
    }
});