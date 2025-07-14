import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const WarningPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-bold text-red-600 mb-4">Unauthorized Action</h2>
        <p className="text-gray-700 mb-6">
          Copying content, accessing source code, or opening developer tools is prohibited. 
          Please respect the intellectual property of this website.
        </p>
        <button
          onClick={onClose}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

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
          </main>

          <footer className="mt-12 xs:mt-16 px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 py-8 xs:py-10 text-gray-800 text-[10px] xs:text-xs sm:text-sm font-medium">
            <div className="text-center mt-6 xs:mt-8 sm:mt-10 text-gray-500">
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
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setShowWarning(true);
    };

    const handleCopy = (e) => {
      setShowWarning(true);
    };

    const handleKeyDown = (e) => {
      // Detect F12, Ctrl+U, Ctrl+Shift+C, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+L
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.shiftKey && e.key === 'L')
      ) {
        e.preventDefault();
        setShowWarning(true);
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <CustomCursor />
      <WarningPopup isOpen={showWarning} onClose={() => setShowWarning(false)} />
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