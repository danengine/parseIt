import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavigationProps {
  currentPath: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPath }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"home" | "how-it-works" | "about-us" | null>(
    currentPath === "/" ? "home" : null
  );
  const navigate = useNavigate();

  // Update active section immediately when path changes
  useEffect(() => {
    if (currentPath === "/") {
      setActiveSection("home");
    } else {
      setActiveSection(null);
    }
  }, [currentPath]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only check sections if we're on the home page
      if (currentPath === "/") {
        // Check which section is currently in view
        const howItWorksSection = document.querySelector(
          '[data-section="how-it-works"]'
        );
        const aboutUsSection = document.querySelector(
          '[data-section="about-us"]'
        );
        
        // Check sections in order of priority (later sections first)
        let activeSectionFound = false;
        
        // Check About Us section (highest priority - comes last)
        if (aboutUsSection && !activeSectionFound) {
          const rect = aboutUsSection.getBoundingClientRect();
          const isInView = rect.top <= 200 && rect.bottom >= 200;
          if (isInView) {
            setActiveSection("about-us");
            activeSectionFound = true;
          }
        }
        
        // Check How It Works section (second priority)
        if (howItWorksSection && !activeSectionFound) {
          const rect = howItWorksSection.getBoundingClientRect();
          const isInView = rect.top <= 200 && rect.bottom >= 200;
          if (isInView) {
            setActiveSection("how-it-works");
            activeSectionFound = true;
          }
        }
        
        // Only set to home if we're at the top of the page (within 100px)
        if (!activeSectionFound && window.scrollY <= 100) {
          setActiveSection("home");
        } else if (!activeSectionFound) {
          // If we're scrolled down but no section is in view, clear active section
          setActiveSection("home");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPath]);

  const scrollToTop = () => {
    if (currentPath !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollToHowItWorks = () => {
    // If not on home page, navigate to home first
    if (currentPath !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const howItWorksSection = document.querySelector(
          '[data-section="how-it-works"]'
        ) as HTMLElement;
        if (howItWorksSection) {
          const offsetTop = howItWorksSection.offsetTop - 85;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const howItWorksSection = document.querySelector(
        '[data-section="how-it-works"]'
      ) as HTMLElement;
      if (howItWorksSection) {
        const offsetTop = howItWorksSection.offsetTop - 85;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollToAboutUs = () => {
    // If not on home page, navigate to home first
    if (currentPath !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const aboutUsSection = document.querySelector(
          '[data-section="about-us"]'
        ) as HTMLElement;
        if (aboutUsSection) {
          const offsetTop = aboutUsSection.offsetTop;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const aboutUsSection = document.querySelector(
        '[data-section="about-us"]'
      ) as HTMLElement;
      if (aboutUsSection) {
        const offsetTop = aboutUsSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-sm" : "bg-transparent"
      } text-white p-4 md:p-6`}
      style={{ backgroundColor: isScrolled ? "#111212" : "transparent" }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="ParseIt Logo" className="w-8 h-8" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-12">
          <button
            onClick={scrollToTop}
            className={`transition-colors relative ${
              activeSection === "home"
                ? "text-white font-semibold"
                : "text-white hover:text-teal-400"
            }`}
            style={{ fontFamily: "DM Mono, monospace" }}
          >
            HOME
            {activeSection === "home" && (
              <div
                className="absolute -bottom-1 left-0 right-0 h-0.5"
                style={{ backgroundColor: "#14B984" }}
              ></div>
            )}
          </button>
          <button
            onClick={scrollToHowItWorks}
            className={`transition-colors relative ${
              activeSection === "how-it-works"
                ? "text-white font-semibold"
                : "text-white hover:text-teal-400"
            }`}
            style={{ fontFamily: "DM Mono, monospace" }}
          >
            HOW IT WORKS
            {activeSection === "how-it-works" && (
              <div
                className="absolute -bottom-1 left-0 right-0 h-0.5"
                style={{ backgroundColor: "#14B984" }}
              ></div>
            )}
          </button>
          <button
            onClick={scrollToAboutUs}
            className={`transition-colors relative ${
              activeSection === "about-us"
                ? "text-white font-semibold"
                : "text-white hover:text-teal-400"
            }`}
            style={{ fontFamily: "DM Mono, monospace" }}
          >
            ABOUT US
            {activeSection === "about-us" && (
              <div
                className="absolute -bottom-1 left-0 right-0 h-0.5"
                style={{ backgroundColor: "#14B984" }}
              ></div>
            )}
          </button>
          <Link
            to="/playground"
            className={`text-white px-6 py-2 transition-colors ${
              currentPath === "/playground" ? "opacity-90" : ""
            }`}
            style={{
              fontFamily: "DM Mono, monospace",
              backgroundColor: "#13B481",
            }}
          >
            PLAYGROUND
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col space-y-1 p-2"
          aria-label="Toggle mobile menu"
        >
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></div>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-700">
          <nav className="flex flex-col space-y-4 p-6">
            <button
              onClick={() => {
                scrollToTop();
                setIsMobileMenuOpen(false);
              }}
              className={`text-left transition-colors relative ${
                activeSection === "home"
                  ? "text-white font-semibold"
                  : "text-white hover:text-teal-400"
              }`}
              style={{ fontFamily: "DM Mono, monospace" }}
            >
              HOME
              {activeSection === "home" && (
                <div
                  className="absolute -bottom-1 left-0 right-0 h-0.5"
                  style={{ backgroundColor: "#14B984" }}
                ></div>
              )}
            </button>
            <button
              onClick={() => {
                scrollToHowItWorks();
                setIsMobileMenuOpen(false);
              }}
              className={`text-left transition-colors relative ${
                activeSection === "how-it-works"
                  ? "text-white font-semibold"
                  : "text-white hover:text-teal-400"
              }`}
              style={{ fontFamily: "DM Mono, monospace" }}
            >
              HOW IT WORKS
              {activeSection === "how-it-works" && (
                <div
                  className="absolute -bottom-1 left-0 right-0 h-0.5"
                  style={{ backgroundColor: "#14B984" }}
                ></div>
              )}
            </button>
            <button
              onClick={() => {
                scrollToAboutUs();
                setIsMobileMenuOpen(false);
              }}
              className={`text-left transition-colors relative ${
                activeSection === "about-us"
                  ? "text-white font-semibold"
                  : "text-white hover:text-teal-400"
              }`}
              style={{ fontFamily: "DM Mono, monospace" }}
            >
              ABOUT US
              {activeSection === "about-us" && (
                <div
                  className="absolute -bottom-1 left-0 right-0 h-0.5"
                  style={{ backgroundColor: "#14B984" }}
                ></div>
              )}
            </button>
            <Link
              to="/playground"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-white px-6 py-2 transition-colors text-left ${
                currentPath === "/playground" ? "opacity-90" : ""
              }`}
              style={{
                fontFamily: "DM Mono, monospace",
                backgroundColor: "#13B481",
              }}
            >
              PLAYGROUND
            </Link>
          </nav>
        </div>
      )}

    </header>
  );
};

export default Navigation;