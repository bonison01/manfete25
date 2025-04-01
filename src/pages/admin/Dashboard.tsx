
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Calendar, Image } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    eventCount: 0,
    galleryCount: 0,
    registrationCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Get event count
        const { count: eventCount, error: eventError } = await supabase
          .from("events")
          .select("*", { count: "exact", head: true });

        // Get gallery count
        const { count: galleryCount, error: galleryError } = await supabase
          .from("gallery")
          .select("*", { count: "exact", head: true });

        // Get registrations count
        const { count: registrationCount, error: registrationError } = await supabase
          .from("registrations")
          .select("*", { count: "exact", head: true });

        if (eventError) throw eventError;
        if (galleryError) throw galleryError;
        if (registrationError) throw registrationError;

        setStats({
          eventCount: eventCount || 0,
          galleryCount: galleryCount || 0,
          registrationCount: registrationCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.eventCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gallery Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.galleryCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.registrationCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="cursor-pointer hover:bg-gray-50" onClick={() => window.location.href = "/admin/events"}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-festival-purple" />
                Manage Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Add, edit or delete events for the festival
              </p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:bg-gray-50" onClick={() => window.location.href = "/admin/gallery"}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="mr-2 h-5 w-5 text-festival-purple" />
                Manage Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upload and organize gallery images
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
