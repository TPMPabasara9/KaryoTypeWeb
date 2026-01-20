import { Target, TrendingUp, Users, Award, Lock, Microscope, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import benefitsImage from "../../assets/hero_2.jpg";

export function Benefits() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const useCases = [
    {
      title: "Prenatal Diagnosis",
      description: "Detect chromosomal abnormalities in prenatal samples for early intervention planning"
    },
    {
      title: "Cancer Cytogenetics",
      description: "Identify chromosomal changes in leukemia and lymphoma for targeted treatment"
    },
    {
      title: "Constitutional Disorders",
      description: "Diagnose inherited genetic conditions and developmental abnormalities"
    },
    {
      title: "Reproductive Genetics",
      description: "Screen for chromosomal abnormalities in reproductive medicine and fertility evaluation"
    },
    {
      title: "Developmental Delays",
      description: "Identify chromosomal causes of developmental delays and intellectual disabilities"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % useCases.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + useCases.length) % useCases.length);
  };

  const benefits = [
    {
      icon: Target,
      title: "Enhanced Accuracy",
      description: "Reduce human error with AI-powered chromosome identification and classification, ensuring consistent and reliable results across all cases."
    },
    {
      icon: TrendingUp,
      title: "Increased Throughput",
      description: "Process more cases in less time, improving lab efficiency and reducing turnaround time for critical genetic diagnoses."
    },
    {
      icon: Users,
      title: "Better Patient Care",
      description: "Faster, more accurate diagnoses enable earlier interventions and improved treatment outcomes for patients with genetic disorders."
    },
    {
      icon: Award,
      title: "Expert Support",
      description: "Assists both experienced cytogeneticists and trainees with intelligent suggestions and quality control measures."
    },
    {
      icon: Lock,
      title: "Data Security",
      description: "HIPAA-compliant platform with encrypted storage and secure access controls to protect sensitive patient information."
    },
    {
      icon: Microscope,
      title: "Research Ready",
      description: "Export data for research purposes with anonymization options and integration with genetic databases and research platforms."
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Why Choose KaryoAI
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Genetic Diagnostics
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our AI-powered karyotyping solution delivers unmatched precision and efficiency, 
              enabling your lab to provide faster, more accurate genetic diagnoses while reducing workload.
            </p>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={benefitsImage}
                alt="Medical technology AI"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases Carousel */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Clinical Applications</h3>
            <p className="text-blue-100 text-lg">
              Trusted across multiple medical specialties for genetic diagnosis
            </p>
          </div>
          
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {useCases.map((useCase, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-semibold mb-4">{useCase.title}</h4>
                      <p className="text-blue-100 text-lg max-w-md mx-auto">{useCase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {useCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white w-8" : "bg-white/50 w-2"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
