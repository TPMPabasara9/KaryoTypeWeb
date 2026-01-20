import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Professional DNA/Chromosome Logo Component


export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-gray-900 tracking-tight">KaryoAI</span>
              <span className="text-xs text-gray-500 font-medium tracking-wide">Cytogenetic Analysis</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <a 
              href="#features" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              How It Works
            </a>
            <a 
              href="#benefits" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Clinical Benefits
            </a>
            <a 
              href="#resources" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Resources
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
          
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white font-medium shadow-sm"
              onClick={() => navigate("/demo")}
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-1">
              <a 
                href="#features" 
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#benefits" 
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Clinical Benefits
              </a>
              <a 
                href="#resources" 
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </a>
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium"
                  onClick={() => navigate("/demo")}
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