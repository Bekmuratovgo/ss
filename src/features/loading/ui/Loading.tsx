import LottieView from "lottie-react-native"
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
    return (
        <LottieView 
            source={require('../constants/loadingAnimation.json')} 
            autoPlay 
            loop 
            colorFilters={colorFilters}
            style={{height: 250, width: 350}}/>
    );
};