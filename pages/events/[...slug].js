import React, { Fragment } from "react";
import useSWR from "swr";
import Head from "next/head";

import EventList from "../../components/events/EventList";
import { getFilteredEvents } from "../../helpers/api-until";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";

const FilteredEventsPage = (props) => {
  const [events, setEvents] = React.useState();
  const { filteredEvents, eventDate } = props;

  // const { data, error } = useSWR(
  //   `https://nextjs-course-501f7-default-rtdb.asia-southeast1.firebasedatabase.app/events.json`
  // );

  // React.useEffect(() => {
  //   if (data) {
  //     const events = [];

  //     for (const key in data) {
  //       events.push({ ...data[key], id: key });
  //     }

  //     setEvents(events);
  //   }
  // }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events.`} />
    </Head>
  );

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${eventDate.month}/${eventDate.year}.`}
      />
    </Head>
  );

  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <div className="center">
          <p>Invalid filter.</p>
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <div className="center">
          <p>No event found!</p>
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const date = new Date(eventDate.year, eventDate.month - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.params;

  const year = +slug[0];
  const month = +slug[1];

  const filteredEvents = await getFilteredEvents({ year, month });

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2020 ||
    month > 12 ||
    month < 1
  ) {
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
