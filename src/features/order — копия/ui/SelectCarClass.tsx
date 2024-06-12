import { FC } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { CARS_CLASSES } from "src/features/main/constants/constants";
import { colors } from "src/shared/style";

type Props = {
    selectCarClass: (index: number) => void;
    activeCarClassIndex: number;
};

const SelectCarClass: FC<Props> = function ({
    selectCarClass,
    activeCarClassIndex,
}) {
    return (
        <View style={{ rowGap: 5 }}>
            <Text style={styles.title}>Класс авто</Text>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content_container}
                horizontal
            >
                {CARS_CLASSES.map(({ label, img }, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.button,
                            activeCarClassIndex === index &&
                                styles.active_button,
                        ]}
                        onPress={() => selectCarClass(index)}
                    >
                        <View style={styles.imageContainer}>
                            <Image source={img} style={styles.image} />
                        </View>
                        <Text style={styles.label}>{label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        paddingHorizontal: 20,
        color: colors.white,
        fontSize: 16,
        marginTop: 10,
    },
    imageContainer: {
        maxWidth: 103,
        maxHeight: 41,
    },
    image: {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
    },
    container: {
        width: "100%",
    },
    content_container: {
        paddingLeft: 20,
        paddingBottom: 15,
    },
    button: {
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingTop: 15,
        borderWidth: 1,
        borderColor: colors.transparent,
    },
    active_button: {
        borderColor: colors.stroke,
    },
    label: {
        textAlign: "center",
        color: colors.white,
        fontSize: 14,
    },
});

export default SelectCarClass;
