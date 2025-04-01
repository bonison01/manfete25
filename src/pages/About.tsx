
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Calendar, Users, Map, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="bg-festival-dark py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-center text-4xl font-bold text-festival-gold">About Manfete</h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-gray-300">
              Learn more about our cultural festival, its history, and the team that makes it all possible.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="mx-auto mb-8 justify-center">
              <TabsTrigger value="about">About the Festival</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="team">Our Team</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-primary">What is Manfete?</h2>
                  <p className="mb-4 text-muted-foreground">
                    Manfete is an annual cultural festival celebrating diversity, creativity, and community through music, 
                    arts, food, and performances. It brings together artists, performers, and attendees from different 
                    backgrounds to share in a collective experience of cultural exchange and celebration.
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    Our mission is to provide a platform for cultural expression, foster community connections, 
                    and promote understanding through shared experiences in the arts. Each year, we curate a 
                    diverse program of events that showcase both traditional and contemporary cultural expressions.
                  </p>
                  <p className="text-muted-foreground">
                    Whether you're a longtime attendee or considering your first visit, Manfete offers something 
                    for everyone to enjoy. Join us for an unforgettable celebration of human creativity and cultural heritage.
                  </p>
                </div>
                <div className="flex flex-col space-y-6">
                  <img 
                    src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                    alt="Festival atmosphere" 
                    className="h-64 w-full rounded-lg object-cover"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="flex flex-col items-center p-6">
                        <Calendar className="mb-2 h-8 w-8 text-primary" />
                        <h3 className="mb-1 font-semibold">Established</h3>
                        <p className="text-center text-muted-foreground">2015</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="flex flex-col items-center p-6">
                        <Users className="mb-2 h-8 w-8 text-primary" />
                        <h3 className="mb-1 font-semibold">Annual Attendance</h3>
                        <p className="text-center text-muted-foreground">5,000+</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="mb-4 rounded-full bg-primary/10 p-3">
                      <Music className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold">Cultural Performances</h3>
                    <p className="text-center text-muted-foreground">
                      Showcasing music, dance, and theatrical performances from various cultural traditions.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="mb-4 rounded-full bg-primary/10 p-3">
                      <Paintbrush className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold">Art Exhibitions</h3>
                    <p className="text-center text-muted-foreground">
                      Featuring works from established and emerging artists across various mediums.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="mb-4 rounded-full bg-primary/10 p-3">
                      <UtensilsCrossed className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 text-center text-xl font-semibold">Culinary Experiences</h3>
                    <p className="text-center text-muted-foreground">
                      Taste a variety of cuisines representing cultural traditions from around the world.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <div className="space-y-8">
                <h2 className="mb-4 text-2xl font-bold text-primary">The History of Manfete</h2>
                
                <div className="relative border-l border-muted pl-6">
                  <div className="mb-8">
                    <div className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-xs">1</span>
                    </div>
                    <h3 className="text-xl font-semibold">2015: The Beginning</h3>
                    <p className="mt-2 text-muted-foreground">
                      Manfete began as a small community gathering organized by a group of local artists and cultural enthusiasts. 
                      The first event had just 500 attendees and was held in a local park.
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <div className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-xs">2</span>
                    </div>
                    <h3 className="text-xl font-semibold">2017: Expansion</h3>
                    <p className="mt-2 text-muted-foreground">
                      After two successful years, Manfete expanded to include international performers and artists.
                      Attendance grew to over 2,000 people and the festival moved to a larger venue.
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <div className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-xs">3</span>
                    </div>
                    <h3 className="text-xl font-semibold">2020: Virtual Adaptation</h3>
                    <p className="mt-2 text-muted-foreground">
                      Due to the global pandemic, Manfete transformed into a virtual event, 
                      streaming performances and workshops online to continue its mission.
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <div className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-xs">4</span>
                    </div>
                    <h3 className="text-xl font-semibold">2022: The Comeback</h3>
                    <p className="mt-2 text-muted-foreground">
                      Manfete returned to in-person celebrations with renewed energy and excitement. 
                      The festival introduced new elements like interactive installations and expanded workshops.
                    </p>
                  </div>
                  
                  <div>
                    <div className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-xs">5</span>
                    </div>
                    <h3 className="text-xl font-semibold">2023: Record Attendance</h3>
                    <p className="mt-2 text-muted-foreground">
                      Last year marked our most successful festival yet, with over 5,000 attendees 
                      and participation from artists representing 20+ different cultural backgrounds.
                    </p>
                  </div>
                </div>
                
                <div className="mt-12 rounded-lg bg-muted/30 p-6">
                  <h3 className="mb-4 text-xl font-semibold">Our Vision for the Future</h3>
                  <p className="text-muted-foreground">
                    As we look ahead, Manfete aims to continue growing while maintaining its core values of 
                    cultural celebration, community connection, and artistic expression. We're exploring 
                    partnerships with international cultural organizations and developing year-round 
                    programming to extend our impact beyond the annual festival.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="team" className="mt-0">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-2xl font-bold text-primary">Meet the Team</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                  Manfete is brought to you by a dedicated team of professionals passionate about 
                  arts, culture, and community building.
                </p>
              </div>
              
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <TeamMember 
                  name="Maria Rodriguez" 
                  role="Festival Director" 
                  image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                />
                <TeamMember 
                  name="David Chen" 
                  role="Artistic Director" 
                  image="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                />
                <TeamMember 
                  name="Sarah Johnson" 
                  role="Marketing Manager" 
                  image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                />
                <TeamMember 
                  name="Michael Brown" 
                  role="Operations Manager" 
                  image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                />
                <TeamMember 
                  name="Jessica Lee" 
                  role="Community Outreach" 
                  image="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                />
                <TeamMember 
                  name="Robert Davis" 
                  role="Technical Director" 
                  image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                />
                <TeamMember 
                  name="Emily Clark" 
                  role="Volunteer Coordinator" 
                  image="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                />
                <TeamMember 
                  name="Thomas Wright" 
                  role="Sponsorship Manager" 
                  image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                />
              </div>
              
              <div className="mt-12 rounded-lg bg-muted/30 p-6">
                <h3 className="mb-4 text-xl font-semibold">Join Our Team</h3>
                <p className="text-muted-foreground">
                  We're always looking for passionate individuals to join our team, either as staff or volunteers. 
                  If you're interested in being part of Manfete, please send your resume and a brief introduction to
                  <a href="mailto:careers@manfete.com" className="ml-1 text-primary hover:underline">careers@manfete.com</a>.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="mt-0">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-2xl font-bold text-primary">Frequently Asked Questions</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                  Find answers to common questions about Manfete.
                </p>
              </div>
              
              <div className="space-y-6">
                <FaqItem 
                  question="When and where will the next Manfete be held?" 
                  answer="The next Manfete will be held from June 15-20, 2024, at Central Park, New York. The festival grounds will be open daily from 10:00 AM to 11:00 PM, with various events scheduled throughout each day." 
                />
                <FaqItem 
                  question="How can I purchase tickets?" 
                  answer="Tickets can be purchased through our official website by visiting the Registration page. We offer daily passes, weekend passes, and full festival passes. Early bird discounts are available until three months before the festival." 
                />
                <FaqItem 
                  question="Is Manfete suitable for children?" 
                  answer="Yes! Manfete is a family-friendly event with designated areas and activities for children. Children under 12 can attend for free when accompanied by a paying adult. We have a Kids Zone with supervised activities throughout the festival." 
                />
                <FaqItem 
                  question="What food options are available at the festival?" 
                  answer="Manfete features a diverse range of food vendors offering cuisines from around the world. Vegetarian, vegan, and gluten-free options are available. Outside food and beverages are not permitted, with the exception of water bottles and special dietary requirements." 
                />
                <FaqItem 
                  question="How can I become a vendor or performer at Manfete?" 
                  answer="We accept applications for vendors and performers through our website. The application period for the 2024 festival is currently open and will close on February 28, 2024. Please visit the 'Participate' section of our website for detailed information and application forms." 
                />
                <FaqItem 
                  question="Is there accommodation available near the festival site?" 
                  answer="While we don't provide accommodation directly, we partner with several hotels in the vicinity that offer special rates for Manfete attendees. Check the 'Plan Your Visit' section of our website for details on partner hotels and booking information." 
                />
                <FaqItem 
                  question="What happens if it rains during the festival?" 
                  answer="Manfete is a rain or shine event. Many of our venues are covered or indoors. In case of severe weather conditions, some outdoor events may be rescheduled or relocated. Always check our app or website for the latest updates during the festival." 
                />
                <FaqItem 
                  question="Can I volunteer at Manfete?" 
                  answer="Absolutely! We rely on volunteers to help make Manfete a success. Volunteers receive free admission for the days they work, a festival t-shirt, and meals during their shifts. Applications for volunteers open approximately four months before the festival." 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-primary">Contact Information</h2>
                  <p className="mb-6 text-muted-foreground">
                    Have questions or need more information about Manfete? We're here to help! 
                    Reach out to us using any of the contact methods below.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Map className="mr-3 mt-1 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-muted-foreground">
                          Manfete Headquarters<br />
                          123 Festival Avenue<br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="mr-3 mt-1 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">
                          General Inquiries: <a href="mailto:info@manfete.com" className="hover:underline">info@manfete.com</a><br />
                          Press: <a href="mailto:press@manfete.com" className="hover:underline">press@manfete.com</a><br />
                          Sponsorship: <a href="mailto:sponsors@manfete.com" className="hover:underline">sponsors@manfete.com</a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="mr-3 mt-1 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-muted-foreground">
                          Main Office: +1 (555) 123-4567<br />
                          Ticket Support: +1 (555) 987-6543
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="mr-3 mt-1 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">Office Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9:00 AM - 5:00 PM<br />
                          Weekends: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-primary">Send Us a Message</h2>
                  <div className="rounded-lg border p-6">
                    <form className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-1 block text-sm font-medium">
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-1 block text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            placeholder="Your email"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="mb-1 block text-sm font-medium">
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          placeholder="Subject of your message"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="mb-1 block text-sm font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          placeholder="Your message"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="rounded-md bg-festival-purple px-4 py-2 font-medium text-white hover:bg-festival-purple/90"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                  
                  <div className="mt-6 rounded-lg bg-muted/30 p-4">
                    <h3 className="mb-2 font-semibold">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-primary hover:text-primary/80">
                        <Facebook size={20} />
                      </a>
                      <a href="#" className="text-primary hover:text-primary/80">
                        <Instagram size={20} />
                      </a>
                      <a href="#" className="text-primary hover:text-primary/80">
                        <Twitter size={20} />
                      </a>
                      <a href="#" className="text-primary hover:text-primary/80">
                        <Youtube size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const TeamMember = ({ name, role, image }: TeamMemberProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 h-32 w-32 overflow-hidden rounded-full">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover" 
        />
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-2 flex items-center text-lg font-semibold">
        <Award className="mr-2 h-5 w-5 text-primary" />
        {question}
      </h3>
      <Separator className="mb-3" />
      <p className="text-muted-foreground">{answer}</p>
    </div>
  );
};

// Import these icons for the About page
const Music = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const Paintbrush = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
    <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
    <path d="M14.5 17.5 4.5 15" />
  </svg>
);

const UtensilsCrossed = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
    <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
    <path d="m2.1 21.8 6.4-6.3" />
    <path d="m19 5-7 7" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const Facebook = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Twitter = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Youtube = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default About;
