
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-festival-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-festival-gold">MANFETE</h3>
            <p className="mb-4 text-gray-300">
              The premier cultural event celebrating art, music, and community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-festival-gold">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-festival-gold">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-festival-gold">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-festival-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-festival-gold">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-festival-gold">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-festival-gold">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/sponsors" className="text-gray-300 hover:text-festival-gold">
                  Sponsors
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-festival-gold">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-festival-gold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-festival-gold" />
                <span className="text-gray-300">123 Festival Avenue, City Center</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-festival-gold" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-festival-gold" />
                <span className="text-gray-300">info@manfete.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-festival-gold">Newsletter</h4>
            <p className="mb-4 text-gray-300">
              Subscribe to our newsletter for updates about upcoming events.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="rounded-md border border-gray-600 bg-gray-800 p-2 text-gray-300 placeholder-gray-500 focus:border-festival-gold focus:outline-none"
              />
              <button className="rounded-md bg-festival-gold px-4 py-2 font-medium text-festival-dark hover:bg-festival-gold/90">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>© {currentYear} Manfete. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
