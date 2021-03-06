import React, { Fragment } from "react";
import Head from "next/head";

import { getAllEvents, getEventById } from "../../helpers/api-until";
import EventSummary from "../../components/event-detail/event-summary";
import EventLigistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const EventDetailPage = (props) => {
  const { event } = props;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLigistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const { eventId } = context.params;

  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
  };
};

export const getStaticPaths = async () => {
  const events = await getAllEvents();

  return {
    paths: events.map((event) => ({
      params: {
        eventId: event.id,
      },
    })),
    fallback: false,
  };
};

export default EventDetailPage;
