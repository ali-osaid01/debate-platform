import * as Yup from "yup";

const userValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(50, "Name must be at most 50 characters")
    .optional(),
  phone: Yup.string().optional(),
  username: Yup.string().optional(),
  location: Yup.string()
    .trim()
    .max(100, "Location must be at most 100 characters")
    .optional(),
  profilePicture: Yup.string().optional(),
  website: Yup.string().url().optional(),
  bio: Yup.string().max(100),
});

export default userValidationSchema;
