
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Inauguration",
    description: "Opening ceremony of Manfete 2025",
    date: "April 24, 2025",
    time: "11:00 AM",
    location: "Auditorium, MU",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    title: "Cosplay",
    description: "Dress up as your favorite character in this exciting competition",
    date: "April 25, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Auditorium",
    image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 8,
    title: "Manhunt & Manfete Queen",
    description: "The prestigious personality contest of Manfete 2025",
    date: "April 26, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "New Auditorium",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

const EventsPreview = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-primary sm:text-4xl">Upcoming Events</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore our featured events and mark your calendar for an unforgettable experience at Manfete 2025.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/events/${event.id}`}>Event Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-festival-purple hover:bg-festival-purple/90">
            <Link to="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
