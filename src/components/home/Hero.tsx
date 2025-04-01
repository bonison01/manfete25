
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

const Hero = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Set event date to 3 months from now
  const eventDate = new Date();
  eventDate.setMonth(eventDate.getMonth() + 3);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="relative bg-festival-dark py-20 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30"></div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="festival-heading mb-4 animate-fade-in text-festival-gold">
            MANFETE <span className="text-white">2024</span>
          </h1>
          <p className="festival-subheading mb-8 animate-fade-in text-gray-300">
            Celebrating Culture, Art & Community
          </p>
          
          <div className="mb-8 flex items-center justify-center space-x-2 sm:space-x-4 text-white">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-festival-gold" />
              <span>{formatDate(eventDate)}</span>
            </div>
            <span className="text-gray-400">|</span>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-festival-gold" />
              <span>Central Park, New York</span>
            </div>
            <span className="hidden sm:inline text-gray-400">|</span>
            <div className="hidden sm:flex items-center">
              <Users className="mr-2 h-5 w-5 text-festival-gold" />
              <span>5,000+ Attendees</span>
            </div>
          </div>

          <div className="mb-12">
            <p className="mb-4 text-xl">The countdown begins:</p>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              <div className="rounded-lg bg-festival-dark/70 p-2 sm:p-4 backdrop-blur-sm border border-white/10">
                <div className="text-2xl sm:text-4xl font-bold text-festival-gold animate-count-up">{days}</div>
                <div className="text-xs sm:text-sm text-gray-300">Days</div>
              </div>
              <div className="rounded-lg bg-festival-dark/70 p-2 sm:p-4 backdrop-blur-sm border border-white/10">
                <div className="text-2xl sm:text-4xl font-bold text-festival-gold animate-count-up">{hours}</div>
                <div className="text-xs sm:text-sm text-gray-300">Hours</div>
              </div>
              <div className="rounded-lg bg-festival-dark/70 p-2 sm:p-4 backdrop-blur-sm border border-white/10">
                <div className="text-2xl sm:text-4xl font-bold text-festival-gold animate-count-up">{minutes}</div>
                <div className="text-xs sm:text-sm text-gray-300">Minutes</div>
              </div>
              <div className="rounded-lg bg-festival-dark/70 p-2 sm:p-4 backdrop-blur-sm border border-white/10">
                <div className="text-2xl sm:text-4xl font-bold text-festival-gold animate-count-up">{seconds}</div>
                <div className="text-xs sm:text-sm text-gray-300">Seconds</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" className="animate-pulse-light rounded-full bg-festival-purple hover:bg-festival-purple/90">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-white text-white hover:bg-white/10">
              <Link to="/events">View Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
