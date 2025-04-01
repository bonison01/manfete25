
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Ticket, Share2 } from "lucide-react";

const RegisterCTA = () => {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30"></div>
      <div className="absolute inset-0 festival-gradient opacity-90"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Don't Miss the Experience of a Lifetime
          </h2>
          <p className="mb-8 text-lg">
            Reserve your spot at Manfete today and be part of an unforgettable celebration 
            of music, art, and culture.
          </p>
          
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <Calendar className="mx-auto mb-2 h-8 w-8" />
              <h3 className="mb-1 font-semibold">Mark Your Calendar</h3>
              <p className="text-sm text-white/80">June 15-20, 2024</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <Ticket className="mx-auto mb-2 h-8 w-8" />
              <h3 className="mb-1 font-semibold">Limited Passes</h3>
              <p className="text-sm text-white/80">Get yours before they're gone</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <Share2 className="mx-auto mb-2 h-8 w-8" />
              <h3 className="mb-1 font-semibold">Spread the Word</h3>
              <p className="text-sm text-white/80">Bring your friends along</p>
            </div>
          </div>
          
          <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
            <Link to="/register">Register Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RegisterCTA;
