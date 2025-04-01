
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
    title: "Inauguration",
    description: "Opening ceremony of Manfete 2025",
    date: "April 24, 2025",
    time: "11:00 AM",
    location: "Auditorium, MU",
    category: "ceremony",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    day: "day1"
  },
  {
    id: 2,
    title: "Debate",
    description: "Inter-college debate competition",
    date: "April 24, 2025",
    time: "1:00 PM - 4:00 PM",
    location: "Auditorium, MU",
    category: "academic",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    day: "day1"
  },
  {
    id: 3,
    title: "Quiz",
    description: "Test your knowledge with our challenging quiz competition",
    date: "April 25, 2025",
    time: "12:00 PM - 2:00 PM",
    location: "Auditorium, MU",
    category: "academic",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    day: "day2"
  },
  {
    id: 4,
    title: "Painting",
    description: "Express your creativity through colors and canvas",
    date: "April 25, 2025",
    time: "1:00 PM - 3:00 PM",
    location: "Centenary Hall",
    category: "art",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    day: "day2"
  },
  {
    id: 5,
    title: "Cosplay",
    description: "Dress up as your favorite character in this exciting competition",
    date: "April 25, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Auditorium",
    category: "performance",
    image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    day: "day2"
  },
  {
    id: 6,
    title: "Business Idea",
    description: "Pitch your innovative business concepts to our panel of judges",
    date: "April 25, 2025",
    time: "10:00 PM - 12:00 PM",
    location: "Auditorium",
    category: "academic",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    day: "day2"
  },
  {
    id: 7,
    title: "Photography",
    description: "Showcase your photography skills in this competitive event",
    date: "April 25, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Centenary Hall",
    category: "art",
    image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    day: "day2"
  },
  {
    id: 8,
    title: "Manhunt & Manfete Queen",
    description: "The prestigious personality contest of Manfete 2025",
    date: "April 26, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "New Auditorium",
    category: "performance",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    day: "day3"
  },
  {
    id: 9,
    title: "Prize Distribution",
    description: "Closing ceremony and prize distribution for all events",
    date: "April 26, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "New Auditorium",
    category: "ceremony",
    image: "https://images.unsplash.com/photo-1574007195527-ac599d8048a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    day: "day3"
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
      .filter(event => category === "all" || (category.startsWith("day") ? event.day === category : event.category === category));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="bg-festival-dark py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-center text-4xl font-bold text-festival-gold">Events Schedule</h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-gray-300">
              Browse our lineup of performances, workshops, exhibitions, and more at Manfete 2025.
              <br />
              <span className="text-festival-gold mt-2 inline-block">MIMS, Manipur University</span>
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
              <TabsTrigger value="day1">Day 1 (Apr 24)</TabsTrigger>
              <TabsTrigger value="day2">Day 2 (Apr 25)</TabsTrigger>
              <TabsTrigger value="day3">Day 3 (Apr 26)</TabsTrigger>
              <TabsTrigger value="ceremony">Ceremonies</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="art">Arts</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
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
            
            <TabsContent value="day1" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents("day1").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredEvents("day1").length === 0 && (
                <p className="mt-8 text-center text-muted-foreground">No Day 1 events match your search.</p>
              )}
            </TabsContent>
            
            <TabsContent value="day2" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents("day2").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredEvents("day2").length === 0 && (
                <p className="mt-8 text-center text-muted-foreground">No Day 2 events match your search.</p>
              )}
            </TabsContent>
            
            <TabsContent value="day3" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents("day3").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredEvents("day3").length === 0 && (
                <p className="mt-8 text-center text-muted-foreground">No Day 3 events match your search.</p>
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
            
            <TabsContent value="academic" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents("academic").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredEvents("academic").length === 0 && (
                <p className="mt-8 text-center text-muted-foreground">No academic events match your search.</p>
              )}
            </TabsContent>
            
            <TabsContent value="art" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents("art").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredEvents("art").length === 0 && (
                <p className="mt-8 text-center text-muted-foreground">No art events match your search.</p>
              )}
            </TabsContent>
            
            <TabsContent value="performance" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents("performance").map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredEvents("performance").length === 0 && (
                <p className="mt-8 text-center text-muted-foreground">No performance events match your search.</p>
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
