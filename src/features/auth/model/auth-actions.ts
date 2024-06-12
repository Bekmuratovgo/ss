import { authApi } from '../api/AuthApi';
import { RequestCodeResponse } from '../types/AuthResponse';

export const requestCode = async (phone: string): Promise<RequestCodeResponse> => {
    const { data } = await authApi.requestCode(phone);
    // console.log('Request code response: ', data);
    return data;
};

export const verifyCode = async (phone: string, code: string) => {
    const { data } = await authApi.verifyCode(phone, code);
    // console.log('Verify code response: ', data);
    return data;
};