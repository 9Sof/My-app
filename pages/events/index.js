import { useRouter } from "next/dist/client/router";
import React, { Fragment } from "react";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../dummy-data";

const AllEventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const onSearch = (year, month) => {
    router.push(`/events/${year}/${month}`)
  };
  return (
    <Fragment>
      <EventSearch onSearch={onSearch} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;
