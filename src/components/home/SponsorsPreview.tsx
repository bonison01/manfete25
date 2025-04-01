
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const sponsors = [
  {
    id: 1,
    name: "TechCorp",
    tier: "Platinum",
    logo: "https://via.placeholder.com/200x80?text=TechCorp",
  },
  {
    id: 2,
    name: "Global Media",
    tier: "Gold",
    logo: "https://via.placeholder.com/200x80?text=GlobalMedia",
  },
  {
    id: 3,
    name: "Urban Apparel",
    tier: "Gold",
    logo: "https://via.placeholder.com/200x80?text=UrbanApparel",
  },
  {
    id: 4,
    name: "Eco Solutions",
    tier: "Silver",
    logo: "https://via.placeholder.com/200x80?text=EcoSolutions",
  },
  {
    id: 5,
    name: "Metro Bank",
    tier: "Silver",
    logo: "https://via.placeholder.com/200x80?text=MetroBank",
  },
  {
    id: 6,
    name: "Local Foods",
    tier: "Bronze",
    logo: "https://via.placeholder.com/200x80?text=LocalFoods",
  },
];

const getTierColor = (tier: string) => {
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
      return '';
  }
};

const SponsorsPreview = () => {
  const [hoveredSponsor, setHoveredSponsor] = useState<number | null>(null);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-primary sm:text-4xl">Our Sponsors</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Manfete 2025 wouldn't be possible without the generous support of our sponsors.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {sponsors.map((sponsor) => (
            <motion.div
              key={sponsor.id}
              className="flex flex-col items-center justify-center rounded-lg border border-muted p-4 transition-all hover:shadow-md"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              onHoverStart={() => setHoveredSponsor(sponsor.id)}
              onHoverEnd={() => setHoveredSponsor(null)}
            >
              <img src={sponsor.logo} alt={sponsor.name} className="h-12 w-auto" />
              <p className="mt-2 text-sm font-medium">{sponsor.name}</p>
              <motion.div 
                className={`mt-1 h-1 w-0 rounded-full ${getTierColor(sponsor.tier)}`}
                animate={{ width: hoveredSponsor === sponsor.id ? '80%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="text-xs text-muted-foreground">{sponsor.tier}</span>
            </motion.div>
          ))}
        </div>

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
