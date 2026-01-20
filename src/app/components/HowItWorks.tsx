import { Upload, Cpu, CheckCircle2, Download } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Capture Images",
      description: "Import metaphase spread images from your microscopy system in standard formats",
      step: "01"
    },
    {
      icon: Cpu,
      title: "AI Processing",
      description: "Our AI automatically segments, classifies, and arranges chromosomes with precision",
      step: "02"
    },
    {
      icon: CheckCircle2,
      title: "Review & Validate",
      description: "Review AI results, make adjustments if needed, and validate findings",
      step: "03"
    },
    {
      icon: Download,
      title: "Generate Report",
      description: "Export comprehensive reports with karyogram, analysis, and clinical notes",
      step: "04"
    }
  ];

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

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <step.icon className="w-8 h-8" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-blue-200 mt-4"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="text-sm font-bold text-blue-600 mb-2">STEP {step.step}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1681911046064-e663d5192921?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxETkElMjBjaHJvbW9zb21lfGVufDF8fHx8MTc2ODgwNDgzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="DNA Chromosome visualization"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 -top-6 -right-6 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -z-10 -bottom-6 -left-6 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { value: "< 5 min", label: "Average Analysis Time" },
            { value: "99.2%", label: "Classification Accuracy" },
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
