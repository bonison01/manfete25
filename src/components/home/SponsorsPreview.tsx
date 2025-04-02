
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useAnimation, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Sponsor {
  id: string;
  name: string;
  tier: string | null;
  logo_url: string | null;
  description: string | null;
  website_url: string | null;
}

const getTierColor = (tier: string | null) => {
  switch (tier) {
    case 'Platinum':
      return 'bg-gradient-to-r from-purple-400 to-purple-600';
    case 'Gold':
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    case 'Silver':
      return 'bg-gradient-to-r from-gray-400 to-gray-600';
    case 'Bronze':
      return 'bg-gradient-to-r from-amber-600 to-amber-800';
    default:
      return 'bg-gradient-to-r from-blue-400 to-blue-600';
  }
};

const SponsorsPreview = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredSponsor, setHoveredSponsor] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("sponsors")
        .select("*")
        .order("tier", { ascending: false });

      if (error) {
        throw error;
      }

      setSponsors(data || []);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInView && isAutoScrolling && sponsors.length > 4) {
      controls.start({
        x: [0, -1500],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear"
          }
        }
      });
    } else {
      controls.stop();
    }
    
    return () => {
      controls.stop();
    };
  }, [isInView, isAutoScrolling, controls, sponsors.length]);
  
  const handleManualScroll = (direction: 'left' | 'right') => {
    setIsAutoScrolling(false);
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-primary sm:text-4xl">Our Sponsors</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Manfete 2025 wouldn't be possible without the generous support of our sponsors.
            <br />The largest cultural event in Manipur, brought to you by Manipur University.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-festival-purple" />
          </div>
        ) : sponsors.length > 0 ? (
          <div className="relative">
            <div 
              ref={containerRef}
              className="overflow-hidden"
            >
              <motion.div 
                className="flex gap-6 min-w-max py-4"
                animate={sponsors.length > 4 ? controls : undefined}
                initial={{ x: 0 }}
                onHoverStart={() => setIsAutoScrolling(false)}
                onHoverEnd={() => setIsAutoScrolling(true)}
              >
                {/* Duplicate sponsors for infinite loop effect if there are enough */}
                {[...sponsors, ...(sponsors.length > 4 ? sponsors : [])].map((sponsor, index) => (
                  <motion.div
                    key={`${sponsor.id}-${index}`}
                    className="flex-none w-44 flex flex-col items-center justify-center rounded-lg border border-muted p-4 transition-all hover:shadow-md"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                    }}
                    onHoverStart={() => setHoveredSponsor(sponsor.id)}
                    onHoverEnd={() => setHoveredSponsor(null)}
                  >
                    <img 
                      src={sponsor.logo_url || "https://via.placeholder.com/200x80?text=" + sponsor.name} 
                      alt={sponsor.name} 
                      className="h-16 w-auto" 
                    />
                    <p className="mt-2 text-sm font-medium">{sponsor.name}</p>
                    <motion.div 
                      className={`mt-1 h-1 w-0 rounded-full ${getTierColor(sponsor.tier)}`}
                      animate={{ width: hoveredSponsor === sponsor.id ? '80%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="text-xs text-muted-foreground">{sponsor.tier || "Sponsor"}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {sponsors.length > 4 && (
              <>
                <button 
                  onClick={() => handleManualScroll('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white rounded-r-full p-2 hover:bg-black/40 transition-colors z-10"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button 
                  onClick={() => handleManualScroll('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white rounded-l-full p-2 hover:bg-black/40 transition-colors z-10"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No sponsors found.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/sponsors">View All Sponsors</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SponsorsPreview;
