import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Check, Calendar, Clock, IndianRupee, Building, University } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits."
  }),
  college: z.string().min(2, {
    message: "Please enter your university or institution."
  }),
  address: z.string().optional(),
  eventId: z.string({
    required_error: "Please select an event."
  }),
  updates: z.boolean().default(true),
});

const Register = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      college: "",
      address: "",
      eventId: "",
      updates: true,
    },
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
      setLoading(false);
    }
  };

  const handleEventSelect = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      form.setValue("eventId", eventId);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!selectedEvent) {
        toast.error("Please select an event");
        return;
      }

      const { data, error } = await supabase
        .from("registrations")
        .insert({
          name: values.fullName,
          email: values.email,
          phone: values.phone,
          college: values.college,
          event_id: values.eventId,
          amount: selectedEvent.price,
          payment_status: "pending"
        })
        .select("id");

      if (error) throw error;

      // Navigate to success page with registration ID
      if (data && data[0]) {
        toast.success("Registration successful!");
        navigate(`/registration-success/${data[0].id}`);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="relative bg-festival-dark py-16 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="container relative z-10 mx-auto px-4">
            <h1 className="mb-4 text-center text-4xl font-bold text-festival-gold">Register for Manfete 2025</h1>
            <p className="mx-auto mb-2 max-w-2xl text-center text-gray-300">
              Secure your spot at Manipur's largest cultural event! April 24-26, 2025
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <University className="h-5 w-5 text-festival-gold" />
                <span className="text-sm text-gray-300">Hosted by Manipur University</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-festival-gold" />
                <span className="text-sm text-gray-300">MIMS, New Auditorium, Centenary Hall</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10 grid gap-10 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-festival-purple text-white">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Choose Your Event</h3>
              <p className="text-muted-foreground">
                Select from our exciting lineup of events for Manfete 2025.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-festival-teal text-white">
                <University className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Register Your Details</h3>
              <p className="text-muted-foreground">
                Fill out your information to participate in the festival.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-festival-gold text-festival-dark">
                <IndianRupee className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Confirm & Pay</h3>
              <p className="text-muted-foreground">
                Review your registration and complete your payment securely in INR.
              </p>
            </div>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Registration Information</CardTitle>
                        <CardDescription>Please provide your details to register for Manfete 2025.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <Label className="mb-2 block">Events (Select the event you want to participate in) *</Label>
                            {loading ? (
                              <div className="flex items-center justify-center p-6">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                              </div>
                            ) : events.length === 0 ? (
                              <div className="p-4 text-center text-muted-foreground">
                                No events available. Please check back later.
                              </div>
                            ) : (
                              <div className="grid gap-3">
                                {events.map((event) => (
                                  <div 
                                    key={event.id} 
                                    className={`rounded-lg border p-3 cursor-pointer transition-all ${
                                      selectedEvent?.id === event.id
                                        ? 'border-festival-purple bg-festival-purple/5' 
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => handleEventSelect(event.id)}
                                  >
                                    <div className="flex items-start gap-2">
                                      <div className={`mt-0.5 h-4 w-4 rounded-sm border flex items-center justify-center ${
                                        selectedEvent?.id === event.id ? 'bg-festival-purple border-festival-purple' : 'border-gray-300'
                                      }`}>
                                        {selectedEvent?.id === event.id && <Check className="h-3 w-3 text-white" />}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <p className="font-medium">{event.title}</p>
                                          <p className="font-bold text-festival-purple flex items-center">
                                            <IndianRupee className="h-4 w-4 mr-1" />
                                            {event.price}
                                          </p>
                                        </div>
                                        {event.description && (
                                          <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                                        )}
                                        <div className="flex flex-wrap gap-x-4 text-xs text-muted-foreground mt-2">
                                          <span className="flex items-center">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {new Date(event.date).toLocaleDateString()}
                                          </span>
                                          {event.location && (
                                            <span className="flex items-center">
                                              <Building className="mr-1 h-3 w-3" />
                                              {event.location}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            {form.formState.errors.eventId && (
                              <p className="mt-2 text-sm font-medium text-destructive">
                                {form.formState.errors.eventId.message}
                              </p>
                            )}
                          </div>
                          
                          <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name *</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter your full name" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address *</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="email" 
                                      placeholder="Enter your email address" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number *</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter your phone number" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="college"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>College/Institution *</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter your college or institution" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your address" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="updates"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>
                                  Send me updates about the festival and future events
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Registration Summary</CardTitle>
                        <CardDescription>Your registration details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {selectedEvent ? (
                          <>
                            <div>
                              <div className="mb-1 text-sm font-medium">Selected Event</div>
                              <div className="flex justify-between">
                                <span>{selectedEvent.title}</span>
                                <span className="flex items-center">
                                  <IndianRupee className="h-3 w-3 mr-1" />
                                  {selectedEvent.price}
                                </span>
                              </div>
                            </div>
                            
                            <div className="rounded-md bg-muted p-3">
                              <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span className="flex items-center">
                                  <IndianRupee className="h-4 w-4 mr-1" />
                                  {selectedEvent.price}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center text-muted-foreground p-4">
                            Select an event to see the summary
                          </div>
                        )}
                        
                        <div className="space-y-2 rounded-md border p-3">
                          <div className="flex items-start space-x-2">
                            <Calendar className="mt-1 h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium">Event Dates</div>
                              <div className="text-sm text-muted-foreground">April 24-26, 2025</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <Clock className="mt-1 h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium">Opening Hours</div>
                              <div className="text-sm text-muted-foreground">10:00 AM - 9:00 PM daily</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex-col space-y-4">
                        <Button 
                          type="submit" 
                          className="w-full bg-festival-purple hover:bg-festival-purple/90"
                          disabled={!selectedEvent || loading}
                        >
                          <IndianRupee className="h-4 w-4 mr-1" />
                          Continue to Payment
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Need help? Contact us at <a href="mailto:tickets@manfete.com" className="text-primary hover:underline">tickets@manfete.com</a>
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
