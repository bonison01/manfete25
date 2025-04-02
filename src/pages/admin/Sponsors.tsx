import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Globe, Pencil, Plus, Trash2, Upload, Loader2 } from "lucide-react";

interface Sponsor {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  tier: string | null;
  created_at: string;
  updated_at: string;
}

const SponsorsManager = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    website_url: "",
    description: "",
    tier: "bronze",
  });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("sponsors")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      setSponsors(data || []);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
      toast.error("Failed to load sponsors");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTierChange = (value: string) => {
    setFormData({ ...formData, tier: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFilePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleEditSponsor = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setFormData({
      name: sponsor.name,
      website_url: sponsor.website_url || "",
      description: sponsor.description || "",
      tier: sponsor.tier || "bronze",
    });
    setFilePreview(sponsor.logo_url || "");
    setIsOpen(true);
  };

  const handleDeleteClick = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSponsor = async () => {
    if (!selectedSponsor) return;
    
    try {
      setIsSubmitting(true);
      
      if (selectedSponsor.logo_url && selectedSponsor.logo_url.includes("storage")) {
        const path = selectedSponsor.logo_url.split("/").slice(4).join("/");
        await supabase.storage.from("sponsor_logos").remove([path]);
      }
      
      const { error } = await supabase
        .from("sponsors")
        .delete()
        .eq("id", selectedSponsor.id);
        
      if (error) throw error;
      
      toast.success("Sponsor deleted successfully");
      setSponsors(sponsors.filter(s => s.id !== selectedSponsor.id));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting sponsor:", error);
      toast.error("Failed to delete sponsor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      let logo_url = selectedSponsor?.logo_url || null;
      
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from("sponsor_logos")
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from("sponsor_logos")
          .getPublicUrl(filePath);
          
        logo_url = urlData.publicUrl;
      }
      
      if (selectedSponsor) {
        const { error } = await supabase
          .from("sponsors")
          .update({
            name: formData.name,
            description: formData.description,
            website_url: formData.website_url,
            logo_url,
            tier: formData.tier,
            updated_at: new Date().toISOString(),
          })
          .eq("id", selectedSponsor.id);
          
        if (error) throw error;
        toast.success("Sponsor updated successfully");
      } else {
        const { error, data } = await supabase
          .from("sponsors")
          .insert({
            name: formData.name,
            description: formData.description,
            website_url: formData.website_url,
            logo_url,
            tier: formData.tier,
          })
          .select();
          
        if (error) throw error;
        toast.success("Sponsor created successfully");
      }
      
      fetchSponsors();
      resetForm();
    } catch (error: any) {
      console.error("Error saving sponsor:", error);
      toast.error(error.message || "Failed to save sponsor");
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      website_url: "",
      description: "",
      tier: "bronze",
    });
    setFile(null);
    setFilePreview("");
    setSelectedSponsor(null);
  };

  const openNewSponsorDialog = () => {
    resetForm();
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Sponsors</h1>
        <Button onClick={openNewSponsorDialog} className="bg-festival-purple hover:bg-festival-purple/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Sponsor
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sponsors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No sponsors found. Add your first sponsor.
                    </TableCell>
                  </TableRow>
                ) : (
                  sponsors.map((sponsor) => (
                    <TableRow key={sponsor.id}>
                      <TableCell className="font-medium">{sponsor.name}</TableCell>
                      <TableCell>{sponsor.tier}</TableCell>
                      <TableCell>
                        {sponsor.website_url && (
                          <a
                            href={sponsor.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            <div className="flex items-center">
                              <Globe className="mr-2 h-4 w-4" />
                              Visit Website
                            </div>
                          </a>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditSponsor(sponsor)}
                          className="text-gray-500 hover:text-festival-purple"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(sponsor)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Sponsor form dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedSponsor ? "Edit Sponsor" : "Add New Sponsor"}</DialogTitle>
            <DialogDescription>
              Fill in the form below to {selectedSponsor ? "update the" : "create a new"} sponsor
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Sponsor Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="website_url">Website URL</Label>
                <Input
                  id="website_url"
                  name="website_url"
                  type="url"
                  value={formData.website_url}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="tier">Tier</Label>
                <Select value={formData.tier} onValueChange={handleTierChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="logo">Sponsor Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {filePreview && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-2">Logo Preview:</p>
                  <img
                    src={filePreview}
                    alt="Sponsor logo preview"
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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {selectedSponsor ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  selectedSponsor ? "Update Sponsor" : "Create Sponsor"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedSponsor?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSponsor}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SponsorsManager;
