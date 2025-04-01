
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="festival-gradient bg-clip-text text-2xl font-extrabold text-transparent">MANFETE</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild className="bg-festival-purple text-white hover:bg-festival-purple/90">
            <Link to="/register">Register Now</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="p-2 text-foreground md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 z-50 border-b bg-background px-4 py-2 shadow-lg md:hidden">
          <div className="flex flex-col space-y-3 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground/80 transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full bg-festival-purple text-white hover:bg-festival-purple/90">
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                Register Now
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
