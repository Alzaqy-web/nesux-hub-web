"use client";

import { useParams } from "next/navigation";
import FormEditEvent from "../components/FormEditEvent";

const EditEventPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  if (!slug) return <div>Event not found</div>;

  return <FormEditEvent slug={slug} />;
};

export default EditEventPage;
