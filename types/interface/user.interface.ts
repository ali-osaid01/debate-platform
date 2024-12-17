export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  socialAuth: string;
  dob: Date;
  phone: string;
  settings: {
    notification: boolean;
  };
  location: string;
  customer:string;
  subscription:{
    subscriptionId: string;
    subscriptionStatus: string;
    subscriptionPlan: string;
    subscriptionStart: Date;
    subscriptionEnd: Date;
  }
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

export interface IUsers {
  data: IUser[];
}
