import { useRouter } from "next/dist/client/router";
import React, { Fragment } from "react";

import EventList from "../../components/events/EventList";
import { getFilteredEvents } from "../../dummy-data";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";

const FilteredEventsPage = () => {
  const router = useRouter();

  const { slug } = router.query;

  if (!slug) {
    return <p className="center">Loading...</p>;
  }

  const year = +slug[0];
  const month = +slug[1];

  if (isNaN(year) || isNaN(month)) {
    return (
      <div className="center">
        <p>Invalid filter.</p>
        <Button link="/events">Show All Events</Button>;
      </div>
    );
  }

  const filteredEvents = getFilteredEvents({ year, month });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="center">
        <p>No event found!</p>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
