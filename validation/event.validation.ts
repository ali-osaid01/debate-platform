import { EVENT_TYPE } from "@/types/interface/event.interface";
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
    .max(150, "Description cannot be longer than 150 characters")
    .required("Description is required"),
  category: yup.string().required("Category is required"),
  location: yup.string().required("Location is required"),
  date:yup.date().required("Date is required"),
  picture: yup.string().required("Event Poster is required"),
  type: yup.string().required("Event Type is required").default(EVENT_TYPE.PUBLIC),
  topic: yup.string().required("Event Topic is required"),
  participants: yup
    .array()
    .of(
      yup.object().shape({
        user: yup.string().required(),
      }),
    )
    .min(1, "At least one participant is required")
    .optional(),
});

export default eventValidation;
