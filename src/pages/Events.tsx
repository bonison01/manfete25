
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Search, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string | null;
  image_url: string | null;
  price: number;
  category?: string;
  day?: string;
}

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        throw error;
      }

      // Process events to add category and day properties
      const processedEvents = data.map(event => {
        const eventDate = new Date(event.date);
        const day = getEventDay(eventDate);
        const category = getEventCategory(event.title);
        
        return {
          ...event,
          category,
          day
        };
      });

      setEvents(processedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to determine event day
  const getEventDay = (date: Date): string => {
    const april24 = new Date("2025-04-24");
    const april25 = new Date("2025-04-25");
    const april26 = new Date("2025-04-26");
    
    if (date.toDateString() === april24.toDateString()) return "day1";
    if (date.toDateString() === april25.toDateString()) return "day2";
    if (date.toDateString() === april26.toDateString()) return "day3";
    return "other";
  };

  // Helper function to determine event category
  const getEventCategory = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes("inauguration") || lowerTitle.includes("distribution") || lowerTitle.includes("closing")) return "ceremony";
    if (lowerTitle.includes("debate") || lowerTitle.includes("quiz") || lowerTitle.includes("business")) return "academic";
    if (lowerTitle.includes("painting") || lowerTitle.includes("photography")) return "art";
    if (lowerTitle.includes("cosplay") || lowerTitle.includes("manhunt") || lowerTitle.includes("queen")) return "performance";
    
    return "other";
  };

  const filteredEvents = (category: string) => {
    return events
      .filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .filter(event => category === "all" || (category.startsWith("day") ? event.day === category : event.category === category));
  };

  const handleRegister = (eventId: string) => {
    navigate(`/register?event=${eventId}`);
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
        
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-festival-purple" />
          </div>
        ) : (
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
                    <EventCard key={event.id} event={event} onRegister={handleRegister} />
                  ))}
                </div>
                {filteredEvents("all").length === 0 && (
                  <p className="mt-8 text-center text-muted-foreground">No events match your search.</p>
                )}
              </TabsContent>
              
              <TabsContent value="day1" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents("day1").map((event) => (
                    <EventCard key={event.id} event={event} onRegister={handleRegister} />
                  ))}
                </div>
                {filteredEvents("day1").length === 0 && (
                  <p className="mt-8 text-center text-muted-foreground">No Day 1 events match your search.</p>
                )}
              </TabsContent>
              
              <TabsContent value="day2" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents("day2").map((event) => (
                    <EventCard key={event.id} event={event} onRegister={handleRegister} />
                  ))}
                </div>
                {filteredEvents("day2").length === 0 && (
                  <p className="mt-8 text-center text-muted-foreground">No Day 2 events match your search.</p>
                )}
              </TabsContent>
              
              <TabsContent value="day3" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents("day3").map((event) => (
                    <EventCard key={event.id} event={event} onRegister={handleRegister} />
                  ))}
                </div>
                {filteredEvents("day3").length === 0 && (
                  <p className="mt-8 text-center text-muted-foreground">No Day 3 events match your search.</p>
                )}
              </TabsContent>
              
              <TabsContent value="ceremony" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents("ceremony").map((event) => (
                    <EventCard key={event.id} event={event} onRegister={handleRegister} />
                  ))}
                </div>
                {filteredEvents("ceremony").length === 0 && (
                  <p className="mt-8 text-center text-muted-foreground">No ceremony events match your search.</p>
                )}
              </TabsContent>
              
              <TabsContent value="academic" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents("academic").map((event) => (
                    <EventCard key={event.id} event={event} onRegister={handleRegister} />
                  ))}
                </div>
                {filteredEvents("academic").length === 0 && (
                  <p className="mt-8 text-center text-muted-foreground">No academic events match your search.</p>
                )}
              </TabsContent>
              
              <TabsContent value="art" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents("art").map((event) => (
                    <EventCard key={event.id} event={event} onRegister={handleRegister} />
                  ))}
                </div>
                {filteredEvents("art").length === 0 && (
                  <p className="mt-8 text-center text-muted-foreground">No art events match your search.</p>
                )}
              </TabsContent>
              
              <TabsContent value="performance" className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents("performance").map((event) => (
                    <EventCard key={event.id} event={event} onRegister={handleRegister} />
                  ))}
                </div>
                {filteredEvents("performance").length === 0 && (
                  <p className="mt-8 text-center text-muted-foreground">No performance events match your search.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

interface EventCardProps {
  event: Event;
  onRegister: (eventId: string) => void;
}

const EventCard = ({ event, onRegister }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"}
          alt={event.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        {event.category && (
          <div className="absolute top-2 right-2 rounded bg-festival-purple/90 px-2 py-1 text-xs font-medium text-white">
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-primary" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-primary" />
            <span>{formatTime(event.date)}</span>
          </div>
          {event.location && (
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-primary" />
              <span>{event.location}</span>
            </div>
          )}
          <div className="flex items-center">
            <IndianRupee className="mr-2 h-4 w-4 text-primary" />
            <span>{event.price > 0 ? `₹${event.price}` : 'Free'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-festival-purple hover:bg-festival-purple/90"
          onClick={() => onRegister(event.id)}
        >
          Register for Event
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Events;
