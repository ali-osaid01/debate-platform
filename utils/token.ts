import { setCookie } from 'cookies-next';

export const saveAccessToken = (token: string) => {
    const maxAge = 20 * 24 * 60 * 60; 
    setCookie('accessToken', token, { maxAge });
    localStorage.setItem('accessToken', token);
};