import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function DemoVideo() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900  to-slate-900">
            {/* Navigation Bar */}
            <div className="bg-black bg-opacity-50 backdrop-blur-sm sticky top-0 z-50 border-b border-blue-500 border-opacity-30">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <Button
                        variant="ghost"
                        className="text-white hover:text-blue-400 hover:bg-blue-900 hover:bg-opacity-50 transition-all"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Demo Video</h1>
                    <p className="text-xl text-blue-200 max-w-2xl">
                        Watch our intelligent chromosome detection and classification system in action
                    </p>
                </div>

                {/* Video Container */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-blue-500 border-opacity-30 bg-black bg-opacity-50">
                    <div style={{ aspectRatio: "16/9" }} className="relative">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/CzL1CJ--314?si=-eXVkz1XfqNEzDci"
                            title="Demo Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* Description Section */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-blue-900 to-blue-800 bg-opacity-40 rounded-lg p-6 border border-blue-500 border-opacity-20">
                        <h3 className="text-lg font-semibold text-blue-100 mb-2">Smart Detection</h3>
                        <p className="text-gray-300 text-sm">Automated chromosome detection and extraction from microscopic images</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-900 to-blue-800 bg-opacity-40 rounded-lg p-6 border border-blue-500 border-opacity-20">
                        <h3 className="text-lg font-semibold text-blue-100 mb-2">Intelligent Classification</h3>
                        <p className="text-gray-300 text-sm">AI-powered karyotype analysis and chromosome classification</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-900 to-blue-800 bg-opacity-40 rounded-lg p-6 border border-blue-500 border-opacity-20">
                        <h3 className="text-lg font-semibold text-blue-100 mb-2">Instant Reports</h3>
                        <p className="text-gray-300 text-sm">Generate comprehensive karyotyping reports in seconds</p>
                    </div>
                </div>
            </div>
        </div>
    );
}