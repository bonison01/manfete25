
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Check, Ticket, Users, Calendar, Clock, IndianRupee, Graduation, Building, University } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  phone: z.string().optional(),
  university: z.string().min(2, {
    message: "Please enter your university or institution."
  }),
  address: z.string().optional(),
  ticketType: z.enum(["full", "weekend", "day"]),
  numTickets: z.string(),
  selectedEvents: z.array(z.string()).optional(),
  updates: z.boolean().default(true),
});

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      university: "",
      address: "",
      ticketType: "full",
      numTickets: "1",
      selectedEvents: [],
      updates: true,
    },
  });

  const ticketTypes = [
    {
      id: "full",
      name: "Full Festival Pass",
      price: "₹1499",
      description: "Access to all events for the entire festival duration (April 24-26, 2025)"
    },
    {
      id: "weekend",
      name: "Weekend Pass",
      price: "₹899",
      description: "Access to all events on April 25-26, 2025 only"
    },
    {
      id: "day",
      name: "Day Pass",
      price: "₹499",
      description: "Access to all events for one day of your choice"
    }
  ];

  const eventsList = [
    { id: "inauguration", name: "Inauguration", date: "April 24", venue: "Auditorium, MU", price: "Included" },
    { id: "debate", name: "Debate Competition", date: "April 24", venue: "Auditorium, MU", price: "Included" },
    { id: "quiz", name: "Quiz Competition", date: "April 25", venue: "Auditorium, MU", price: "Included" },
    { id: "painting", name: "Painting Competition", date: "April 25", venue: "Centenary Hall", price: "Included" },
    { id: "cosplay", name: "Cosplay Contest", date: "April 25", venue: "Auditorium", price: "Included" },
    { id: "business", name: "Business Idea Presentation", date: "April 25", venue: "Auditorium", price: "Included" },
    { id: "photography", name: "Photography Exhibition", date: "April 25", venue: "Centenary Hall", price: "Included" },
    { id: "manhunt", name: "Manhunt & Manfete Queen", date: "April 26", venue: "New Auditorium", price: "Included" },
    { id: "closing", name: "Prize Distribution & Closing", date: "April 26", venue: "New Auditorium", price: "Included" }
  ];
  
  const [selectedTicket, setSelectedTicket] = useState(ticketTypes[0]);
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    toast({
      title: "Registration Successful!",
      description: "Your registration for Manfete 2025 has been confirmed. Check your email for details.",
    });
    
    form.reset();
    setSelectedEventIds([]);
  };

  const handleTicketChange = (value: string) => {
    const ticket = ticketTypes.find(t => t.id === value);
    if (ticket) {
      setSelectedTicket(ticket);
    }
    form.setValue("ticketType", value);
  };

  const toggleEvent = (eventId: string) => {
    setSelectedEventIds(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  const calculateTotal = () => {
    const ticketPrice = parseInt(selectedTicket.price.replace("₹", ""));
    const numTickets = parseInt(form.getValues("numTickets") || "1");
    return ticketPrice * numTickets;
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
                <Ticket className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Choose Your Pass</h3>
              <p className="text-muted-foreground">
                Select from our full festival pass, weekend pass, or single day options.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-festival-teal text-white">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Register Your Details</h3>
              <p className="text-muted-foreground">
                Fill out your information and select the events you want to attend.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-festival-gold text-festival-dark">
                <IndianRupee className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Confirm & Pay</h3>
              <p className="text-muted-foreground">
                Review your order and complete your payment securely in INR.
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
                                  <FormLabel>Phone Number</FormLabel>
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
                              name="university"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>University/Institution *</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter your university or institution" 
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
                          
                          <div>
                            <Label>Ticket Type *</Label>
                            <RadioGroup 
                              value={form.getValues("ticketType")} 
                              onValueChange={handleTicketChange} 
                              className="mt-2 space-y-3"
                            >
                              {ticketTypes.map((type) => (
                                <div key={type.id} className="flex items-start space-x-2 rounded-md border p-3">
                                  <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                                  <div className="flex-1">
                                    <Label htmlFor={type.id} className="text-base font-medium flex items-center justify-between">
                                      <span>{type.name}</span>
                                      <span className="font-bold text-festival-purple flex items-center">
                                        <IndianRupee className="h-4 w-4 mr-1" />
                                        {type.price.replace("₹", "")}
                                      </span>
                                    </Label>
                                    <p className="text-sm text-muted-foreground">{type.description}</p>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="numTickets"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Tickets *</FormLabel>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select quantity" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="6">6</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div>
                            <Label className="mb-2 block">Events (Select the events you plan to attend)</Label>
                            <div className="grid gap-2 md:grid-cols-2">
                              {eventsList.map((event) => (
                                <div 
                                  key={event.id} 
                                  className={`rounded-lg border p-3 cursor-pointer transition-all ${
                                    selectedEventIds.includes(event.id) 
                                      ? 'border-festival-purple bg-festival-purple/5' 
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                  onClick={() => toggleEvent(event.id)}
                                >
                                  <div className="flex items-start gap-2">
                                    <div className={`mt-0.5 h-4 w-4 rounded-sm border flex items-center justify-center ${
                                      selectedEventIds.includes(event.id) ? 'bg-festival-purple border-festival-purple' : 'border-gray-300'
                                    }`}>
                                      {selectedEventIds.includes(event.id) && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                    <div>
                                      <p className="font-medium">{event.name}</p>
                                      <div className="flex flex-wrap gap-x-4 text-xs text-muted-foreground">
                                        <span className="flex items-center">
                                          <Calendar className="mr-1 h-3 w-3" />
                                          {event.date}
                                        </span>
                                        <span className="flex items-center">
                                          <Building className="mr-1 h-3 w-3" />
                                          {event.venue}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
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
                        <CardTitle>Order Summary</CardTitle>
                        <CardDescription>Your registration details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="mb-1 text-sm font-medium">Ticket Type</div>
                          <div className="flex justify-between">
                            <span>{selectedTicket.name}</span>
                            <span className="flex items-center">
                              <IndianRupee className="h-3 w-3 mr-1" />
                              {selectedTicket.price.replace("₹", "")}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="mb-1 text-sm font-medium">Quantity</div>
                          <div>{form.getValues("numTickets") || "1"}</div>
                        </div>
                        
                        <div className="rounded-md bg-muted p-3">
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span className="flex items-center">
                              <IndianRupee className="h-4 w-4 mr-1" />
                              {calculateTotal()}
                            </span>
                          </div>
                        </div>
                        
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
                        <Button type="submit" className="w-full bg-festival-purple hover:bg-festival-purple/90">
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
