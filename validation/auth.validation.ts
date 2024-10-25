import * as yup from 'yup';

const loginValidation = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

const registerValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name cannot be longer than 50 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const forgetPasswordValidation = yup.object().shape({
  email: yup
  .string()
  .email('Please enter a valid email address')
  .required('Email is required'),
})

export { loginValidation, registerValidation,forgetPasswordValidation };