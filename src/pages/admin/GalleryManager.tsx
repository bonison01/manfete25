
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Image, Plus, Trash2, UploadCloud } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  year: string;
}

const years = ["2021", "2022", "2023", "2024", "2025"];

const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2025");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "2025",
  });

  // File upload state
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      toast.error("Failed to load gallery images");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleYearChange = (value: string) => {
    setFormData({ ...formData, year: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFilePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDeleteImage = async (image: GalleryImage) => {
    if (!confirm(`Are you sure you want to delete "${image.title || 'this image'}"?`)) return;
    
    try {
      setIsSubmitting(true);
      
      // If there's an image URL and it's in our storage, delete it
      if (image.image_url && image.image_url.includes("storage")) {
        const path = image.image_url.split("/").slice(4).join("/");
        await supabase.storage.from("event_images").remove([path]);
      }
      
      const { error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", image.id);
        
      if (error) throw error;
      
      toast.success("Image deleted successfully");
      setImages(images.filter(img => img.id !== image.id));
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select an image to upload");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Upload the file
      const fileExt = file.name.split(".").pop();
      const fileName = `gallery-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("event_images")
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from("event_images")
        .getPublicUrl(filePath);
        
      const image_url = urlData.publicUrl;
      
      // Save to database
      const { error, data } = await supabase
        .from("gallery")
        .insert({
          title: formData.title,
          description: formData.description,
          image_url,
          year: formData.year,
        })
        .select();
        
      if (error) throw error;
      
      toast.success("Image uploaded successfully");
      
      // Refresh images
      fetchImages();
      resetForm();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      year: "2025",
    });
    setFile(null);
    setFilePreview("");
  };

  const openUploadDialog = () => {
    resetForm();
    setIsOpen(true);
  };

  // Filter images by year for the current tab
  const filteredImages = images.filter(image => 
    selectedYear === "all" || image.year === selectedYear
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gallery Management</h1>
        <Button onClick={openUploadDialog} className="bg-festival-purple hover:bg-festival-purple/90">
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
      </div>

      <Tabs defaultValue="2025" onValueChange={setSelectedYear}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Years</TabsTrigger>
          {years.slice().reverse().map((year) => (
            <TabsTrigger key={year} value={year}>
              {year}
            </TabsTrigger>
          ))}
        </TabsList>

        {["all", ...years].reverse().map((year) => (
          <TabsContent key={year} value={year} className="mt-0">
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center border rounded-lg py-16">
                <Image className="h-16 w-16 text-muted-foreground opacity-25 mb-4" />
                <p className="text-muted-foreground">No images found for this year</p>
                <Button 
                  onClick={openUploadDialog} 
                  variant="outline" 
                  className="mt-4"
                >
                  Upload Images
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image) => (
                  <Card key={image.id} className="overflow-hidden group">
                    <div className="aspect-square relative">
                      <img
                        src={image.image_url}
                        alt={image.title || "Gallery image"}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteImage(image)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-2">
                      <div className="flex justify-between items-start">
                        <div>
                          {image.title && (
                            <p className="text-sm font-medium truncate">{image.title}</p>
                          )}
                          <p className="text-xs text-muted-foreground">Year: {image.year}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Upload form dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Gallery Image</DialogTitle>
            <DialogDescription>
              Select an image to upload to the gallery
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title">Image Title (Optional)</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Select value={formData.year} onValueChange={handleYearChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.slice().reverse().map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="image">Select Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
              {filePreview && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
                  <img
                    src={filePreview}
                    alt="Image preview"
                    className="max-h-40 rounded-md object-cover"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-festival-purple hover:bg-festival-purple/90"
                disabled={isSubmitting || !file}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Uploading...
                  </>
                ) : (
                  "Upload Image"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManager;
