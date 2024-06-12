import { profileApi } from "../api/ProfileApi";

export const getProfile = async () => {
    const { data } = await profileApi.getProfile();
    return data;
}

export const updateProfile = async (updateData) => {
    const { data } = await profileApi.updateProfile(updateData);
    return data;
}

export const updateFcmToken = async (token: string) => {
    const { data } = await profileApi.updateFcmToken(token);
    return data;
}