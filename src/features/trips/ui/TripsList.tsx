import { useUnit } from "effector-react";
import { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Order } from "src/types/order";
import { TRIPS_MOCK } from "../constants/trips";
import { $trips, setTrips} from "../model/TripsStore";
import { TripItem } from "./TripItem";
import { $profile } from "src/features/profile";
import { getTrips } from "../model/trips-actions";

interface ITripsListProps {
    onTripPress: (id: string) => void;
}

export const TripsList: FC<ITripsListProps> = ({ onTripPress }) => {
    const [trips, handleSetTrips] = useUnit([$trips, setTrips]);
    const [loading, setLoading] = useState<boolean>(false);
    const [{ profile }] = useUnit([$profile]);

    const handleRefreshTrips = () => {
        try {
            setLoading(true);
        } catch (err) {
            console.error("Failed to refresh trips list", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleGetTrips = async () => {
            if (!profile) {
                return;
            }

            try {
                const response: any = await getTrips(profile.phone_number);
                handleSetTrips(response);
                console.log('trips', trips)
                console.log('trips response ', response)

            } catch (err) {
                toast.show("Не получилось получить поездки", {
                    type: "error",
                });
                console.error("Failed to get trips", err.response.data);
            }
        };

        handleGetTrips();
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.list}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={handleRefreshTrips}
                />
            }
        >
            {trips &&
                trips.trips?.map((item: any) => (
                    <TripItem
                        key={item._id}
                        departureCity={item.order_start}
                        departureAddress={item.order_start_full}
                        arrivalCity={item.order_end}
                        arrivalAddress={item.order_end_full}
                        date={item.order_date}
                        distance={item.order_distance}
                        price={item.order_price}
                        status={item.order_status}
                        onPress={() => onTripPress(item._id)}
                    />
                ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    list: {
        flexGrow: 1,
        paddingHorizontal: 20,
        marginVertical: 10,
        rowGap: 10,
    },
});
