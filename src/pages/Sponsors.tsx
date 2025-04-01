import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Info, Award, Star, Trophy, Gift } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { motion } from "framer-motion";

const sponsorsByTier = {
  platinum: [
    {
      id: 1,
      name: "TechCorp",
      logo: "https://via.placeholder.com/300x200?text=TechCorp",
      description: "Global technology company and proud main sponsor of Manfete for the last 5 years.",
      website: "https://example.com",
      highlight: "Exclusive Technology Partner"
    }
  ],
  gold: [
    {
      id: 2,
      name: "Global Media",
      logo: "https://via.placeholder.com/300x200?text=GlobalMedia",
      description: "International media conglomerate helping us share Manfete with the world.",
      website: "https://example.com",
      highlight: "Official Media Partner"
    },
    {
      id: 3,
      name: "Urban Apparel",
      logo: "https://via.placeholder.com/300x200?text=UrbanApparel",
      description: "Fashion brand that celebrates creativity and cultural expression.",
      website: "https://example.com",
      highlight: "Official Merchandise Partner"
    }
  ],
  silver: [
    {
      id: 4,
      name: "Eco Solutions",
      logo: "https://via.placeholder.com/300x200?text=EcoSolutions",
      description: "Sustainable products company helping make Manfete environmentally friendly.",
      website: "https://example.com",
      highlight: "Sustainability Partner"
    },
    {
      id: 5,
      name: "Metro Bank",
      logo: "https://via.placeholder.com/300x200?text=MetroBank",
      description: "Financial institution supporting local cultural initiatives.",
      website: "https://example.com",
      highlight: "Financial Partner"
    },
    {
      id: 6,
      name: "City Hotels",
      logo: "https://via.placeholder.com/300x200?text=CityHotels",
      description: "Official accommodation partner providing special rates for attendees.",
      website: "https://example.com",
      highlight: "Hospitality Partner"
    }
  ],
  bronze: [
    {
      id: 7,
      name: "Local Foods",
      logo: "https://via.placeholder.com/300x200?text=LocalFoods",
      description: "Restaurant chain featuring cuisines from around the world.",
      website: "https://example.com",
      highlight: "Food Partner"
    },
    {
      id: 8,
      name: "Sound Systems Inc",
      logo: "https://via.placeholder.com/300x200?text=SoundSystems",
      description: "Audio equipment provider ensuring top-quality sound at all venues.",
      website: "https://example.com",
      highlight: "Audio Partner"
    },
    {
      id: 9,
      name: "Community College",
      logo: "https://via.placeholder.com/300x200?text=CommCollege",
      description: "Educational institution supporting arts and cultural education.",
      website: "https://example.com",
      highlight: "Education Partner"
    },
    {
      id: 10,
      name: "Transport Co",
      logo: "https://via.placeholder.com/300x200?text=TransportCo",
      description: "Official transportation partner for Manfete.",
      website: "https://example.com",
      highlight: "Transport Partner"
    }
  ]
};

const getTierIcon = (tier: string) => {
  switch (tier) {
    case 'platinum':
      return <Trophy className="h-6 w-6 text-yellow-300" />;
    case 'gold':
      return <Star className="h-6 w-6 text-yellow-500" />;
    case 'silver':
      return <Award className="h-6 w-6 text-gray-400" />;
    case 'bronze':
      return <Gift className="h-6 w-6 text-amber-700" />;
    default:
      return null;
  }
};

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'platinum':
      return 'bg-gradient-to-r from-purple-400 to-purple-600';
    case 'gold':
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    case 'silver':
      return 'bg-gradient-to-r from-gray-400 to-gray-600';
    case 'bronze':
      return 'bg-gradient-to-r from-amber-600 to-amber-800';
    default:
      return '';
  }
};

