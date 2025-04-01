
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const events = [
  {
    id: 1,
    title: "Opening Ceremony",
    description: "Join us for the grand opening of Manfete with special performances and speeches.",
    date: "June 15, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Main Stage",
    category: "ceremony",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Art Exhibition",
    description: "Discover works from over 50 local and international artists.",
    date: "June 16, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Gallery Hall",
    category: "exhibition",
    image: "https://images.unsplash.com/photo-1545033131-485ea67fd7c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "Music Concert",
    description: "Live performances from top bands and solo artists throughout the day.",
    date: "June 17, 2024",
    time: "4:00 PM - 11:00 PM",
    location: "Festival Grounds",
    category: "music",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    title: "Cultural Dance Performance",
    description: "Traditional and contemporary dance performances from around the world.",
    date: "June 18, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Performance Arena",
    category: "performance",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    title: "Food Festival",
    description: "Taste cuisines from different cultures and regions.",
    date: "June 19, 2024",
    time: "11:00 AM - 8:00 PM",
    location: "Food Court",
    category: "food",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 6,
    title: "Workshop: Creative Writing",
    description: "Learn creative writing techniques from published authors.",
    date: "June 16, 2024",
    time: "1:00 PM - 3:00 PM",
    location: "Workshop Room A",
    category: "workshop",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 7,
    title: "Film Screening",
    description: "Watch award-winning short films and documentaries.",
    date: "June 17, 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Auditorium",
    category: "film",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 8,
    title: "Closing Ceremony",
    description: "Join us as we wrap up this year's Manfete with special performances and awards.",
    date: "June 20, 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Main Stage",
    category: "ceremony",
    image: "https://images.unsplash.com/photo-1574007195527-ac599d8048a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEvents = (category: string) => {
    return events
      .filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(event => category === "all" || event.category === category);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="bg-festival-dark py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-center text-4xl font-bold text-festival-gold">Events Schedule</h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-gray-300">
              Browse our lineup of performances, workshops, exhibitions, and more at Manfete 2024.
            </p>
            
            <div className="mx-auto max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-gray-700 bg-gray-800 pl-10 text-white placeholder:text-gray-400 focus:border-festival-gold"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mx-auto mb-8 justify-center">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="ceremony">Ceremonies</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="exhibition">Exhibitions</TabsTrigger>
              <TabsTrigger value="workshop">Workshops</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents("all").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredEvents("all").length === 0 && (
                <p className="mt-8 text-center text-muted-foreground">No events match your search.</p>
              )}
            </TabsContent>
            
            <TabsContent value="ceremony" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents("ceremony").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredEvents("ceremony").length === 0 && (
                <p className="mt-8 text-center text-muted-foreground">No ceremony events match your search.</p>
              )}
            </TabsContent>
            
            <TabsContent value="music" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents("music").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredEvents("music").length === 0 && (
                <p className="mt-8 text-center text-muted-foreground">No music events match your search.</p>
              )}
            </TabsContent>
            
            <TabsContent value="exhibition" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents("exhibition").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredEvents("exhibition").length === 0 && (
                <p className="mt-8 text-center text-muted-foreground">No exhibition events match your search.</p>
              )}
            </TabsContent>
            
            <TabsContent value="workshop" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents("workshop").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredEvents("workshop").length === 0 && (
                <p className="mt-8 text-center text-muted-foreground">No workshop events match your search.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface EventCardProps {
  event: {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
    image: string;
  };
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2 rounded bg-festival-purple/90 px-2 py-1 text-xs font-medium text-white">
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </div>
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
        <Button className="w-full bg-festival-purple hover:bg-festival-purple/90">
          Register for Event
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Events;
