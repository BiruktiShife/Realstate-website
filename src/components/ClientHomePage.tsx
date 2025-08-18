"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CompanyCard } from "@/components/CompanyCard";
import { PropertyCard } from "@/components/PropertyCard";
import { RealEstateCompany } from "@/types/realEstate";
import {
  Search,
  Filter,
  Building2,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

interface ClientHomePageProps {
  companies: RealEstateCompany[];
}

export function ClientHomePage({ companies }: ClientHomePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero background images
  const heroImages = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=1080&fit=crop", // Modern luxury interior
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop", // Beautiful home exterior
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop", // Elegant living room
  ];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Get unique locations from properties
  const locations = Array.from(
    new Set(
      companies
        .flatMap((company) => company.properties)
        .map((property) => property.location)
    )
  );

  // Filter companies based on search criteria
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = searchTerm
      ? company.properties.some(
          (property) =>
            property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            property.location
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            property.type.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;
    const matchesLocation = selectedLocation
      ? company.properties.some(
          (property) => property.location === selectedLocation
        )
      : true;
    const matchesFeatured = showFeaturedOnly ? company.featured : true;

    return matchesSearch && matchesLocation && matchesFeatured;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Images Slideshow */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl text-center animate-fade-in-up">
            Find Your Dream Property
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto drop-shadow-lg text-center px-4 animate-fade-in-up animation-delay-200">
            Connect with top-rated real estate companies and discover your
            perfect property. Professional service, exceptional results.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto mb-8 sm:mb-12 animate-fade-in-up animation-delay-400">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-center gap-1 sm:gap-2 text-blue-300 mb-2">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {companies.length}
                </span>
              </div>
              <p className="text-blue-100 text-sm sm:text-base">Companies</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-center gap-1 sm:gap-2 text-green-300 mb-2">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {companies.reduce(
                    (sum, company) => sum + company.propertiesCount,
                    0
                  )}
                </span>
              </div>
              <p className="text-blue-100 text-sm sm:text-base">Properties</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-center gap-1 sm:gap-2 text-purple-300 mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  10K+
                </span>
              </div>
              <p className="text-blue-100 text-sm sm:text-base">
                Happy Clients
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-center gap-1 sm:gap-2 text-yellow-300 mb-2">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  4.8
                </span>
              </div>
              <p className="text-blue-100 text-sm sm:text-base">Avg Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 sm:px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>

                <Button
                  variant={showFeaturedOnly ? "default" : "outline"}
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className="h-12 px-4 sm:px-6 text-sm sm:text-base"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Featured Only</span>
                  <span className="sm:hidden">Featured</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Properties Section - Mobile Optimized */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Properties - MOBILE TEST
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover exceptional properties from our top-rated real estate
                companies
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
              {companies
                .filter((company) => company.properties.length > 0)
                .slice(0, 3)
                .map((company) =>
                  company.properties
                    .slice(0, 1)
                    .map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))
                )}
            </div>
          </div>

          {/* Companies Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Top Real Estate Companies - MOBILE TEST
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Partner with industry-leading professionals for your real estate
              needs
            </p>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 animate-fade-in">
            {filteredCompanies.map((company, index) => (
              <div
                key={company.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CompanyCard company={company} />
              </div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Building2 className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No companies found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
