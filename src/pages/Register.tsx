
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
import { Check, Ticket, Users, Calendar, Clock } from "lucide-react";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ticketType, setTicketType] = useState("full");
  const [numTickets, setNumTickets] = useState("1");
  const [updates, setUpdates] = useState(true);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill out all required fields."
      });
      return;
    }
    
    toast({
      title: "Registration Successful!",
      description: "Your registration for Manfete has been confirmed. Check your email for details.",
    });
    
    // Reset form
    setFullName("");
    setEmail("");
    setPhone("");
    setTicketType("full");
    setNumTickets("1");
    setUpdates(true);
  };

  const ticketTypes = [
    {
      id: "full",
      name: "Full Festival Pass",
      price: "$149",
      description: "Access to all events for the entire festival duration (June 15-20, 2024)"
    },
    {
      id: "weekend",
      name: "Weekend Pass",
      price: "$89",
      description: "Access to all events on Saturday and Sunday only"
    },
    {
      id: "day",
      name: "Day Pass",
      price: "$49",
      description: "Access to all events for one day of your choice"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="relative bg-festival-dark py-16 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="container relative z-10 mx-auto px-4">
            <h1 className="mb-4 text-center text-4xl font-bold text-festival-gold">Register for Manfete 2024</h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-gray-300">
              Secure your spot at the cultural event of the year. Early bird pricing available now!
            </p>
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
                Fill out your information and select the number of tickets.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-festival-gold text-festival-dark">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Confirm & Pay</h3>
              <p className="text-muted-foreground">
                Review your order and complete your payment securely.
              </p>
            </div>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Registration Information</CardTitle>
                    <CardDescription>Please provide your details to register for Manfete.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input 
                            id="fullName" 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)} 
                            placeholder="Enter your full name" 
                            required 
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email address" 
                            required 
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            placeholder="Enter your phone number" 
                          />
                        </div>
                        
                        <div>
                          <Label>Ticket Type *</Label>
                          <RadioGroup 
                            value={ticketType} 
                            onValueChange={setTicketType} 
                            className="mt-2 space-y-3"
                          >
                            {ticketTypes.map((type) => (
                              <div key={type.id} className="flex items-start space-x-2 rounded-md border p-3">
                                <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                                <div className="flex-1">
                                  <Label htmlFor={type.id} className="text-base font-medium flex items-center justify-between">
                                    <span>{type.name}</span>
                                    <span className="font-bold text-festival-purple">{type.price}</span>
                                  </Label>
                                  <p className="text-sm text-muted-foreground">{type.description}</p>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label htmlFor="numTickets">Number of Tickets *</Label>
                          <Select value={numTickets} onValueChange={setNumTickets}>
                            <SelectTrigger id="numTickets">
                              <SelectValue placeholder="Select quantity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="6">6</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="updates" checked={updates} onCheckedChange={setUpdates} />
                          <Label htmlFor="updates">
                            Send me updates about the festival and future events
                          </Label>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full bg-festival-purple hover:bg-festival-purple/90">
                        Continue to Payment
                      </Button>
                      
                      <p className="text-center text-sm text-muted-foreground">
                        By registering, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </form>
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
                        <span>{ticketTypes.find(t => t.id === ticketType)?.name}</span>
                        <span>{ticketTypes.find(t => t.id === ticketType)?.price}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-1 text-sm font-medium">Quantity</div>
                      <div>{numTickets}</div>
                    </div>
                    
                    <div className="rounded-md bg-muted p-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>
                          ${Number(numTickets) * Number(ticketTypes.find(t => t.id === ticketType)?.price.replace('$', ''))}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 rounded-md border p-3">
                      <div className="flex items-start space-x-2">
                        <Calendar className="mt-1 h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Event Dates</div>
                          <div className="text-sm text-muted-foreground">June 15-20, 2024</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Clock className="mt-1 h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Opening Hours</div>
                          <div className="text-sm text-muted-foreground">10:00 AM - 11:00 PM daily</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Need help? Contact us at <a href="mailto:tickets@manfete.com" className="text-primary hover:underline">tickets@manfete.com</a>
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
