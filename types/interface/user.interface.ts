export interface IUser {
  id: string;
  _id: string;
  name: string;
  email: string;
  bio: string;
  socialAuth: string;
  dob: Date;
  phone: string;
  settings: {
    notification: boolean;
  };
  location: string;
  gender: string;
  isProfileCompleted: boolean;
  profilePicture: string | null;
  password: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  role: string;
  otp: number;
  fcmToken?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}
