import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useUnit } from "effector-react";
import { FC } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { $trips } from "src/features/trips";
import { TripDetailForm } from "src/features/trips/ui/TripDetailForm";
import { StackScreens } from "src/routes";
import { ScreenHeader } from "src/shared/components/screenHeader";
import { ArrowLeftIcon } from "src/shared/img";
import { colors } from "src/shared/style";
import { Order } from "src/types/order";

type TripDetailsProps = NativeStackScreenProps<StackScreens, "TripDetails">;

export const TripDetails: FC<TripDetailsProps> = ({ navigation, route }) => {
    const { id } = route.params;
    const { trips } = useUnit($trips);
    const order = trips?.find((item: Order) => item._id === id);
    return (
        <SafeAreaView style={[styles.layout]}>
            <ScreenHeader
                title="Поездка"
                leftIcon={<ArrowLeftIcon />}
                onLeftIconPress={() => navigation.navigate("Trips")}
            />
            <TripDetailForm order={order} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background,
    },
});
