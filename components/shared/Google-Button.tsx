"use client";

import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { Button } from '../ui/button';
import { useFormMutation } from '@/hooks/useFormMutation';
import { googleAuth } from '@/services/auth.service';
import { ERROR_LOGIN, SUCCESS_LOGIN_PASSED } from '@/utils/constant';
import { useUserStore } from '@/store/user.store';
import { useState } from 'react';
import { IUser } from '@/types/interface/user.interface';
import { saveAccessToken } from '@/utils/token';

const GoogleButton = () => {
    const { setUser } = useUserStore();
    const [error, setError] = useState<string | null>(null);

    const { handleFormSubmit,isLoading } = useFormMutation<unknown, Error,Partial<IUser>>({
        mutationFn: googleAuth,
        successMessage: SUCCESS_LOGIN_PASSED,
        errorMessage: ERROR_LOGIN,
        route: '/feed',
    });

    const handleGoogleLogin = async () => {
        setError(null);

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const token = (await result.user.getIdToken()) as string;
            const user = result.user;

            console.log('Firebase User Info:', user);

            const payload:any = await handleFormSubmit({ email: user?.email!, socialAuth:  token,profilePicture:user?.photoURL || undefined,name:user.displayName! });

            console.log("GOOGLE PAYLOAD ->",payload)
            if (payload) {
                saveAccessToken(payload?.data?.data?.accessToken) 
                setUser(payload?.data?.data?.user);
            }
        } catch (err) {
            console.error('Error during Google login:', err);
            setError('Failed to log in with Google. Please try again.');
        }
    };

    return (
        <div className="w-full">
            <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-900 hover:bg-gray-100"
                onClick={handleGoogleLogin}
                type="button"
                disabled={isLoading}
            >
                {isLoading ? (
                    <span>Loading...</span>
                ) : (
                    <>
                        <FcGoogle className="mr-2 h-4 w-4" />
                        Google
                    </>
                )}
            </Button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default GoogleButton;
