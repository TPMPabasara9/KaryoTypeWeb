import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Professional DNA/Chromosome Logo Component

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logo = new URL('../../assets/logo1.png', import.meta.url).href;
  const pdfPath = new URL('../../assets/chromotraq.pdf', import.meta.url).href;

  // Helper to scroll or navigate to section
  const handleSectionNav = (hash: string) => {
    if (location.pathname !== "/") {
      navigate(`/${hash}`);
      // Wait for navigation, then scroll
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = hash;
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-24">
          {/* Logo and Brand */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <img
              src={logo}
              alt="ChromoTraQ Logo"
              className="h-12 w-12 sm:h-18 sm:w-18 rounded-lg p-1 sm:p-2 shadow-md ring-1 ring-gray-200 object-contain"
            />
            <div className="flex flex-col leading-none min-w-0">
              <span className="text-lg sm:text-3xl md:text-4xl font-bold tracking-tight text-blue-800 whitespace-nowrap overflow-hidden text-ellipsis">
                ChromoTraQ
              </span>
              <span className="hidden sm:block mt-0.5 text-xs sm:text-base uppercase tracking-[0.1em] text-blue-700 whitespace-nowrap overflow-hidden text-ellipsis">
               Smart Karyotyping System
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              className="px-4 py-2.5 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => handleSectionNav('#features')}
            >
              Features
            </button>
            <button
              className="px-4 py-2.5 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => handleSectionNav('#how-it-works')}
            >
              How It Works
            </button>
            <button
              className="px-4 py-2.5 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => handleSectionNav('#benefits')}
            >
              Clinical Benefits
            </button>
            <a
              href="/src/assets/chromotraq.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Resources
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
          
            <Button 
              className="h-11 px-6 bg-blue-700 hover:bg-blue-800 text-white text-base font-medium shadow-sm"
              onClick={() => navigate("/demo")}
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 ml-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 sm:w-10 sm:h-10" />
            ) : (
              <Menu className="w-6 h-6 sm:w-10 sm:h-10" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-2 sm:py-4">
            <div className="flex flex-col gap-1">
              <button
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                onClick={() => handleSectionNav('#features')}
              >
                Features
              </button>
              <button
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                onClick={() => handleSectionNav('#how-it-works')}
              >
                How It Works
              </button>
              <button
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                onClick={() => handleSectionNav('#benefits')}
              >
                Clinical Benefits
              </button>
              <a
                href="/src/assets/chromotraq.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </a>
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium"
                  onClick={() => { setMobileMenuOpen(false); navigate("/demo"); }}
                >
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
