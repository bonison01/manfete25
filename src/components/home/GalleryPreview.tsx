
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  year: string | null;
}

// Fallback images in case database is empty
const fallbackImages = [
  {
    id: "1",
    image_url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    alt: "Festival performance",
  },
  {
    id: "2",
    image_url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    alt: "Audience at concert",
  },
  {
    id: "3",
    image_url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    alt: "Stage lights",
  },
  {
    id: "4",
    image_url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    alt: "Festival crowd",
  },
  {
    id: "5",
    image_url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    alt: "Night event",
  },
  {
    id: "6",
    image_url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    alt: "Art installation",
  },
];

const GalleryPreview = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        throw error;
      }

      setGalleryImages(data || []);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      // If no images or error, use fallback images
      setGalleryImages([]);
    } finally {
      setLoading(false);
    }
  };

  // Use fallback images if no gallery images were fetched
  const displayImages = galleryImages.length > 0 
    ? galleryImages 
    : fallbackImages;

  return (
    <section className="py-16 bg-festival-dark text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-festival-gold sm:text-4xl">Photo Gallery</h2>
          <p className="mx-auto max-w-2xl text-gray-300">
            Relive the magical moments from last year's Manfete through our photo gallery.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-festival-gold" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {displayImages.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={image.image_url}
                  alt={image.title || "Gallery image"}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm">{image.title || image.description || "Gallery image"}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-festival-gold text-festival-dark hover:bg-festival-gold/90">
            <Link to="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
