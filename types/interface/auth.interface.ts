export interface ILogin {
  email: string,
  password: string
}

export interface IRegister extends ILogin {
  name: string
  cPassword?: string
}

export interface IOnboarding {
  username: string;
  age: number;
  phoneNumber: string;
  interest: string;
  language: string;
  location: {
    city: string;
    country: string;
  };
  topicSelection: string;
}

export interface IForgetPasswordForm {
  email: string;
}

export interface IVerifyOTP {
  email: string
  otp: number
}

export interface IResetPassword {
  password: string
}