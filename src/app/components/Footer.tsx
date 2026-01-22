import { Mail, Phone, MapPin, WebhookIcon, Webhook } from "lucide-react";
import logo from "../../assets/logo1.png";
import ContactForm from "../pages/ContactFormPage";
import { useNavigate } from "react-router-dom";


export function Footer() {

  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="ChromoTraQ Logo"
                className="h-16 w-16 rounded-lg p-2 shadow-md ring-1 ring-gray-200 object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-200">
                  ChromoTraQ
                </span>
                <span className="mt-0.5 text-sm sm:text-base uppercase tracking-[0.1em] text-blue-200/80">
                  Smart Karyotyping System
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Advanced AI-powered karyotyping software for precise genetic diagnosis and chromosomal analysis.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#"  className="hover:text-white transition-colors" >Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Publications</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Webhook className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@karyoai.com" className="hover:text-white transition-colors">
                  http://www.quantinetechnologies.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +94718679805
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  41/3,
                  Ransilu Uyana<br />
                  Arangala, Colombo , Sri Lanka
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2026 KaryoAI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
