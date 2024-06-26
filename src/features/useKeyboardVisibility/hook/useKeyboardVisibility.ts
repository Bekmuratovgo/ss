import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyboardVisibility = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardWillShow',
            () => {
              setKeyboardVisible(true);
            }
          );
          const keyboardDidHideListener = Keyboard.addListener(
            'keyboardWillHide',
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
