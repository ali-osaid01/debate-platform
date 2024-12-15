import * as yup from "yup";

const eventValidation = yup.object().shape({
  title: yup
    .string()
    .min(2, "Title must be at least 2 characters long")
    .max(20, "Title cannot be longer than 20 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(40, "Description cannot be longer than 40 characters")
    .required("Description is required"),
  category: yup.string().required("Category is required"),
  subCategory: yup.string().required("Sub Category is required"), // Changed from duplicate 'title'
  location: yup.string().required("Location is required"),
  picture: yup.string().required("Event Poster is required"),
  type: yup.string().required("Event Type is required"),
  topic: yup.string().required("Event Topic is required"),
  participants: yup
    .array()
    .of(
      yup.object().shape({
        user: yup.string().required("Each participant must have a user ID"),
      }),
    )
    .min(1, "At least one participant is required") // Optional: enforce minimum participants
    .required("Participants are required"),
});

export default eventValidation;
