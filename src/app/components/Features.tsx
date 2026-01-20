import { Dna, Sparkles, BarChart3, Clock, Shield, Zap, Eye } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import chromeDetectionImg from "../../assets/ChromeDetection1.png";
import classificationImg from "../../assets/Classification.png";
import reportImg from "../../assets/report.png";
import compareImg from "../../assets/compare.png";


export function Features() {
  const features = [
    {
      icon: Dna,
      title: "Banding Karyotyping",
      description: "Traditional G-banding analysis with AI-enhanced pattern recognition for accurate chromosome identification and banding pattern analysis.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Sparkles,
      title: "FISH Karyotyping",
      description: "Fluorescence in situ hybridization support with automated signal detection and quantification for precise genetic marker identification.",
      color: "bg-purple-100 text-purple-600"
    },


  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Core Features
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Karyotyping Solution
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need for accurate genetic diagnosis in one powerful platform
          </p>
        </div>

        {/* Main Feature Showcases with Images */}
        <div className="space-y-12 mb-16">
          {/* AI Segmentation Feature */}
          <Card className="overflow-hidden border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">AI-Powered</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Intelligent Chromosome Segmentation
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Our advanced AI algorithms automatically detect and segment individual chromosomes from metaphase spreads. 
                    The system uses deep learning to identify chromosome boundaries even in complex, overlapping cases, 
                    providing pixel-perfect segmentation masks for each chromosome.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Automatic boundary detection with 99.2% accuracy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Handles overlapping chromosomes with precision</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Real-time processing in under 2 minutes</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center p-8 bg-white">
                  <img
                    src={chromeDetectionImg}
                    alt="AI chromosome segmentation interface showing scattered chromosomes being automatically detected"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Classification Feature */}
          <Card className="overflow-hidden border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="flex items-center justify-center p-8 bg-white order-2 lg:order-1">
                  <img
                    src={classificationImg}
                    alt="Automated chromosome classification showing organized karyotype with labeled chromosome pairs"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-purple-50 to-pink-50 order-1 lg:order-2">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Automated</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Smart Chromosome Classification
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Once segmented, our AI automatically classifies and arranges chromosomes into their proper positions 
                    in the karyogram. The system identifies chromosome types, pairs them correctly, and organizes them 
                    by size and banding patterns following international cytogenetic nomenclature standards.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Automatic identification of all 24 chromosome types</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Precise pairing and arrangement following ISCN standards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Detects abnormalities and generates alerts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complete Analysis Feature */}
          <Card className="overflow-hidden border-2 border-cyan-200 hover:border-cyan-300 transition-all duration-300 shadow-lg hover:shadow-xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-cyan-50 to-blue-50">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-cyan-600 text-white rounded-xl flex items-center justify-center">
                      <Dna className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold text-cyan-600 uppercase tracking-wide">Complete Solution</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    End-to-End Karyotype Analysis
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    From raw microscopy images to final clinical reports, our platform handles the entire workflow. 
                    Support for both G-banding and FISH techniques ensures comprehensive coverage of all your 
                    cytogenetic testing needs with consistent, reliable results.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Supports G-banding and FISH methodologies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Generates professional clinical reports instantly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Integrates with existing laboratory systems</span>
                    </li>
                  </ul>
                </div>
                <div className="relative flex items-center justify-center p-8 bg-white">
                  <img
                    src={reportImg}
                    alt="Complete karyotype analysis showing segmentation, classification and final organized karyogram"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                  <div className="absolute bottom-4 right-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    46,XX Analysis Complete
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chromosome Comparison & Visualization Feature */}
          <Card className="overflow-hidden border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300 shadow-lg hover:shadow-xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative flex items-center justify-center p-8 bg-white">
                  <img
                    src={compareImg}
                    alt="Side-by-side chromosome comparison with straightened and enhanced band patterns"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center">
                      <Eye className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">Visualization</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Advanced Chromosome Comparison & Enhancement
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Compare chromosomes side-by-side with standard reference images to identify abnormalities with exceptional clarity. 
                    Our advanced image processing straightens chromosomes and enhances banding patterns, making subtle variations and 
                    structural anomalies immediately visible. Perfect for detecting deletions, duplications, and translocation breakpoints 
                    with confidence.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Side-by-side comparison with standard reference chromosomes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Automatic straightening and alignment for optimal visualization</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Enhanced banding patterns reveal minute structural variations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Highlights deletions, duplications, and translocation breakpoints</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features Grid */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Additional Capabilities</h3>
          <p className="text-gray-600">More features to enhance your diagnostic workflow</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}