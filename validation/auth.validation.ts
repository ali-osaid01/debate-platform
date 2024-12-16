import * as yup from "yup";

const loginValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const registerValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot be longer than 50 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  username: yup
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(20, "Username cannot be longer than 20 characters")
    .matches(/^[^\s]+$/, "Username cannot contain spaces")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const forgetPasswordValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});
const onboardingValidation = yup.object({
  username: yup.string().required("Username is required"),
  age: yup
    .number()
    .required("Age is required")
    .min(13, "You must be at least 13 years old"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?\d{10,15}$/, "Enter a valid phone number"),
  interest: yup.string().required("Interest is required"),
  language: yup.string().required("Language is required"),
  location: yup.object({
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
  }),
  topicSelection: yup.string().required("Topic selection is required"),
});
export {
  loginValidation,
  registerValidation,
  forgetPasswordValidation,
  onboardingValidation,
};
