"use client"
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { Button } from '../ui/button';

const GoogleButton = () => {
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log("credential ->", credential)
            const user = result.user;
            console.log('User Info:', user);

        } catch (error) {
            console.error('Error during Google login:', error);
        }
    };

    return (
        <Button variant="outline" className="w-full border-gray-300 text-gray-900 hover:bg-gray-100"
            onClick={handleGoogleLogin}
            type='button'
        >
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
        </Button>
    );
};

export default GoogleButton;
