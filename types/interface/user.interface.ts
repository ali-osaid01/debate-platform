export interface ISubscription {
  plan: string;
  subscribe: boolean;
  price: string;
  product: string;
  subscriptionAuth: string;
  expirytime: Date;
}
export interface IBadge {
  _id:string
  id:string
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  id:string;
  firstname: string;
  lastname:string;
  name: string;
  username: string;
  email: string;
  online:boolean;
  isActive:boolean
  bio: string;
  socialAuth: string;
  dob: Date;
  phone: string;
  badge: [IBadge];
  settings: {
    notification: boolean;
  };
  score:number;
  location: string;
  customer:string;
  subscription:ISubscription;
  gender: string;
  isProfileCompleted: boolean;
  profilePicture: string;
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
