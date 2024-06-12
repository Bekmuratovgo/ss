export type VerifyCodeResponse = {
    token: string;
    user_data: {
        _id: string;
        phone_number: string;
    }
};

export type RequestCodeResponse = {
    success: string,
    code?: string
}