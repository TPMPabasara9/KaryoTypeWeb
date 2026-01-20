import { Button } from "./ui/button";
import { ArrowRight, Mail, Calendar } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Genetic Diagnostics?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join hundreds of laboratories worldwide using KaryoAI for faster, more accurate genetic analysis. 
            Schedule a demo to see how our AI-powered platform can enhance your workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-base group px-8"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Demo
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 text-base px-8"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
