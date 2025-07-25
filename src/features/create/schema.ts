// schema.ts
import * as yup from "yup";

export const CreateEventSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  content: yup
    .string()
    .required("Content is required")
    .min(20, "Content must be at least 20 characters"),
  category: yup.string().required("Category is required"),
  thumbnail: yup
    .mixed()
    .required("Thumbnail is required")
    .test("fileSize", "File too large (max 5MB)", (value) => {
      // Memastikan value adalah File dan ukurannya tidak melebihi 5MB
      return value && (value as File).size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      // Memastikan value adalah File dan tipenya adalah gambar
      return (
        value &&
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          (value as File).type,
        )
      );
    }),
  location: yup.string().required("Location is required"),
  startDate: yup
    .string() // Karena input type="date" mengembalikan string "YYYY-MM-DD"
    .required("Start date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .test("is-valid-date", "Invalid start date", (value) =>
      value ? !isNaN(new Date(value).getTime()) : true,
    ),
  endDate: yup
    .string() // Karena input type="date" mengembalikan string "YYYY-MM-DD"
    .required("End date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .test("is-valid-date", "Invalid end date", (value) =>
      value ? !isNaN(new Date(value).getTime()) : true,
    )
    .test(
      "date-range",
      "End date cannot be before start date",
      function (endDate) {
        const { startDate } = this.parent;
        if (!startDate || !endDate) return true; // Biarkan required() menangani kekosongan
        return new Date(endDate) >= new Date(startDate);
      },
    ),
  name: yup.string().required("Name is required"),
  type: yup.string().required("Type is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be at least 0"),
  availableSeats: yup
    .number()
    .required("Available Seats is required")
    .min(0, "Available Seats must be at least 0"),
});
