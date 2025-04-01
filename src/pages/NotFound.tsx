
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-9xl font-extrabold text-festival-purple">404</h1>
          <p className="mb-8 text-2xl font-semibold text-muted-foreground">
            Oops! This page seems to have wandered off.
          </p>
          <p className="mx-auto mb-10 max-w-lg text-muted-foreground">
            The page you're looking for might have been moved, deleted, or perhaps
            never existed. Let's get you back to the festival!
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
            <Button asChild size="lg" className="bg-festival-purple hover:bg-festival-purple/90">
              <Link to="/">Return to Homepage</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/events">View Events</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
