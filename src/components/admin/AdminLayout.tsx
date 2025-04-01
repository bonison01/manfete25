
import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthContext";
import { AlertCircle, Image, Calendar, Users, LogOut } from "lucide-react";

const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: <AlertCircle className="h-5 w-5" /> },
    { path: "/admin/events", label: "Events", icon: <Calendar className="h-5 w-5" /> },
    { path: "/admin/gallery", label: "Gallery", icon: <Image className="h-5 w-5" /> },
    { path: "/admin/registrations", label: "Registrations", icon: <Users className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-festival-dark p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold text-festival-gold">Manfete Admin</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-300">
              {user?.email}
            </span>
            <Button
              variant="ghost"
              className="text-white hover:bg-festival-purple/20"
              onClick={signOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
          <Button
            variant="ghost"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 ${
                    isActive
                      ? "bg-festival-purple/10 text-festival-purple"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
                end={item.path === "/admin"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </NavLink>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <div className="px-4 py-2 text-sm text-gray-600">
                {user?.email}
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-red-600"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:flex">
        {/* Sidebar (desktop) */}
        <div className="hidden md:block md:w-64 bg-white shadow-sm rounded-lg p-4 h-fit">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-festival-purple/10 text-festival-purple"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
                end={item.path === "/admin"}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="md:flex-1 md:ml-6 mt-6 md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
