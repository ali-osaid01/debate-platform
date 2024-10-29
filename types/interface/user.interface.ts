export interface IUser {
    id: string;
    _id: string;
    name: string;
    email: string;
    password: string;
    profilePicture:string;
    role: string;
    otp: number;
    fcmToken?: string;
    createdAt: string;
    updatedAt: string;
}