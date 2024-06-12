import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Insets = useSafeAreaInsets();

export const layoutPadding = 20;

export const sharedStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: layoutPadding,
  },

  row: {
    flexDirection: "row",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
