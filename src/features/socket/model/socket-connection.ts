import { io } from 'socket.io-client';

export const getSocket = (token?: string, query?: any) => {
    const socket = io('http://5.35.89.71:3001', {
        // autoConnect: false,
        ...(token ? { auth: { token }} : {}),
        ...(query ? { query } : {})
    });

    return socket;
};