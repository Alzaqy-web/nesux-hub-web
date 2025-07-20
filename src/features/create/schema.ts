// src/app/events/schema/createEventSchema.ts
import * as Yup from "yup";

export const CreateEventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  content: Yup.string().required("Content is required"),
  location: Yup.string().required("Location is required"),
  startDate: Yup.date()
    .typeError("Invalid start date format")
    .required("Start date is required"),
  endDate: Yup.date()
    .typeError("Invalid end date format")
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date cannot be before start date"),
  thumbnail: Yup.mixed()
    .nullable()
    .required("Thumbnail image is required")
    .test("fileSize", "File size is too large (max 5MB)", (value) => {
      return value instanceof File && value.size <= 5 * 1024 * 1024;
    })
    .test(
      "fileType",
      "Unsupported file format (only JPG, PNG, GIF)",
      (value) =>
        value instanceof File &&
        ["image/jpeg", "image/png", "image/gif"].includes(value.type),
    ),

  // tickets: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       name: Yup.string()
  //         .required("Ticket name is required")
  //         .min(3, "Ticket name must be at least 3 characters"),
  //       type: Yup.string()
  //         .required("Ticket type is required")
  //         .oneOf(["paid", "free", "early bird", "vip", "regular"]),
  //       price: Yup.number()
  //         .required("Price is required")
  //         .min(0, "Price cannot be negative"),
  //       availableSeats: Yup.number()
  //         .required("Available seats is required")
  //         .integer("Available seats must be an integer")
  //         .min(1, "At least 1 seat is required"),
  //     }),
  //   )
  //   .min(1, "At least one ticket type is required")
  //   .required("Tickets are required"),
});
