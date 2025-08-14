"use client";

import { useEffect, useState } from "react";
import { Building2, Home, TrendingUp } from "lucide-react";

interface GlobalLoadingProps {
  isLoading?: boolean;
  message?: string;
}

export function GlobalLoading({ 
  isLoading = true, 
  message = "Loading your dream properties..." 
}: GlobalLoadingProps) {
  const [currentIcon, setCurrentIcon] = useState(0);
  const [dots, setDots] = useState("");

  const icons = [Building2, Home, TrendingUp];

  useEffect(() => {
    if (!isLoading) return;

    // Rotate icons every 800ms
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 800);

    // Animate dots every 500ms
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => {
      clearInterval(iconInterval);
      clearInterval(dotsInterval);
    };
  }, [isLoading, icons.length]);

  if (!isLoading) return null;

  const CurrentIcon = icons[currentIcon];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
      <div className="text-center space-y-8 px-4">
        {/* Animated Logo/Icon */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-24 h-24 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
          
          {/* Inner pulsing ring */}
          <div className="absolute inset-2 w-20 h-20 border-2 border-purple-300 dark:border-purple-700 rounded-full animate-pulse"></div>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
              <CurrentIcon className="w-8 h-8 text-white animate-bounce" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            RealEstate Pro
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 min-h-[1.5rem]">
            {message}{dots}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float`}
              style={{
                left: `${20 + (i * 12)}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + (i % 2)}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Page-specific loading component
export function PageLoading({ message }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center space-y-6 px-4">
        {/* Spinning Real Estate Icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-2 border-purple-300 dark:border-purple-700 rounded-full animate-ping"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Loading...
          </h3>
          {message && (
            <p className="text-gray-600 dark:text-gray-400">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline loading component for smaller sections
export function InlineLoading({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-2 border-blue-200 dark:border-blue-800 rounded-full animate-spin`}></div>
        <div className={`absolute inset-1 ${sizeClasses[size]} border border-blue-600 border-t-transparent rounded-full animate-spin`} style={{ animationDirection: 'reverse' }}></div>
      </div>
    </div>
  );
}
