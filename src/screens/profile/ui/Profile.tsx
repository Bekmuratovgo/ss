import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useUnit } from "effector-react";
import { FC } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { ProfileForm } from "src/features/profile/ui/ProfileForm";
import { StackScreens } from "src/routes";
import { ScreenHeader } from "src/shared/components/screenHeader";
import { CrossIcon } from "src/shared/img";
import { colors } from "src/shared/style";
import { $profile } from "../../../features/profile/model/profileStore";

type IProfileProps = NativeStackScreenProps<StackScreens, "Profile">;

export const Profile: FC<IProfileProps> = ({ navigation }) => {
    const [{ profile }] = useUnit([$profile]);

    let handleCloseProfile = () => {
        let fieldsToFill = "";
        if (!profile.lastName) {
            fieldsToFill += "Фамилия, ";
        }
        if (!profile.firstName) {
            fieldsToFill += "Имя, ";
        }
        if (!profile.img) {
            fieldsToFill += "Аватар";
        }

        if (fieldsToFill !== "") {
            Alert.alert("Заполните следующие поля:", fieldsToFill);
        } else {
            navigation.navigate("Main");
        }
    };

    return (
        <SafeAreaView style={styles.layout}>
            <ScreenHeader
                leftIcon={<CrossIcon />}
                onLeftIconPress={() => handleCloseProfile()}
                leftIconStyle={{
                    backgroundColor: "transparent",
                    borderWidth: 0,
                }}
                title="Профиль"
            />
            <ProfileForm
                navigateToAuth={() => navigation.navigate("Auth")}
                navigateToMain={() => navigation.navigate("Main")}
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
