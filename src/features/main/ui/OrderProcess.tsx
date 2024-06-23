import {BottomSheetModal, useBottomSheet} from "@gorhom/bottom-sheet";
import {useNavigation} from "@react-navigation/native";
import {deleteOrder} from "@src/features/main/model/main-actions";
import {$profile} from "@src/features/profile";
import {$trips} from "@src/features/trips";
import {getTrips} from "@src/features/trips/model/trips-actions";
import {setTrips} from "@src/features/trips/model/TripsStore";
import {ca} from "date-fns/locale";
import {useUnit} from "effector-react";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import Toast from "react-native-toast-notifications";
import {$bottomSheet} from 'src/features/main/model/BottomSheetStore';
import {TBottomSheetMethods} from "src/features/order/types/bottomSheetMethods";
import {Button} from "src/shared/components/Button";
import {colors} from "src/shared/style";
import {BOTTOM_SHEET_SNAP_POINTS} from "../constants/SnapPoints";
import {BottomSheetStateEnum} from "../enums/bottomSheetState.enum";
import {setSnapPoints} from "../model/BottomSheetStore";
import {
  $main, defaultEditingOrder, defaultOrderData,
  resetOrder, setEditingOrder,
  setFinishedOrder, setIsOrderCancelling,
  setOrder,
  setOrderProcessStatus,
  setProceedingOrderId
} from "../model/MainStore";

type OrderProcessProps = TBottomSheetMethods & {}

export const OrderProcess: FC<OrderProcessProps> = ({setBottomSheetState}) => {
  const navigation = useNavigation();

  const [
    {orderProcessStatus, proceedingOrderId, order, isOrderCancelling},
    handleSetOrderProcessStatus,
    handleSetProceedingOrderId,
    handleSetOrder,
    handleSetEditingOrder,
    handleSetIsOrderCancelling,
  ] = useUnit([$main, setOrderProcessStatus, setProceedingOrderId, setOrder, setEditingOrder, setIsOrderCancelling]);

  const [{profile: {phone_number}}, handleSetTrips] = useUnit([$profile, setTrips])


  const [bottomSheet, setBottomSheet] = useState<BottomSheetStateEnum>(
    BottomSheetStateEnum.LOADING
  );
  const sheetModalRef = useRef<BottomSheetModal>(null);

  const [{snapPoints}, handleSetSnapPoints] = useUnit([
    $bottomSheet,
    setSnapPoints,
  ]);
  const {snapToPosition} = useBottomSheet();
  const [snapPos, setSnapPos] = useState(
    BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.ORDER_PROCESS][0]
  );
  useEffect(() => {
    const points =
      BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.ORDER_PROCESS];

    snapToPosition((points[0] = 215));
    handleSetSnapPoints(points.map((pos) => pos + 215));
    setSnapPos((points[0] = 215));

  }, []);

  useEffect(() => {
    void handleOrderTook()
  }, [orderProcessStatus])

  const handleOrderTook = async () => {
    if (orderProcessStatus === 'took' && proceedingOrderId) {
      const response: any = await getTrips(phone_number);
      handleSetTrips(response);
      handleSetOrderProcessStatus('received')
      setTimeout(() => {
        handleSetOrder({...defaultOrderData, departure: order.departure})
        handleSetEditingOrder({...defaultEditingOrder})
        setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
      }, 100)

      // @ts-ignore
      navigation.navigate("TripDetails", { id: proceedingOrderId })

    }
  }

  const onReceivedDismiss = () => {
    handleSetOrderProcessStatus("received");

    setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
  };

  const onSeekingDismiss = () => {
    console.log('onSeekingDismiss')
    setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);

  };

  const onCancelDismiss = useCallback(() => {
    setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
  }, [])

  const handleCancelOrder = async () => {
    try {
      if(proceedingOrderId) {
        handleSetIsOrderCancelling(true)
        const response = await deleteOrder(proceedingOrderId)

        console.log(response)

        if(response) {
          handleSetOrder({...defaultOrderData, departure: order.departure})
          handleSetEditingOrder({...defaultEditingOrder})
          handleSetProceedingOrderId(null)
          handleSetOrderProcessStatus(null)

          setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
        }
      }
    } catch (e) {
      console.log(e)
      toast.show('Что то пошло не так', {
        type: "error"
      })
    } finally {
      handleSetIsOrderCancelling(false)
    }
  }

  const handleOrderMore = () => {
    handleSetOrder({...defaultOrderData, departure: order.departure})
    handleSetEditingOrder({...defaultEditingOrder})
    handleSetProceedingOrderId(null)
    handleSetOrderProcessStatus(null)

    setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {orderProcessStatus === "took" ? "Ваш заказ принят" : orderProcessStatus === "cancelled" ? "Заказ отменен" : "Водитель ищется..."}
      </Text>
      {
        orderProcessStatus === 'seeking' ? <View style={styles.buttonContainer}>
            <Button disabled={isOrderCancelling} projectType="secondary" onPress={handleCancelOrder} style={[styles.button, styles.cancelButton]}>
              {isOrderCancelling ? <ActivityIndicator /> : <Text>Отменить</Text>}
            </Button>
            <Button disabled={isOrderCancelling} projectType="primary" onPress={handleOrderMore} style={styles.button}>
              <Text>Заказать еще</Text>
            </Button>
          </View>
          : (
            <Button projectType="primary"
                    onPress={orderProcessStatus === "took" ? onReceivedDismiss : orderProcessStatus === "cancelled" ? onCancelDismiss : onSeekingDismiss}>
              <Text
                style={styles.button_text}>OK</Text>
            </Button>
          )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    marginVertical: 40
  },
  button_text: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: colors.white,
  }
});
