import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";

import EventSummary from "../../components/event-detail/event-summary";
import EventLigistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const EventDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const event = getEventById(eventId);

  if (!event) {
      return <div>Event not found</div>
  }

  return (
    <div>
      <Fragment>
          <EventSummary title={event.title}/>
          <EventLigistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
          <EventContent>
              <p>{event.description}</p>
          </EventContent>
      </Fragment>
    </div>
  );
};

export default EventDetailPage;
