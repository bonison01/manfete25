
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Check, CalendarClock, Building, IndianRupee, Loader2 } from "lucide-react";

const RegistrationSuccess = () => {
  const { id } = useParams<{ id: string }>();
  const [registration, setRegistration] = useState<any>(null);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchRegistrationDetails(id);
    }
  }, [id]);

  const fetchRegistrationDetails = async (registrationId: string) => {
    try {
      setLoading(true);
      
      // Fetch registration details
      const { data: registrationData, error: registrationError } = await supabase
        .from("registrations")
        .select("*")
        .eq("id", registrationId)
        .single();
        
      if (registrationError) throw registrationError;
      
      if (registrationData) {
        setRegistration(registrationData);
        
        // Fetch related event details
        if (registrationData.event_id) {
          const { data: eventData, error: eventError } = await supabase
            .from("events")
            .select("*")
            .eq("id", registrationData.event_id)
            .single();
            
          if (eventError) throw eventError;
          setEvent(eventData);
        }
      }
    } catch (error: any) {
      console.error("Error fetching registration details:", error);
      setError(error.message || "Failed to load registration details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <Card className="mx-auto max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Registration Not Found</CardTitle>
              <CardDescription>
                {error || "We couldn't find the registration details you're looking for."}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link to="/register">
                <Button>Register Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <Card className="mx-auto max-w-2xl overflow-hidden border-green-200">
          <div className="bg-green-50 py-4 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800">Registration Successful!</h2>
            <p className="text-green-700">Your spot for Manfete 2025 has been reserved</p>
          </div>
          
          <CardHeader>
            <CardTitle>Registration Details</CardTitle>
            <CardDescription>
              Please save your registration ID for future reference
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="rounded-md bg-muted p-4 text-center">
              <div className="text-sm font-medium text-muted-foreground">Registration ID</div>
              <div className="mt-1 font-mono text-lg font-bold tracking-wider">{registration.id}</div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Personal Information</h3>
                <div className="mt-2 grid gap-1 rounded-md border p-3">
                  <div className="grid grid-cols-3">
                    <div className="text-sm font-medium text-muted-foreground">Name:</div>
                    <div className="col-span-2">{registration.name}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-sm font-medium text-muted-foreground">Email:</div>
                    <div className="col-span-2">{registration.email}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-sm font-medium text-muted-foreground">Phone:</div>
                    <div className="col-span-2">{registration.phone}</div>
                  </div>
                  {registration.college && (
                    <div className="grid grid-cols-3">
                      <div className="text-sm font-medium text-muted-foreground">College:</div>
                      <div className="col-span-2">{registration.college}</div>
                    </div>
                  )}
                </div>
              </div>

              {event && (
                <div>
                  <h3 className="font-medium">Event Details</h3>
                  <div className="mt-2 rounded-md border p-3">
                    <div className="flex items-center justify-between font-medium">
                      <span>{event.title}</span>
                      <span className="flex items-center text-festival-purple">
                        <IndianRupee className="mr-1 h-4 w-4" />
                        {event.price}
                      </span>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-medium">Payment Status</h3>
                <div className="mt-2 rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className={`h-3 w-3 rounded-full ${
                          registration.payment_status === 'paid' 
                            ? 'bg-green-500' 
                            : registration.payment_status === 'pending' 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                        }`}
                      ></div>
                      <span className="capitalize">{registration.payment_status}</span>
                    </div>
                    <div className="flex items-center font-medium">
                      <IndianRupee className="mr-1 h-4 w-4" />
                      {registration.amount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex gap-3 border-t bg-muted/30 p-4">
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Return to Homepage
              </Button>
            </Link>
            <Button 
              onClick={() => window.print()}
              className="flex-1 gap-2"
            >
              Print Receipt
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationSuccess;
