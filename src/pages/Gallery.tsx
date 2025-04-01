
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, User } from "lucide-react";

const galleryImages = {
  "2023": [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Festival performance 2023",
      caption: "Opening ceremony with special guest performances",
      photographer: "John Smith"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Audience at concert 2023",
      caption: "Enthusiastic crowd during the main concert",
      photographer: "Sarah Johnson"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Stage lights 2023",
      caption: "Amazing light show at the night performance",
      photographer: "Michael Brown"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Festival crowd 2023",
      caption: "The crowd enjoying the festival atmosphere",
      photographer: "Emily Clark"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Night event 2023",
      caption: "Night time entertainment with spectacular lighting",
      photographer: "David Wilson"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Art installation 2023",
      caption: "Interactive art installation that captivated visitors",
      photographer: "Jessica Lee"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Dance performance 2023",
      caption: "Traditional dance performance at the cultural stage",
      photographer: "Robert Davis"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Crowd cheering 2023",
      caption: "Audience cheering for their favorite artist",
      photographer: "Amanda Taylor"
    }
  ],
  "2022": [
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Festival stage 2022",
      caption: "Main stage setup before the festival began",
      photographer: "Thomas Wright"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Live band 2022",
      caption: "Local band performing their new songs",
      photographer: "Grace Martinez"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Music festival 2022",
      caption: "Afternoon session with international DJs",
      photographer: "Kevin Anderson"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Festival crowd 2022",
      caption: "Over 3,000 people attended the second day",
      photographer: "Jennifer Lopez"
    }
  ],
  "2021": [
    {
      id: 13,
      src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Festival performance 2021",
      caption: "First post-pandemic festival with limited attendance",
      photographer: "Chris Wilson"
    },
    {
      id: 14,
      src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Festival crowd 2021",
      caption: "Socially distanced crowd enjoying the music",
      photographer: "Patricia Garcia"
    }
  ]
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="bg-festival-dark py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-center text-4xl font-bold text-festival-gold">Photo Gallery</h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-gray-300">
              Relive the magical moments from previous Manfete festivals through our photo gallery.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="2023" className="w-full">
            <TabsList className="mx-auto mb-8 justify-center">
              <TabsTrigger value="2023">Manfete 2023</TabsTrigger>
              <TabsTrigger value="2022">Manfete 2022</TabsTrigger>
              <TabsTrigger value="2021">Manfete 2021</TabsTrigger>
            </TabsList>
            
            {Object.entries(galleryImages).map(([year, images]) => (
              <TabsContent key={year} value={year} className="mt-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {images.map((image) => (
                    <Dialog key={image.id}>
                      <DialogTrigger asChild>
                        <div 
                          className="group cursor-pointer overflow-hidden rounded-lg"
                          onClick={() => setSelectedImage(image)}
                        >
                          <div className="aspect-square overflow-hidden">
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-2">
                            <p className="text-sm font-medium text-muted-foreground">{image.caption}</p>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{image.alt}</DialogTitle>
                          <DialogDescription>{image.caption}</DialogDescription>
                        </DialogHeader>
                        <div className="overflow-hidden rounded-lg">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full object-contain"
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <User className="mr-1 h-4 w-4" />
                            <span>Photo by: {image.photographer}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>Manfete {year}</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
