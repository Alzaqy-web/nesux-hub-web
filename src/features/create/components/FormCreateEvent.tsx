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
    },
    validationSchema: CreateEventSchema,
    onSubmit: async (values) => {
      await CreatEvent(values);
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
    <form
      onSubmit={formik.handleSubmit}
      className="container mx-auto flex max-w-7xl flex-col gap-8 rounded-lg p-10 shadow-xl"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-8 lg:col-span-1">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="relative col-span-full mb-2 grid gap-2">
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
                <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
                  {formik.errors.title}
                </p>
              )}
            </div>

            <div className="relative col-span-full mb-2 grid gap-2 md:col-span-1">
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
                <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
                  {formik.errors.category}
                </p>
              )}
            </div>

            <div className="relative col-span-full mb-2 grid gap-2 md:col-span-1">
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
                <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
                  {formik.errors.location}
                </p>
              )}
            </div>

            <div className="relative col-span-full mb-2 grid gap-2 md:col-span-1">
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
                <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
                  {formik.errors.startDate}
                </p>
              )}
            </div>

            <div className="relative col-span-full mb-2 grid gap-2 md:col-span-1">
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
                <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
                  {formik.errors.endDate}
                </p>
              )}
            </div>
          </div>

          <div className="relative mb-2 grid gap-2">
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
              <p className="absolute -bottom-4.5 left-0 text-xs text-red-500">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Content Section */}
          <TiptapRichtextEditor
            label="content"
            field="content"
            isTouch={formik.touched.content}
            content={formik.values.content}
            onChange={(value: string) => formik.setFieldValue("content", value)}
            setError={formik.setFieldError}
            setTouch={formik.setFieldTouched}
          />

          {/* Thumbnail Section */}
          <div className="grid gap-2">
            <label htmlFor="thumbnail">Thumbnail Image</label>
            {selectedImage && (
              <div className="relative h-[150px] w-[200px]">
                <Image
                  src={selectedImage}
                  alt="thumbnail"
                  className="object-cover"
                  fill
                />
                <Button
                  className="absolute -top-2 -right-2 rounded-full"
                  variant="destructive"
                  type="button"
                  size="icon"
                  onClick={removeThumbnail}
                >
                  <Trash />
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

        {/* <div className="w-full">
          <TicketsSection formik={formik} />
        </div> */}
      </div>

      <div className="mt-8 flex justify-end">
        <div className="mt-6 w-full md:w-auto">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full md:w-auto"
          >
            {isPending ? "Loading" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormCreateEvent;
