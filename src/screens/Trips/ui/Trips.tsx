import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { TripsList } from "src/features/trips";
import { StackScreens } from "src/routes";
import { ScreenHeader } from "src/shared/components/screenHeader";
import { CrossIcon } from "src/shared/img";
import { colors } from "src/shared/style";

type ITripsProps = NativeStackScreenProps<StackScreens, "Trips">;

export const Trips: FC<ITripsProps> = ({ navigation }) => {
    const hanleGoMain = () => {
        navigation.navigate("Main");
    };
    return (
        <SafeAreaView style={styles.layout}>
            <ScreenHeader
                leftIcon={<CrossIcon />}
                onLeftIconPress={hanleGoMain}
                leftIconStyle={{
                    backgroundColor: colors.opacity,
                    borderColor: colors.opacity,
                }}
                title="Поездки"
            />
            <TripsList
                onTripPress={(id: string) =>
                    navigation.navigate("TripDetails", { id })
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background,
    },
});
