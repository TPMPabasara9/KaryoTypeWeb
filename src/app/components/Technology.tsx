import { Brain, ScanLine, Layers, GitBranch } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import spectralImg from "../../assets/Sky_spectral_karyotype.gif";

export function Technology() {
  const techFeatures = [
    {
      icon: Brain,
      title: "Deep Learning Models",
      description: "Trained on thousands of karyotypes for superior pattern recognition",
      highlight: "Neural Networks"
    },
    {
      icon: ScanLine,
      title: "Advanced Segmentation",
      description: "Precise chromosome boundary detection even in overlapping cases",
      highlight: "Edge Detection"
    },
    {
      icon: Layers,
      title: "Multi-Modal Analysis",
      description: "Seamlessly process both G-banding and FISH imaging techniques",
      highlight: "Dual Support"
    },
    {
      icon: GitBranch,
      title: "Continuous Learning",
      description: "Models improve over time with validated case data and feedback",
      highlight: "Self-Improving"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                AI Technology
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Our proprietary machine learning algorithms deliver industry-leading accuracy in chromosome 
              segmentation and classification, validated across diverse patient populations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {techFeatures.map((feature, index) => (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-400 font-medium mb-1">{feature.highlight}</div>
                        <h3 className="font-semibold text-white">{feature.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex items-center gap-8 pt-6 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-blue-400">46</div>
                <div className="text-sm text-gray-400">Chromosome Types</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">10K+</div>
                <div className="text-sm text-gray-400">Training Images</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">99.2%</div>
                <div className="text-sm text-gray-400">AI Accuracy</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={spectralImg}
                alt="Genetic research laboratory"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
              
              {/* Floating tech badges */}

            </div>

            {/* Decorative glow effects */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { label: "Supported Formats", value: "TIFF, PNG, DICOM" },
            { label: "Processing Speed", value: "< 5 minutes" },
            { label: "Chromosome Detection", value: "Automated" },
            { label: "Report Generation", value: "Instant" }
          ].map((spec, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="text-sm text-gray-400 mb-2">{spec.label}</div>
              <div className="text-lg font-semibold text-white">{spec.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
