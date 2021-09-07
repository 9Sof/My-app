import React from "react";

import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-until";

const HomePage = (props) => {
  return (
    <div>
       <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};
export default HomePage;
