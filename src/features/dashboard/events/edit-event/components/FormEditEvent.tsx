"use client";

import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useGetEventBySlug from "@/features/events/event-detail/api/useGetEventBySlug";
import useEditEvent from "../api/useEditEvent";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";

interface FormEditEventProps {
  slug: string;
}

const FormEditEvent = ({ slug }: FormEditEventProps) => {
  const { data: session } = useSession();
  const { data: event, isPending } = useGetEventBySlug(slug);
  const { mutateAsync: updateEvent } = useEditEvent(slug, session);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: event?.title || "",
      description: event?.description || "",
      content: event?.content || "<p></p>", // default minimal HTML
      category: event?.category || "",
      location: event?.location || "",
      startDate: event?.startDate
        ? new Date(event.startDate).toISOString().slice(0, 10)
        : "",
      endDate: event?.endDate
        ? new Date(event.endDate).toISOString().slice(0, 10)
        : "",
      thumbnail: null,
    },
    onSubmit: async (values) => {
      await updateEvent(values);
    },
  });

  if (isPending) return <Loading />;
  if (!event) return <NoData />;
  if (event.userId !== Number(session?.user.id))
    return <div>403 Forbidden</div>;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mx-auto grid w-full max-w-6xl gap-8 p-6 md:p-10"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.title}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.category}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.location}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.startDate}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.endDate}
            required
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.description}
          required
          className="min-h-[100px]"
        />
      </div>

      <TiptapRichtextEditor
        key={event.slug}
        label="Content"
        field="content"
        isTouch={formik.touched.content}
        content={formik.values.content}
        onChange={(value: string) => formik.setFieldValue("content", value)}
        setError={formik.setFieldError}
        setTouch={formik.setFieldTouched}
      />

      {/* Thumbnail logic bisa diaktifin kalau nanti perlu */}

      <div className="grid gap-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          id="thumbnail"
          name="thumbnail"
          type="file"
          accept="image/*"
          onChange={(e) =>
            formik.setFieldValue(
              "thumbnail",
              e.currentTarget.files?.[0] ?? null,
            )
          }
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Update Event"}
        </Button>
      </div>
    </form>
  );
};

export default FormEditEvent;
