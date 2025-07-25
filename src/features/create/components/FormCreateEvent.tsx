"use client";

import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { Trash } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useCreateEvent from "../api/useCreateEvent";
import { CreateEventSchema } from "../schema";

const FormCreateEvent = () => {
  const { mutateAsync: CreatEvent, isPending } = useCreateEvent();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      thumbnail: null,
      location: "",
      startDate: "",
      endDate: "",
      name: "",
      type: "",
      price: 0,
      availableSeats: 0,
    },
    validationSchema: CreateEventSchema,
    onSubmit: async (values) => {
      console.log("1. Formik onSubmit triggered. Values:", values);
      // Pastikan values di sini sudah benar, termasuk thumbnail sebagai objek File

      // Periksa apakah ada error validasi saat ini (sebelum memanggil mutate)
      // formik.validateForm() akan memperbarui formik.errors
      await formik.validateForm();
      if (Object.keys(formik.errors).length > 0) {
        console.error(
          "1a. Formik has validation errors. Not calling API.",
          formik.errors,
        );
        // Memastikan field yang disentuh diperbarui agar pesan error muncul
        Object.keys(formik.errors).forEach((field) => {
          formik.setFieldTouched(field, true, false);
        });
        return; // Hentikan proses jika ada error validasi
      }

      try {
        await CreatEvent(values);
        console.log("2. CreatEvent (mutation) called successfully.");
      } catch (error) {
        console.error("2a. Error calling CreatEvent mutation:", error);
        // Error dari mutateAsync akan ditangani oleh onError di useCreateEvent
      }
    },
  });

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) thumbnailRef.current.value = "";
  };

  // Clean up object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (selectedImage) URL.revokeObjectURL(selectedImage);
    };
  }, [selectedImage]);

  return (
    // <form
    //   onSubmit={formik.handleSubmit}
    //   className="container mx-auto flex max-w-7xl flex-col gap-8 rounded-lg p-10 shadow-xl"
    // >
    //   <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
    //     <div className="flex flex-col gap-8 lg:col-span-1">
    //       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
    //         <div className="relative col-span-full mb-2 grid gap-2">
    //           <Label htmlFor="title">Title</Label>
    //           <Input
    //             id="title"
    //             name="title"
    //             type="text"
    //             placeholder="Title"
    //             onBlur={formik.handleBlur}
    //             onChange={formik.handleChange}
    //             value={formik.values.title}
    //             required
    //             className="w-full"
    //           />
    //           {!!formik.touched.title && !!formik.errors.title && (
    //             <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
    //               {formik.errors.title}
    //             </p>
    //           )}
    //         </div>

    //         <div className="relative col-span-full mb-2 grid gap-2 md:col-span-1">
    //           <Label htmlFor="category">Category</Label>
    //           <Input
    //             id="category"
    //             name="category"
    //             type="text"
    //             placeholder="e.g., Musik, Sport, Tech"
    //             onBlur={formik.handleBlur}
    //             onChange={formik.handleChange}
    //             value={formik.values.category}
    //             required
    //             className="w-full"
    //           />
    //           {!!formik.touched.category && !!formik.errors.category && (
    //             <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
    //               {formik.errors.category}
    //             </p>
    //           )}
    //         </div>

    //         <div className="relative col-span-full mb-2 grid gap-2 md:col-span-1">
    //           <Label htmlFor="location">Location</Label>
    //           <Input
    //             id="location"
    //             name="location"
    //             type="text"
    //             placeholder="e.g., City Hall, Online"
    //             onBlur={formik.handleBlur}
    //             onChange={formik.handleChange}
    //             value={formik.values.location}
    //             required
    //             className="w-full"
    //           />
    //           {!!formik.touched.location && !!formik.errors.location && (
    //             <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
    //               {formik.errors.location}
    //             </p>
    //           )}
    //         </div>

    //         <div className="relative col-span-full mb-2 grid gap-2 md:col-span-1">
    //           <Label htmlFor="startDate">Start Date</Label>
    //           <Input
    //             id="startDate"
    //             name="startDate"
    //             type="date"
    //             onBlur={formik.handleBlur}
    //             onChange={formik.handleChange}
    //             value={formik.values.startDate}
    //             required
    //             className="w-full"
    //           />
    //           {!!formik.touched.startDate && !!formik.errors.startDate && (
    //             <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
    //               {formik.errors.startDate}
    //             </p>
    //           )}
    //         </div>

    //         <div className="relative col-span-full mb-2 grid gap-2 md:col-span-1">
    //           <Label htmlFor="endDate">End Date</Label>
    //           <Input
    //             id="endDate"
    //             name="endDate"
    //             type="date"
    //             onBlur={formik.handleBlur}
    //             onChange={formik.handleChange}
    //             value={formik.values.endDate}
    //             required
    //             className="w-full"
    //           />
    //           {!!formik.touched.endDate && !!formik.errors.endDate && (
    //             <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
    //               {formik.errors.endDate}
    //             </p>
    //           )}
    //         </div>
    //       </div>

    //       <div className="relative mb-2 grid gap-2">
    //         <Label htmlFor="description">Description</Label>
    //         <Textarea
    //           id="description"
    //           name="description"
    //           placeholder="A brief description of the event.."
    //           onBlur={formik.handleBlur}
    //           onChange={formik.handleChange}
    //           value={formik.values.description}
    //           required
    //           className="min-h-[100px] resize-y"
    //         />
    //         {!!formik.touched.description && !!formik.errors.description && (
    //           <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
    //             {formik.errors.description}
    //           </p>
    //         )}
    //       </div>

    //       {/* Content Section */}
    //       <TiptapRichtextEditor
    //         label="content"
    //         field="content"
    //         isTouch={formik.touched.content}
    //         content={formik.values.content}
    //         onChange={(value: string) => formik.setFieldValue("content", value)}
    //         setError={formik.setFieldError}
    //         setTouch={formik.setFieldTouched}
    //       />

    //       {/* Thumbnail Section */}
    //       <div className="grid gap-2">
    //         <label htmlFor="thumbnail">Thumbnail Image</label>
    //         {selectedImage && (
    //           <div className="relative h-[150px] w-[200px]">
    //             <Image
    //               src={selectedImage}
    //               alt="thumbnail"
    //               className="object-cover"
    //               fill
    //             />
    //             <Button
    //               className="absolute -top-2 -right-2 rounded-full"
    //               variant="destructive"
    //               type="button"
    //               size="icon"
    //               onClick={removeThumbnail}
    //             >
    //               <Trash />
    //             </Button>
    //           </div>
    //         )}

    //         <Input
    //           ref={thumbnailRef}
    //           id="thumbnail"
    //           name="thumbnail"
    //           type="file"
    //           placeholder="Thumbnail"
    //           accept="image/*"
    //           onChange={onChangeThumbnail}
    //           className="mt-2"
    //         />
    //         {!!formik.touched.thumbnail && !!formik.errors.thumbnail && (
    //           <p className="mt-1 text-xs text-red-500">
    //             {formik.errors.thumbnail}
    //           </p>
    //         )}
    //       </div>
    //     </div>
    //     <div className="">
    //       <div className="relative col-span-full mb-2 gap-2 md:col-span-1">
    //         <Label htmlFor="name">Name</Label>
    //         <Input
    //           id="name"
    //           name="name"
    //           type="text"
    //           placeholder="e.g., Concert"
    //           onBlur={formik.handleBlur}
    //           onChange={formik.handleChange}
    //           value={formik.values.name}
    //           required
    //           className="w-full"
    //         />
    //         {!!formik.touched.name && !!formik.errors.name && (
    //           <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
    //             {formik.errors.name}
    //           </p>
    //         )}
    //       </div>

    //       <div className="relative col-span-full mb-2 gap-10 md:col-span-1">
    //         <Label htmlFor="type">Type</Label>
    //         <Input
    //           id="type"
    //           name="type"
    //           type="text"
    //           placeholder="e.g., vip, general, free"
    //           onBlur={formik.handleBlur}
    //           onChange={formik.handleChange}
    //           value={formik.values.type}
    //           required
    //           className="w-full"
    //         />
    //         {!!formik.touched.type && !!formik.errors.type && (
    //           <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
    //             {formik.errors.type}
    //           </p>
    //         )}
    //       </div>

    //       <div className="relative col-span-full mb-2 grid gap-2 md:col-span-1">
    //         <Label htmlFor="availableSeats">Available Seats</Label>
    //         <Input
    //           id="availableSeats"
    //           name="availableSeats"
    //           type="number"
    //           placeholder="e.g., 100"
    //           onBlur={formik.handleBlur}
    //           onChange={formik.handleChange}
    //           value={formik.values.availableSeats}
    //           required
    //           className="w-full"
    //         />
    //         {!!formik.touched.availableSeats &&
    //           !!formik.errors.availableSeats && (
    //             <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
    //               {formik.errors.availableSeats}
    //             </p>
    //           )}
    //       </div>

    //       <div className="relative col-span-full mb-2 grid gap-2 md:col-span-1">
    //         <Label htmlFor="price">Price</Label>
    //         <Input
    //           id="price"
    //           name="price"
    //           type="number"
    //           placeholder="e.g.,Rp. 10000"
    //           onBlur={formik.handleBlur}
    //           onChange={formik.handleChange}
    //           value={formik.values.price}
    //           required
    //           className="w-full"
    //         />
    //         {!!formik.touched.price && !!formik.errors.price && (
    //           <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
    //             {formik.errors.price}
    //           </p>
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="mt-8 flex justify-end">
    //     <div className="mt-6 w-full md:w-auto">
    //       <Button
    //         type="submit"
    //         disabled={isPending}
    //         className="w-full md:w-auto"
    //       >
    //         {isPending ? "Loading" : "Submit"}
    //       </Button>
    //     </div>
    //   </div>
    // </form>
    <form
      onSubmit={formik.handleSubmit}
      className="container mx-auto flex max-w-7xl flex-col gap-8 p-10 shadow-lg"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        {/* LEFT COLUMN: Event Details */}
        <div className="flex flex-col gap-8 lg:col-span-1">
          <h2 className="mb-4 border-b pb-4 text-2xl font-bold text-slate-600">
            Event Create
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Menggunakan md:grid-cols-2 untuk input di dalam */}
            <div className="relative col-span-full grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
                required
                className="w-full"
              />
              {!!formik.touched.title && !!formik.errors.title && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                  {formik.errors.title}
                </p>
              )}
            </div>
            <div className="relative col-span-full grid gap-2 md:col-span-1">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                type="text"
                placeholder="e.g., Musik, Sport, Tech"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.category}
                required
                className="w-full"
              />
              {!!formik.touched.category && !!formik.errors.category && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                  {formik.errors.category}
                </p>
              )}
            </div>
            <div className="relative col-span-full grid gap-2 md:col-span-1">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="e.g., City Hall, Online"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.location}
                required
                className="w-full"
              />
              {!!formik.touched.location && !!formik.errors.location && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                  {formik.errors.location}
                </p>
              )}
            </div>
            <div className="relative col-span-full grid gap-2 md:col-span-1">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.startDate}
                required
                className="w-full"
              />
              {!!formik.touched.startDate && !!formik.errors.startDate && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                  {formik.errors.startDate}
                </p>
              )}
            </div>
            <div className="relative col-span-full grid gap-2 md:col-span-1">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.endDate}
                required
                className="w-full"
              />
              {!!formik.touched.endDate && !!formik.errors.endDate && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                  {formik.errors.endDate}
                </p>
              )}
            </div>
          </div>{" "}
          {/* End of grid-cols-2 for event details */}
          <div className="relative grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="A brief description of the event.."
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              required
              className="min-h-[100px] resize-y"
            />
            {!!formik.touched.description && !!formik.errors.description && (
              <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                {formik.errors.description}
              </p>
            )}
          </div>
          {/* Content Section */}
          <TiptapRichtextEditor
            label="Content"
            field="content"
            isTouch={formik.touched.content}
            content={formik.values.content}
            onChange={(value: string) => formik.setFieldValue("content", value)}
            setError={formik.setFieldError}
            setTouch={formik.setFieldTouched}
          />
          {/* Thumbnail Section */}
          <div className="grid gap-2">
            <Label htmlFor="thumbnail">Thumbnail Image</Label>
            {selectedImage && (
              <div className="relative h-[150px] w-[200px] overflow-hidden rounded-md border border-gray-300 shadow-sm">
                <Image
                  src={selectedImage}
                  alt="thumbnail"
                  className="object-cover"
                  fill
                />
                <Button
                  className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full p-0"
                  variant="destructive"
                  type="button"
                  size="icon"
                  onClick={removeThumbnail}
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            )}

            <Input
              ref={thumbnailRef}
              id="thumbnail"
              name="thumbnail"
              type="file"
              placeholder="Thumbnail"
              accept="image/*"
              onChange={onChangeThumbnail}
              className="mt-2"
            />
            {!!formik.touched.thumbnail && !!formik.errors.thumbnail && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.thumbnail}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Ticket Details */}
        <div className="flex flex-col gap-8 rounded-lg border p-6 shadow-md">
          <h2 className="mb-4 border-b pb-4 text-2xl font-bold text-slate-600">
            Ticket Details
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {" "}
            {/* Menggunakan grid di sini untuk tiket input */}
            <div className="relative grid gap-2">
              <Label htmlFor="name">Ticket Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="e.g., VIP, General, Free"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                required
                className="w-full"
              />
              {!!formik.touched.name && !!formik.errors.name && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="relative grid gap-2">
              <Label htmlFor="type">Ticket Type</Label>
              <Input
                id="type"
                name="type"
                type="text"
                placeholder="e.g., vip, general, free"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.type}
                required
                className="w-full"
              />
              {!!formik.touched.type && !!formik.errors.type && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                  {formik.errors.type}
                </p>
              )}
            </div>
            <div className="relative grid gap-2">
              <Label htmlFor="availableSeats">Available Seats</Label>
              <Input
                id="availableSeats"
                name="availableSeats"
                type="number"
                placeholder="e.g., 100"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.availableSeats}
                required
                className="w-full"
              />
              {!!formik.touched.availableSeats &&
                !!formik.errors.availableSeats && (
                  <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                    {formik.errors.availableSeats}
                  </p>
                )}
            </div>
            <div className="relative grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="e.g., Rp. 10000"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.price}
                required
                className="w-full"
              />
              {!!formik.touched.price && !!formik.errors.price && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                  {formik.errors.price}
                </p>
              )}
            </div>
          </div>{" "}
          {/* End of grid for ticket details */}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <div className="mt-6 w-full md:w-auto">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full px-8 py-3 text-lg font-semibold md:w-auto"
          >
            {isPending ? "Loading..." : "Submit Event"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormCreateEvent;
