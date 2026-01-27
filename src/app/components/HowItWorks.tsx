import { Upload, Cpu, CheckCircle2, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { Button } from "./ui/button";

export function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Upload,
      title: "Capture Images",
      description: "Import metaphase spread images from your microscopy system in standard formats. Our system supports high-resolution images from various microscopy platforms.",
      step: "01",
      image: "/src/assets/Capturing.png"
    },
    {
      icon: Cpu,
      title: "AI Processing",
      description: "Our AI automatically segments, classifies, and arranges chromosomes with precision. Advanced deep learning algorithms analyze metaphase spreads in real-time.",
      step: "02",
      image: "/src/assets/AIProcessing.png"
    },
    {
      icon: CheckCircle2,
      title: "Review & Validate",
      description: "Review AI results, make adjustments if needed, and validate findings. Our intuitive interface makes it easy to refine and confirm results.",
      step: "03",
      image: "/src/assets/Validate.png"
    },
    {
      icon: Download,
      title: "Generate Report",
      description: "Export comprehensive reports with karyogram, analysis, and clinical notes. Generate professional documentation ready for clinical use.",
      step: "04",
      image: "/src/assets/report.png"
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Workflow
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simple, Efficient Process
          </h2>
          <p className="text-xl text-gray-600">
            From image capture to final report in four streamlined steps
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Carousel */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white h-80 lg:h-96">
                <ImageWithFallback
                  src={steps[currentStep].image}
                  alt={steps[currentStep].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevStep}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextStep}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                aria-label="Next step"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Decorative elements */}
              <div className="absolute -z-10 -top-6 -right-6 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -z-10 -bottom-6 -left-6 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>
            </div>

            {/* Content Section */}
            <div className="order-1 lg:order-2">
              <div className="flex flex-col gap-6">
                {/* Step Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                      {(() => {
                        const IconComponent = steps[currentStep].icon;
                        return <IconComponent className="w-8 h-8" />;
                      })()}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-blue-600">STEP {steps[currentStep].step}</div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        {steps[currentStep].title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed ml-0">
                    {steps[currentStep].description}
                  </p>
                </div>

                {/* Step Indicators */}
                <div className="flex gap-3 mt-8">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToStep(index)}
                      className={`h-2 rounded-full transition-all duration-50 ${
                        index === currentStep
                          ? "bg-blue-600 w-8"
                          : "bg-blue-200 w-2 hover:bg-blue-300"
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-4">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { value: "< 5 min", label: "Average Analysis Time" },
            { value: "90.2%", label: "Classification Accuracy" },
            { value: "95%", label: "Time Reduction" },
            { value: "24/7", label: "Available Processing" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
