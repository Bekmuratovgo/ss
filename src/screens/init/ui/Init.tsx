import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEvent } from "effector-react";
import React, { useEffect } from "react";
import { Alert, BackHandler, View } from "react-native";
import { AsyncStorageKeys } from "src/app/types/authorization";
import { getProfile, setProfile } from "src/features/profile";
import { StackScreens } from "src/routes";
import { colors } from "src/shared/style";
import { Profile } from "src/types/profile";

type InitProps = NativeStackScreenProps<StackScreens, "Init">

export const Init: React.FC<InitProps> = ({ navigation }) => {
    const handleSetProfile = useEvent(setProfile);
    const handleCheckAuth = async () => {
        const token = await AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
        console.log('Token: ', token);
        if (!token) {
            return navigation.navigate("Auth");
        }
        try {
            const profile: Profile = await getProfile();
            console.log('Profile: ', profile);
            handleSetProfile(profile);
        } catch (err) {
            return navigation.navigate("Auth");
        }
        return navigation.navigate("Main");
    }
    useEffect(() => {
        handleCheckAuth();
    }, []);

    return(
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            
        </View>
    );
};