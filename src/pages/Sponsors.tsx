
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Info } from "lucide-react";

const sponsorsByTier = {
  platinum: [
    {
      id: 1,
      name: "TechCorp",
      logo: "https://via.placeholder.com/300x200?text=TechCorp",
      description: "Global technology company and proud main sponsor of Manfete for the last 5 years.",
      website: "https://example.com"
    }
  ],
  gold: [
    {
      id: 2,
      name: "Global Media",
      logo: "https://via.placeholder.com/300x200?text=GlobalMedia",
      description: "International media conglomerate helping us share Manfete with the world.",
      website: "https://example.com"
    },
    {
      id: 3,
      name: "Urban Apparel",
      logo: "https://via.placeholder.com/300x200?text=UrbanApparel",
      description: "Fashion brand that celebrates creativity and cultural expression.",
      website: "https://example.com"
    }
  ],
  silver: [
    {
      id: 4,
      name: "Eco Solutions",
      logo: "https://via.placeholder.com/300x200?text=EcoSolutions",
      description: "Sustainable products company helping make Manfete environmentally friendly.",
      website: "https://example.com"
    },
    {
      id: 5,
      name: "Metro Bank",
      logo: "https://via.placeholder.com/300x200?text=MetroBank",
      description: "Financial institution supporting local cultural initiatives.",
      website: "https://example.com"
    },
    {
      id: 6,
      name: "City Hotels",
      logo: "https://via.placeholder.com/300x200?text=CityHotels",
      description: "Official accommodation partner providing special rates for attendees.",
      website: "https://example.com"
    }
  ],
  bronze: [
    {
      id: 7,
      name: "Local Foods",
      logo: "https://via.placeholder.com/300x200?text=LocalFoods",
      description: "Restaurant chain featuring cuisines from around the world.",
      website: "https://example.com"
    },
    {
      id: 8,
      name: "Sound Systems Inc",
      logo: "https://via.placeholder.com/300x200?text=SoundSystems",
      description: "Audio equipment provider ensuring top-quality sound at all venues.",
      website: "https://example.com"
    },
    {
      id: 9,
      name: "Community College",
      logo: "https://via.placeholder.com/300x200?text=CommCollege",
      description: "Educational institution supporting arts and cultural education.",
      website: "https://example.com"
    },
    {
      id: 10,
      name: "Transport Co",
      logo: "https://via.placeholder.com/300x200?text=TransportCo",
      description: "Official transportation partner for Manfete.",
      website: "https://example.com"
    }
  ]
};

const Sponsors = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="bg-festival-dark py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-center text-4xl font-bold text-festival-gold">Our Sponsors</h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-gray-300">
              Manfete wouldn't be possible without the generous support of our sponsors.
              We're proud to partner with these organizations to bring this cultural celebration to life.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <section className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-festival-purple">Platinum Sponsors</h2>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
              {sponsorsByTier.platinum.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} featured />
              ))}
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-festival-gold">Gold Sponsors</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {sponsorsByTier.gold.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-400">Silver Sponsors</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sponsorsByTier.silver.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="mb-8 text-center text-3xl font-bold text-amber-700">Bronze Sponsors</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {sponsorsByTier.bronze.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </section>
          
          <div className="mt-16 rounded-lg bg-muted/30 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold">Become a Sponsor</h3>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              Interested in sponsoring Manfete? We offer various sponsorship packages that can help 
              your brand connect with our engaged audience while supporting a cultural celebration.
            </p>
            <Button size="lg" className="bg-festival-purple hover:bg-festival-purple/90">
              Get Sponsorship Information
            </Button>
          </div>
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
  };
  featured?: boolean;
}

const SponsorCard = ({ sponsor, featured = false }: SponsorCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${featured ? 'border-festival-purple/30 bg-gradient-to-br from-white to-purple-50' : ''}`}>
      <div className="flex flex-col md:flex-row">
        <div className={`${featured ? 'md:w-1/3' : 'w-full'} bg-white p-4 flex items-center justify-center`}>
          <img 
            src={sponsor.logo} 
            alt={`${sponsor.name} logo`} 
            className="h-auto max-h-40 w-auto max-w-full object-contain" 
          />
        </div>
        <div className={`${featured ? 'md:w-2/3' : 'w-full'}`}>
          <CardHeader>
            <CardTitle className={featured ? 'text-2xl' : 'text-xl'}>{sponsor.name}</CardTitle>
            <CardDescription>{sponsor.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>Learn More</span>
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
