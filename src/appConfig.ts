import { Platform } from "react-native";
import {
  getBuildNumber,
  getVersion,
  getUniqueId,
} from "react-native-device-info";

const getDevideId = (): string => {
  let deviceID: string = "";

  getUniqueId().then((id) => {
    deviceID = id;
  });

  return deviceID;
};

export const appConfig = {
  deviceId: getDevideId(),
  version: `${getVersion()} (${getBuildNumber()})`,
  isIOS: Platform.OS === "ios",
};
export const APP_URL = "http://95.163.235.158:3001";
export const VERSION = "1.0.1";