import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "src/shared/style";

export const Loader = () => {
    return(
        <View style={styles.container}>
            <ActivityIndicator color={colors.opacity} size="large"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 50
    },
});