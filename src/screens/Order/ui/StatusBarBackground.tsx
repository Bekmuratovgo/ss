import { Platform, StyleSheet, Image } from "react-native";
import { StatusBarBackground } from "src/shared/img";

const OrderStatusBarBackground = function() {
    if (Platform.OS !== "ios") {
        return null;
    }
    return <Image source={StatusBarBackground} style={styles.status_bar}/>;
}

const styles = StyleSheet.create({
    status_bar: {
        width: '100%',
        height: 50,
        position: "absolute",
        top: 0,
        zIndex: 10
    }
});

export default OrderStatusBarBackground;