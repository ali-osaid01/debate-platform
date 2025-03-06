import { Bell, FileText, HelpCircle, LayoutDashboard, LogOut, Trophy, UserCog, Users } from "lucide-react";

export const vapidKey = "BK2WrcNO5mJn6WwlB7YfMHLBoJHjkxXeOrw-44Sqmx1TGT-NpQsfjP3bCe4TbxeRJqd61LULnHbvs-ko1GBluPg";
export const SUCCESS_REGISTRATION_PASSED: string = "Registered Successfully!";
export const SUCCESS_LOGIN_PASSED: string = "Logged In Successfully!";
export const SUCCESS_LOGOUT_PASS: string = "Logged Out Successfully!";
export const SUCCESS_OTP_VERIFICATION_PASSED: string = "Otp Verified Successfully!";
export const SUCCESS_OTP_SEND_PASSED: string = "Otp Sent Successfully!!";
export const SUCCESS_FILE_UPLOAD = "File Uploaded Successfully";
export const SUCCESS_UPDATE_PROFILE = "Profile Updated Successfully";
export const FOLLOW_USER_SUCCESS = "Followed Successfully";

// errors
export const FOLLOW_USER_FAILED = "User Followed Failed";
export const ERROR_LOGIN: string = "Invalid Credentials!";
export const NETWORK_ERROR: string = "Network Error";
export const SUCCESS_OTP_VERIFICATION_FAILED: string = "Otp Verified Failed!";
export const ERROR_FILE_UPLOAD = "file upload failed";
export const ERROR_VALIDATION: string = "Validation Error!";
export const ERROR_UPDATE_PROFILE = "Profile Update Failed";

export const getPrice = (key: string): string | null => {
    const prices: Record<string, string> = {
        BASIC: "$10",
        PRO: "$25",
        ELITE: "$50"
    };
    return prices[key];
}

export const menuItem = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Users', icon: Users, href: '/users' },
    { name: 'Sub Admin', icon: UserCog, href: '/moderators' },
    { name: 'Bowls club', icon: Trophy, href: '/admin-events' },
    { name: 'Support', icon: HelpCircle, href: '/support' },
    { name: 'Logout', icon: LogOut, href: '/login' },
]