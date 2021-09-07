import { useRouter } from "next/dist/client/router";
import React, { Fragment } from "react";

import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../helpers/api-until";

const AllEventsPage = (props) => {
  const { events } = props;
  const router = useRouter();

  const onSearch = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };
  return (
    <Fragment>
      <EventSearch onSearch={onSearch} />
      <EventList items={events} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
