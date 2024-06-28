import {Platform} from "react-native";
import {KeyboardEventName} from "react-native/Libraries/Components/Keyboard/Keyboard";

export const getKeyboardEventType = (type: 'show' | 'hide'): KeyboardEventName => {
  if(type === 'hide') {
    return Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
  }

  return Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
}
