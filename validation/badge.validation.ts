import * as yup from 'yup';

 const badgeValidation = yup.object().shape({
    image: yup.string().required("Image is required"),
    name: yup.string().required("name is required"),
});

export { badgeValidation }