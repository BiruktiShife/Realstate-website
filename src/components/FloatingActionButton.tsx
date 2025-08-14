"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";

export function FloatingActionButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showMenu && (
        <div className="flex flex-col gap-3 mb-3 animate-fade-in-up">
          {/* Contact Button */}
          <div className="animate-fade-in animation-delay-200">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
              onClick={() => window.open("tel:+251933031633")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </Button>
          </div>

          {/* Chat Button */}
          <div className="animate-fade-in animation-delay-400">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              onClick={() => alert("Chat feature coming soon!")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </div>

          {/* Scroll to Top Button */}
          {showScrollTop && (
            <div className="animate-fade-in animation-delay-400">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/90 backdrop-blur-sm shadow-lg"
                onClick={scrollToTop}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Top
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Main FAB */}
      <div className="hover:scale-110 active:scale-90 transition-transform duration-200">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl p-0"
          onClick={() => setShowMenu(!showMenu)}
        >
          <div
            className={`transition-transform duration-200 ${
              showMenu ? "rotate-45" : "rotate-0"
            }`}
          >
            <MessageCircle className="w-6 h-6" />
          </div>
        </Button>
      </div>
    </div>
  );
}
