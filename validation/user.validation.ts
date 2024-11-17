import * as Yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';

const userValidationSchema = Yup.object({
    name: Yup.string()
        .trim()
        .max(50, 'Name must be at most 50 characters')
        .optional(),
    phone: Yup.string()
        .optional()
        .test(
            'is-valid-phone',
            'Phone number is invalid',
            (value) => !value || isValidPhoneNumber(value),
        ),
    location: Yup.string()
        .trim()
        .max(100, 'Location must be at most 100 characters')
        .optional(),
    profilePicture: Yup.string()
        .url('Profile picture must be a valid URL')
        .optional(),
        website: Yup.string().url().optional()
});

export default userValidationSchema;
