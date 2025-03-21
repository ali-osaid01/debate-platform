import * as yup from 'yup';

 const createAdminSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    name: yup.string().required("name is required"),
    phone: yup.string().required("Phone number is required"),
});

export { createAdminSchema }