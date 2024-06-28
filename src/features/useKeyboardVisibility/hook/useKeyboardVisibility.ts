import {getKeyboardEventType} from "src/helpers/getKeyboardEventType";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyboardVisibility = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          getKeyboardEventType('show'),
            () => {
              setKeyboardVisible(true);
            }
          );
          const keyboardDidHideListener = Keyboard.addListener(
            getKeyboardEventType('hide'),
            () => {
              setKeyboardVisible(false);
            }
          );

          return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
          };
    }, []);
    return isKeyboardVisible;
}
