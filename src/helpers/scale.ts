import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");
const baseWidth = 300;

export const scale = (size) => (width / baseWidth) * size;

export const fontScale = (size) => {
  const ratio = size / baseWidth;
  const newSize = width * ratio;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};
