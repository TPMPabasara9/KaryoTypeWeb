import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Benefits } from "./components/Benefits";
import { Technology } from "./components/Technology";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import ContactFormPage from "./pages/ContactFormPage";
import DemoVideo  from "./pages/DemoVideo";

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <Technology />
      <CTA />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<ContactFormPage />} />
        <Route path="/video" element={<DemoVideo />} />
      </Routes>
    </BrowserRouter>
  );
}
