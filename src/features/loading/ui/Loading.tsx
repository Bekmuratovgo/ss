// import LottieView from "lottie-react-native"
import React from "react";
import {ActivityIndicator} from "react-native";
import { colors } from "src/shared/style";

const colorFilters = [
    {
        keypath: "Shape Layer 1",
        color: colors.primary
    },
    {
        keypath: "Shape Layer 2",
        color: colors.primary
    },
    {
        keypath: "Shape Layer 3",
        color: colors.primary
    },
    {
        keypath: "Shape Layer 4",
        color: colors.primary
    },
    {
        keypath: "Shape Layer 5",
        color: colors.primary
    },

]

export const Loading = () => {
    return (<ActivityIndicator/>
    );
};