const Sponsors = () => {
  const [activeTier, setActiveTier] = useState('all');
  const [expandedSponsor, setExpandedSponsor] = useState<number | null>(null);

  const allSponsors = [
    ...sponsorsByTier.platinum.map(s => ({ ...s, tier: 'platinum' })),
    ...sponsorsByTier.gold.map(s => ({ ...s, tier: 'gold' })),
    ...sponsorsByTier.silver.map(s => ({ ...s, tier: 'silver' })),
    ...sponsorsByTier.bronze.map(s => ({ ...s, tier: 'bronze' }))
  ];

  const filteredSponsors = activeTier === 'all' 
    ? allSponsors
    : allSponsors.filter(s => s.tier === activeTier);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="bg-festival-dark py-16 text-white">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="mb-4 text-center text-4xl font-bold text-festival-gold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Sponsors
            </motion.h1>
            <motion.p 
              className="mx-auto mb-8 max-w-2xl text-center text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Manfete 2025 wouldn't be possible without the generous support of our sponsors.
              We're proud to partner with these organizations to bring this cultural celebration to life.
            </motion.p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-6 py-2 font-medium transition ${activeTier === 'all' ? 'bg-festival-purple text-white' : 'bg-muted text-muted-foreground'}`}
              onClick={() => setActiveTier('all')}
            >
              All Sponsors
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-6 py-2 font-medium transition ${activeTier === 'platinum' ? 'bg-purple-600 text-white' : 'bg-muted text-muted-foreground'}`}
              onClick={() => setActiveTier('platinum')}
            >
              Platinum
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-6 py-2 font-medium transition ${activeTier === 'gold' ? 'bg-yellow-500 text-white' : 'bg-muted text-muted-foreground'}`}
              onClick={() => setActiveTier('gold')}
            >
              Gold
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-6 py-2 font-medium transition ${activeTier === 'silver' ? 'bg-gray-400 text-white' : 'bg-muted text-muted-foreground'}`}
              onClick={() => setActiveTier('silver')}
            >
              Silver
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-6 py-2 font-medium transition ${activeTier === 'bronze' ? 'bg-amber-700 text-white' : 'bg-muted text-muted-foreground'}`}
              onClick={() => setActiveTier('bronze')}
            >
              Bronze
            </motion.button>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredSponsors.map((sponsor) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: sponsor.id * 0.1 }}
                layout
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
              >
                <SponsorCard 
                  sponsor={sponsor} 
                  expanded={expandedSponsor === sponsor.id}
                  onToggleExpand={() => {
                    setExpandedSponsor(expandedSponsor === sponsor.id ? null : sponsor.id);
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 rounded-lg bg-muted/30 p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="mb-4 text-2xl font-bold">Become a Sponsor</h3>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              Interested in sponsoring Manfete 2025? We offer various sponsorship packages that can help 
              your brand connect with our engaged audience while supporting a cultural celebration.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-festival-purple px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-festival-purple/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Get Sponsorship Information
            </motion.button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface SponsorCardProps {
  sponsor: {
    id: number;
    name: string;
    logo: string;
    description: string;
    website: string;
    tier: string;
    highlight: string;
  };
  expanded: boolean;
  onToggleExpand: () => void;
}

const SponsorCard = ({ sponsor, expanded, onToggleExpand }: SponsorCardProps) => {
  const tierColor = getTierColor(sponsor.tier);
  
  return (
    <Card className={`overflow-hidden transition-all ${expanded ? 'shadow-lg ring-2 ring-primary/30' : ''}`}>
      <div className={`h-2 ${tierColor}`}></div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full bg-white p-4 flex items-center justify-center">
          <div className="relative">
            <img 
              src={sponsor.logo} 
              alt={`${sponsor.name} logo`} 
              className="h-auto max-h-40 w-auto max-w-full object-contain" 
            />
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon" className="absolute top-0 right-0 h-8 w-8 rounded-full text-muted-foreground">
                  {getTierIcon(sponsor.tier)}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-60">
                <div className="flex justify-between space-x-4">
                  <div>
                    <h4 className="text-sm font-semibold">{sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)} Sponsor</h4>
                    <p className="text-sm text-muted-foreground">
                      {sponsor.highlight}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <div className="w-full">
          <CardHeader>
            <CardTitle>{sponsor.name}</CardTitle>
            <CardDescription>{sponsor.highlight}</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={false}
              animate={{ height: expanded ? 'auto' : '0' }}
              className={`overflow-hidden ${expanded ? 'my-2' : ''}`}
            >
              <p className="text-sm text-muted-foreground">{sponsor.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <div className={`rounded-full px-3 py-1 text-xs font-medium text-white ${tierColor}`}>
                  {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)}
                </div>
              </div>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={onToggleExpand}
            >
              <Info className="h-4 w-4" />
              <span>{expanded ? "Show Less" : "Learn More"}</span>
            </Button>
            <Button asChild variant="ghost" size="sm" className="flex items-center gap-2">
              <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span>Visit Website</span>
              </a>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default Sponsors;
