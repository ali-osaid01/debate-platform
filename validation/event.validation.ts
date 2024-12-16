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
  location: yup.string().required("Location is required"),
  picture: yup.string().required("Event Poster is required"),
  type: yup.string().required("Event Type is required"),
  topic: yup.string().required("Event Topic is required"),
  participants: yup
    .array()
    .of(
      yup.object().shape({
        user: yup.mixed(),
        // .test(
        //   "isValidUser",
        //   "User must be an object with valid fields or a string",
        //   (value) =>
        //     typeof value === "string" ||
        //     (typeof value === "object" &&
        //       value !== null &&
        //       "_id" in value &&
        //       "username" in value),
        // ),
      }),
    )
    .min(1, "At least one participant is required")
    .required("Participants are required"),
});

export default eventValidation;
