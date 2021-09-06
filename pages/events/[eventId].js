import React from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";

const EventDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const event = getEventById(eventId);

  if (!event) {
      return <div>Event not found</div>
  }
  
  return (
    <div>
      <h1>EventDetailPage</h1>
    </div>
  );
};

export default EventDetailPage;
