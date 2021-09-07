import React, { Fragment } from "react";

import EventList from "../../components/events/EventList";
import { getFilteredEvents } from "../../helpers/api-until";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";

const FilteredEventsPage = (props) => {
  const { filteredEvents, eventDate } = props;

  // if (!slug) {
  //   return <p className="center">Loading...</p>;
  // }

  if (props.hasError) {
    return (
      <div className="center">
        <p>Invalid filter.</p>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="center">
        <p>No event found!</p>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const date = new Date(eventDate.year, eventDate.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.params;

  const year = +slug[0];
  const month = +slug[1];
  console.log(year, month);

  const filteredEvents = await getFilteredEvents({ year, month });

  if (isNaN(year) || isNaN(month)) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  return {
    props: {
      filteredEvents,
      eventDate: {
        year,
        month,
      },
    },
  };
};
export default FilteredEventsPage;
