import React, { useState, useEffect, useRef } from "react";

interface HowItWorksProps {
  isInView: boolean;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ isInView }) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const hasAutoOpened = useRef(false);

  useEffect(() => {
    if (isInView && !hasAutoOpened.current) {
      // Auto-open first accordion when section comes into view (only once)
      setActiveAccordion(1);
      hasAutoOpened.current = true;
    }
  }, [isInView]);

  return (
    <section className="relative z-10 py-8 md:py-16 mt-20 md:mt-40 px-4 md:px-0" data-section="how-it-works">
      {/* Angular Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/angular.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 1,
        }}
      ></div>

      {/* Marquee Header - Full Width */}
      <div
        className={`overflow-hidden mb-12 ${
          isInView ? "animate-fade-in" : "opacity-0"
        }`}
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set */}
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            HOW IT WORKS
          </span>
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            •
          </span>
          <span
            className="text-2xl md:text-4xl font-bold mr-4 md:mr-8 px-2 md:px-4 py-1 md:py-2"
            style={{
              fontFamily: "DM Mono, monospace",
              backgroundColor: "#14B984",
              color: "black",
            }}
          >
            HOW IT WORKS
          </span>
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            •
          </span>
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            HOW IT WORKS
          </span>
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            •
          </span>
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            HOW IT WORKS
          </span>
          
          {/* Duplicate set for seamless loop */}
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            •
          </span>
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            HOW IT WORKS
          </span>
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            •
          </span>
          <span
            className="text-2xl md:text-4xl font-bold mr-4 md:mr-8 px-2 md:px-4 py-1 md:py-2"
            style={{
              fontFamily: "DM Mono, monospace",
              backgroundColor: "#14B984",
              color: "black",
            }}
          >
            HOW IT WORKS
          </span>
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            •
          </span>
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            HOW IT WORKS
          </span>
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            •
          </span>
          <span className="text-2xl md:text-4xl font-bold mr-4 md:mr-8" style={{ fontFamily: "DM Mono, monospace", color: "white" }}>
            HOW IT WORKS
          </span>
        </div>
        </div>

      <div className="max-w-4xl mx-auto relative z-10 px-4 md:px-0">
        {/* Accordion Steps */}
        <div className="space-y-4">
          {/* Step 1 */}
          <div
            className={`border border-gray-600 overflow-hidden ${
              isInView ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={() =>
                setActiveAccordion(activeAccordion === 1 ? null : 1)
              }
              className={`w-full px-4 md:px-6 py-3 md:py-4 text-left flex justify-between items-center transition-all duration-300 ${
                activeAccordion === 1
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              style={{
                fontFamily: "DM Mono, monospace",
                backgroundColor: activeAccordion === 1 ? "#14B984" : "#2a2a2a",
                border: activeAccordion === 1 ? "none" : "1px solid #666666",
                transition: isInView ? "border 0.3s ease-in-out" : "none",
              }}
            >
              <span
                className="text-base md:text-lg font-semibold"
                style={{
                  color: activeAccordion === 1 ? "white" : "#d1d5db",
                  transition: isInView ? "color 0.3s ease-in-out" : "none",
                }}
              >
                1. Enter an Expression
              </span>
              <span
                className="text-xl w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: activeAccordion === 1 ? "#14B984" : "black",
                  color: activeAccordion === 1 ? "white" : "white",
                  transition: isInView ? "all 0.3s ease-in-out" : "none",
                }}
              >
                {activeAccordion === 1 ? "−" : "+"}
              </span>
            </button>
            {activeAccordion === 1 && (
              <div
                className={`px-4 md:px-6 py-3 md:py-4 text-white ${
                  isInView ? "animate-fade-in" : ""
                }`}
                style={{ backgroundColor: "#14B984" }}
              >
                <p style={{ fontFamily: "DM Mono, monospace" }}>
                  Type an arithmetic expression into the input box. You may use
                  numbers, operators (+-*/^), and parentheses (). Whitespace is
                  optional and will be ignored by the tokenizer.
                </p>
              </div>
            )}
          </div>

          {/* Step 2 */}
          <div
            className={`border border-gray-600 overflow-hidden ${
              isInView ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            <button
              onClick={() =>
                setActiveAccordion(activeAccordion === 2 ? null : 2)
              }
              className={`w-full px-4 md:px-6 py-3 md:py-4 text-left flex justify-between items-center transition-all duration-300 ${
                activeAccordion === 2
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              style={{
                fontFamily: "DM Mono, monospace",
                backgroundColor: activeAccordion === 2 ? "#14B984" : "#2a2a2a",
                border: activeAccordion === 2 ? "none" : "1px solid #666666",
                transition: isInView ? "border 0.3s ease-in-out" : "none",
              }}
            >
              <span
                className="text-base md:text-lg font-semibold"
                style={{
                  color: activeAccordion === 2 ? "white" : "#d1d5db",
                  transition: isInView ? "color 0.3s ease-in-out" : "none",
                }}
              >
                2. Run the Tokenizer
              </span>
              <span
                className="text-xl w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: activeAccordion === 2 ? "#14B984" : "black",
                  color: activeAccordion === 2 ? "white" : "white",
                  transition: isInView ? "all 0.3s ease-in-out" : "none",
                }}
              >
                {activeAccordion === 2 ? "−" : "+"}
              </span>
            </button>
            {activeAccordion === 2 && (
              <div
                className={`px-4 md:px-6 py-3 md:py-4 text-white ${
                  isInView ? "animate-fade-in" : ""
                }`}
                style={{ backgroundColor: "#14B984" }}
              >
                <p style={{ fontFamily: "DM Mono, monospace" }}>
                  Click the Run Tokenizer button. The system will read your
                  input and break it down into smaller units called tokens.
                </p>
              </div>
            )}
          </div>

          {/* Step 3 */}
          <div
            className={`border border-gray-600 overflow-hidden ${
              isInView ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.8s" }}
          >
            <button
              onClick={() =>
                setActiveAccordion(activeAccordion === 3 ? null : 3)
              }
              className={`w-full px-4 md:px-6 py-3 md:py-4 text-left flex justify-between items-center transition-all duration-300 ${
                activeAccordion === 3
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              style={{
                fontFamily: "DM Mono, monospace",
                backgroundColor: activeAccordion === 3 ? "#14B984" : "#2a2a2a",
                border: activeAccordion === 3 ? "none" : "1px solid #666666",
                transition: isInView ? "border 0.3s ease-in-out" : "none",
              }}
            >
              <span
                className="text-base md:text-lg font-semibold"
                style={{
                  color: activeAccordion === 3 ? "white" : "#d1d5db",
                  transition: isInView ? "color 0.3s ease-in-out" : "none",
                }}
              >
                3. View the Tokens
              </span>
              <span
                className="text-xl w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: activeAccordion === 3 ? "#14B984" : "black",
                  color: activeAccordion === 3 ? "white" : "white",
                  transition: isInView ? "all 0.3s ease-in-out" : "none",
                }}
              >
                {activeAccordion === 3 ? "−" : "+"}
              </span>
            </button>
            {activeAccordion === 3 && (
              <div
                className={`px-4 md:px-6 py-3 md:py-4 text-white ${
                  isInView ? "animate-fade-in" : ""
                }`}
                style={{ backgroundColor: "#14B984" }}
              >
                <p style={{ fontFamily: "DM Mono, monospace" }}>
                  Each token will be displayed in a table with its lexeme,
                  category (such as number, operator, or parenthesis), and its
                  position in the input string. This lets you see how the
                  tokenizer interprets every part of your expression.
                </p>
              </div>
            )}
          </div>

          {/* Step 4 */}
          <div
            className={`border border-gray-600 overflow-hidden ${
              isInView ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "1.0s" }}
          >
            <button
              onClick={() =>
                setActiveAccordion(activeAccordion === 4 ? null : 4)
              }
              className={`w-full px-4 md:px-6 py-3 md:py-4 text-left flex justify-between items-center transition-all duration-300 ${
                activeAccordion === 4
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              style={{
                fontFamily: "DM Mono, monospace",
                backgroundColor: activeAccordion === 4 ? "#14B984" : "#2a2a2a",
                border: activeAccordion === 4 ? "none" : "1px solid #666666",
                transition: isInView ? "border 0.3s ease-in-out" : "none",
              }}
            >
              <span
                className="text-base md:text-lg font-semibold"
                style={{
                  color: activeAccordion === 4 ? "white" : "#d1d5db",
                  transition: isInView ? "color 0.3s ease-in-out" : "none",
                }}
              >
                4. Check for Validity
              </span>
              <span
                className="text-xl w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: activeAccordion === 4 ? "#14B984" : "black",
                  color: activeAccordion === 4 ? "white" : "white",
                  transition: isInView ? "all 0.3s ease-in-out" : "none",
                }}
              >
                {activeAccordion === 4 ? "−" : "+"}
              </span>
            </button>
            {activeAccordion === 4 && (
              <div
                className={`px-4 md:px-6 py-3 md:py-4 text-white ${
                  isInView ? "animate-fade-in" : ""
                }`}
                style={{ backgroundColor: "#14B984" }}
              >
                <p style={{ fontFamily: "DM Mono, monospace" }}>
                  The tokens are then checked against the grammar rules. A green
                  banner means your expression is valid, while a red banner
                  means it contains an error. If invalid, the message will point
                  out where the issue occurred.
                </p>
              </div>
            )}
          </div>

          {/* Step 5 */}
          <div
            className={`border border-gray-600 overflow-hidden ${
              isInView ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "1.2s" }}
          >
            <button
              onClick={() =>
                setActiveAccordion(activeAccordion === 5 ? null : 5)
              }
              className={`w-full px-4 md:px-6 py-3 md:py-4 text-left flex justify-between items-center transition-all duration-300 ${
                activeAccordion === 5
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              style={{
                fontFamily: "DM Mono, monospace",
                backgroundColor: activeAccordion === 5 ? "#14B984" : "#2a2a2a",
                border: activeAccordion === 5 ? "none" : "1px solid #666666",
                transition: isInView ? "border 0.3s ease-in-out" : "none",
              }}
            >
              <span
                className="text-base md:text-lg font-semibold"
                style={{
                  color: activeAccordion === 5 ? "white" : "#d1d5db",
                  transition: isInView ? "color 0.3s ease-in-out" : "none",
                }}
              >
                5. Reveal the Derivation
              </span>
              <span
                className="text-xl w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: activeAccordion === 5 ? "#14B984" : "black",
                  color: activeAccordion === 5 ? "white" : "white",
                  transition: isInView ? "all 0.3s ease-in-out" : "none",
                }}
              >
                {activeAccordion === 5 ? "−" : "+"}
              </span>
            </button>
            {activeAccordion === 5 && (
              <div
                className={`px-4 md:px-6 py-3 md:py-4 text-white ${
                  isInView ? "animate-fade-in" : ""
                }`}
                style={{ backgroundColor: "#14B984" }}
              >
                <p style={{ fontFamily: "DM Mono, monospace" }}>
                  If the expression is valid, you can expand the Derivation
                  section to see how the expression is constructed from the
                  start symbol of the grammar. This shows the grammatical
                  structure that makes the expression valid.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;