import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import OurStory from "./components/OurStory";
import PhotoGallery from "./components/PhotoGallery";
import RSVPForm from "./components/RSVPForm";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import { Toaster } from "./components/ui/toaster";
import EnvelopeSiteOpener from "./components/EnvelopeAnimation";

const WeddingInvitation = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <OurStory />
      <PhotoGallery />
      <RSVPForm />
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <EnvelopeSiteOpener>
          <Routes>
            <Route path="/" element={<WeddingInvitation />} />
          </Routes>
        </EnvelopeSiteOpener>
        {/* Music Player outside envelope wrapper - always visible */}
        <MusicPlayer />
      </BrowserRouter>
    </div>
  );
}

export default App;