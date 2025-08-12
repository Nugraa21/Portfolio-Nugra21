import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { href: "#Home", label: "Home" },
  { href: "#About", label: "About" },
  { href: "#Experience", label: "Experience" },
  { href: "#Portofolio", label: "Portofolio" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll tracking & active section (only on /)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname === "/") {
        const sections = navItems
          .map((item) => {
            const section = document.querySelector(item.href);
            if (section) {
              return {
                id: item.href.replace("#", ""),
                offset: section.offsetTop - 150,
                height: section.offsetHeight,
              };
            }
            return null;
          })
          .filter(Boolean);

        const currentPosition = window.scrollY;

        const active = sections.find(
          (section) =>
            currentPosition >= section.offset &&
            currentPosition < section.offset + section.height
        );

        setActiveSection(active ? active.id : "Home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // inisialisasi
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Disable body scroll saat mobile menu terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const navigateAndScroll = (e, href) => {
    e.preventDefault();

    if (href === "/login") {
      setIsOpen(false);
      navigate("/login");
      return;
    }

    const sectionId = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const section = document.querySelector(href);
      if (section) {
        const top = section.offsetTop - 100;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setIsOpen(false);
    }
  };

  // Setelah navigasi antar-route, handle scrollTo state
  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      const section = document.querySelector(`#${location.state.scrollTo}`);
      if (section) {
        const top = section.offsetTop - 100;
        window.scrollTo({ top, behavior: "smooth" });
      }
      navigate("/", { state: null, replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      {/* =========================
          DESKTOP FLOATING NAVBAR
          Hidden on small screens (md:block)
         ========================= */}
      <nav
        className={`hidden md:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-white/85 backdrop-blur-sm shadow-lg"
            : "bg-white/50 backdrop-blur-xl"
        } rounded-2xl px-6 py-3`}
        style={{ width: "90%", maxWidth: "1100px" }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={(e) => navigateAndScroll(e, "#Home")}
              className="text-2xl font-extrabold text-orange-500 tracking-wide select-none"
            >
              Nugra21
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={location.pathname === "/" ? item.href : "/"}
                onClick={(e) => navigateAndScroll(e, item.href)}
                className={`group relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.href.substring(1) && location.pathname === "/"
                    ? "text-orange-500 font-semibold"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 w-full h-0.5 bg-orange-500 transform origin-left transition-transform duration-300 ${
                    activeSection === item.href.substring(1) && location.pathname === "/"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}

            {/* Login Button */}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md transform transition-all duration-200 hover:-translate-y-0.5 hover:scale-105`}
              aria-label="Login"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* =========================
          MOBILE NAVBAR (unchanged, md:hidden)
         ========================= */}
      <nav
        className={`md:hidden fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled || isOpen ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                onClick={(e) => navigateAndScroll(e, "#Home")}
                className="text-2xl font-extrabold text-orange-500 tracking-wide"
              >
                Nugra21
              </Link>
            </div>

            {/* Desktop menu hidden on mobile, we show hamburger */}
            <div className="md:hidden">
              <button
                aria-label={isOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsOpen(!isOpen)}
                className="text-orange-500 hover:text-orange-600 transition-colors duration-300"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-white transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
          style={{ top: "64px" }}
        >
          <div className="flex flex-col h-full pt-8">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                to={location.pathname === "/" ? item.href : "/"}
                onClick={(e) => navigateAndScroll(e, item.href)}
                className={`px-6 py-4 text-lg font-medium transition-all duration-300 ${
                  activeSection === item.href.substring(1) && location.pathname === "/"
                    ? "text-orange-500 font-semibold"
                    : "text-gray-700 hover:text-orange-500"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isOpen ? "translateX(0)" : "translateX(50px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-auto px-6 py-4 text-lg font-semibold text-white bg-orange-500 rounded mx-6 mb-8 hover:bg-orange-600 transition"
              style={{
                transitionDelay: `${navItems.length * 100}ms`,
                transform: isOpen ? "translateX(0)" : "translateX(50px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
