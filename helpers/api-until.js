export const getAllEvents = async () => {
  const res = await fetch(
    `https://nextjs-course-501f7-default-rtdb.asia-southeast1.firebasedatabase.app/events.json`
  );
  const data = await res.json();

  const events = [];

  for (const key in data) {
    events.push({
      ...data[key],
      id: key,
    });
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;

  const events = await getAllEvents();

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
