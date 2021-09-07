import React from "react";

import Events from "../pages/events";
import { getFeaturedEvents } from "../helpers/api-until";

const HomePage = (props) => {
  return (
    <div>
      <Events />
    </div>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 30,
  };
};
export default HomePage;
