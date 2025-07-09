import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import AnimatedBackground from "./components/Background.jsx";
import Navbar from "./components/Navbar.jsx";
import Portofolio from "./Pages/Portofolio.jsx"; 
import ContactPage from "./Pages/Contact.jsx";
import ProjectDetails from "./components/ProjectDetail.jsx";
import WelcomeScreen from "./Pages/WelcomeScreen.jsx";
import LoginPage from "./Pages/Login.jsx";
import Pengalaman from "./components/Pengalaman.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import { AnimatePresence } from 'framer-motion';
import NotFound from "./NotFound.jsx";
// import Galeri from "./Pages/Galeri.jsx"

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <div className="relative w-full min-h-screen overflow-x-hidden">
          <Navbar />
          <AnimatedBackground />
          <main className="flex flex-col">
            <Home />
            <About />
            <Pengalaman />
            <Portofolio />
            <ContactPage />
            {/* <Galeri /> */}
          </main>

          {/* Footer */}
          <footer className=" mt-12 xs:mt-16 px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 py-8 xs:py-10 text-gray-800 text-[10px] xs:text-xs sm:text-sm font-medium">


            <div className="text-center mt-6 xs:mt-8 sm:mt-10 text-gray-500 text-[10px] xs:text-xs">
              © 2025 Ludang Prasetyo Nugroho. Fullstack Developer.
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <div className="relative w-full min-h-screen overflow-x-hidden">
    <Navbar />
    <main className="flex flex-col">
      <ProjectDetails />
    </main>
    <footer className="border-t-4 border-orange-500 mt-12 xs:mt-16 px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 py-6 xs:py-8 bg-orange-50 text-gray-800 text-[10px] xs:text-xs sm:text-sm font-medium">
      <div className="max-w-7xl mx-auto w-full text-center">
        <p className="text-gray-500">
          © 2025{" "}
          <a
            href="https://github.com/Nugraa21"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            Nugra21
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  </div>
);

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const addHoverEvents = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, label, [role="button"]');

      const handleMouseEnter = () => setHovered(true);
      const handleMouseLeave = () => setHovered(false);

      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    window.addEventListener("mousemove", moveCursor);
    const cleanupHover = addHoverEvents();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cleanupHover();
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${hovered ? 'custom-cursor-hover' : ''} hidden sm:block`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portofolio />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pengalaman" element={<Pengalaman />} />
          <Route path="/project/:id" element={<ProjectPageLayout />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;