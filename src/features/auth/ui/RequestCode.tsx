import axios from "axios";
import { useEvent, useUnit } from "effector-react";
import { FC, useState } from "react";
import {
    Alert,
    Image,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { Button } from "src/shared/components/Button";
import { Input } from "src/shared/components/Input";
import { ScreenHeader } from "src/shared/components/screenHeader";
import { ArrowLeftIcon, Logo, PhoneRoundedIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { requestCode } from "../model/auth-actions";

interface IRequestCodeProps {
    type: "sign-in" | "sign-up";
    phone: string;
    onVerifyCode: () => void;
    onBack: () => void;
    onPhoneChange: (phone: string) => void;
}

export const RequestCode: FC<IRequestCodeProps> = ({
    type = "sign-in",
    phone,
    onVerifyCode,
    onBack,
    onPhoneChange,
}) => {
    const [loading, setLoading] = useState<boolean>(false);

    const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    const handleRequestCode = async () => {
        if (phone === "") return;
        try {
            setLoading(true);
            const data: any = await requestCode(phone);
            if (data && data.success) {
                Alert.alert(data.code);
                onVerifyCode();
            }
        } catch (err) {
            console.error("Failed to request code", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.layout}>
            <ScreenHeader
                leftIcon={<ArrowLeftIcon />}
                leftIconStyle={{
                    backgroundColor: "transparent",
                    borderWidth: 0,
                }}
                onLeftIconPress={onBack}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.body}>
                    <Image source={Logo} style={styles.logo} />
                    <View>
                        <Text style={[fonts.regular, styles.title]}>
                            Авторизация
                        </Text>
                        <Text style={[fonts.regular, styles.title]}>
                            по номеру телефона
                        </Text>
                    </View>
                    <Input
                        placeholder="Телефон"
                        value={phone}
                        onChange={(value) => {
                            const formattedValue = value
                                .replace(/\D/g, "")
                                .substring(0, 11);
                            if (value.length <= 12) {
                                onPhoneChange(value);
                            }
                            if (formattedValue.startsWith("7")) {
                                onPhoneChange(
                                    "+7" + formattedValue.substring(1)
                                );
                            } else if (formattedValue.startsWith("7")) {
                                onPhoneChange("+7" + formattedValue);
                            } else if (formattedValue.startsWith("8")) {
                                onPhoneChange(
                                    "+7" + formattedValue.substring(1)
                                );
                            } else if (formattedValue.startsWith("8")) {
                                onPhoneChange("+7" + formattedValue);
                            } else {
                                onPhoneChange("+7" + formattedValue);
                            }
                        }}
                        leftIcon={<PhoneRoundedIcon />}
                        keyboardType="phone-pad"
                    />
                    <Text style={[fonts.regular, styles.description]}>
                        Наш ваш номер будет отправлен СМС код
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.button_holder}>
                <Button
                    projectType="primary"
                    onPress={handleRequestCode}
                    disabled={phoneNumberRegex.test(phone) ? loading : true}
                >
                    <Text style={[fonts.regular, styles.button_text]}>
                        Вход
                    </Text>
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background,
    },
    body: {
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 20,
        rowGap: 30,
    },
    logo: {
        width: "55%",

        objectFit: "contain",
        marginVertical: 40,
    },
    title: {
        fontSize: 18,
        color: colors.white,
        textAlign: "center",
    },
    description: {
        fontSize: 15,
        color: colors.white,
        textAlign: "center",
    },
    button_holder: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    button_text: {
        color: colors.black,
        textAlign: "center",
        fontSize: 16,
    },
});
