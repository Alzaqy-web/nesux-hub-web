import EventDetailPage from "@/features/events/event-detail";

const EventDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  return <EventDetailPage slug={slug} />;
};

export default EventDetail;
