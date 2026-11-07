import { EventsView } from "@/components/events/EventsView";

export const metadata = {
  title: "Events",
  description: "Rides, shows, and garage nights around Milwaukee.",
};

export default function EventsPage() {
  return <EventsView />;
}
