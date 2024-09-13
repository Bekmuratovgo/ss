import { profileApi } from "../api/ProfileApi";

export const getProfile = async () => {
    const { data } = await profileApi.getProfile();
    return data;
}

export const updateProfile = async (updateData) => {
    const { data } = await profileApi.updateProfile(updateData);
    return data;
}

export const updateFcmToken = async (token: string, phone_number: string) => {
    const { data } = await profileApi.updateFcmToken(token, phone_number);
    return data;
}

export const getLatestVersionApp = async () => {
    const data = await profileApi.getLatestVersionApp();
    
    return data;
}