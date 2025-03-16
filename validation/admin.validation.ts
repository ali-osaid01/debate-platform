import * as yup from 'yup';

 const createAdminSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    phoneNumber: yup.string().required("Phone number is required"),
});

export { createAdminSchema }