"use client";

import { useState } from "react";
import { Property } from "@/types/realEstate";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Square,
  MapPin,
  Eye,
} from "lucide-react";

import Link from "next/link";
interface CompanyPropertyShowcaseProps {
  properties: Property[];
  companyName: string;
}

export function CompanyPropertyShowcase({
  properties,
  companyName,
}: CompanyPropertyShowcaseProps) {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!properties || properties.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-gray-500 dark:text-gray-400">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">
              No Properties Available
            </h3>
            <p>
              This company doesn&apos;t have any properties listed at the
              moment.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentProperty = properties[currentPropertyIndex];

  // Helper function to get image URL
  const getImageUrl = (
    image: string | { url: string; description: string }
  ) => {
    return typeof image === "string" ? image : image.url;
  };

  // Helper function to get image description
  const getImageDescription = (
    image: string | { url: string; description: string }
  ) => {
    return typeof image === "string" ? "" : image.description;
  };

  const nextProperty = () => {
    setCurrentPropertyIndex((prev) => (prev + 1) % properties.length);
    setCurrentImageIndex(0); // Reset image index when changing property
  };

  const previousProperty = () => {
    setCurrentPropertyIndex(
      (prev) => (prev - 1 + properties.length) % properties.length
    );
    setCurrentImageIndex(0); // Reset image index when changing property
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentProperty.images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + currentProperty.images.length) %
        currentProperty.images.length
    );
  };

  const goToProperty = (index: number) => {
    setCurrentPropertyIndex(index);
    setCurrentImageIndex(0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "for-sale":
        return "bg-green-500";
      case "for-rent":
        return "bg-blue-500";
      case "sold":
        return "bg-gray-500";
      case "rented":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Featured Properties
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Explore {properties.length}{" "}
            {properties.length === 1 ? "property" : "properties"} from{" "}
            {companyName}
          </p>
        </div>

        {properties.length > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={previousProperty}
              className="w-10 h-10 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400 px-3">
              {currentPropertyIndex + 1} of {properties.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={nextProperty}
              className="w-10 h-10 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Main Property Display */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative">
            <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden group">
              <img
                key={`${currentPropertyIndex}-${currentImageIndex}`}
                src={getImageUrl(currentProperty.images[currentImageIndex])}
                alt={`${currentProperty.title} - Image ${
                  currentImageIndex + 1
                }`}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Image Description Overlay */}
              {getImageDescription(
                currentProperty.images[currentImageIndex]
              ) && (
                <div
                  key={`desc-${currentPropertyIndex}-${currentImageIndex}`}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 animate-fade-in-up animation-delay-200"
                >
                  <p className="text-white text-sm font-medium leading-relaxed">
                    {getImageDescription(
                      currentProperty.images[currentImageIndex]
                    )}
                  </p>
                </div>
              )}

              {/* Image Navigation */}
              {currentProperty.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={previousImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <Badge
                  className={`${getStatusColor(
                    currentProperty.status
                  )} text-white border-0 capitalize`}
                >
                  {currentProperty.status.replace("-", " ")}
                </Badge>
              </div>

              {/* Image Counter */}
              {currentProperty.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {currentProperty.images.length}
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {currentProperty.images.length > 1 && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <div className="flex gap-2 overflow-x-auto">
                  {currentProperty.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`${currentProperty.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-blue-500/20" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Property Details */}
          <CardContent className="p-6 lg:p-8">
            <div className="space-y-6">
              {/* Price and Location */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(currentProperty.price)}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    $
                    {Math.round(
                      currentProperty.price / currentProperty.area
                    ).toLocaleString()}
                    /sqft
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {currentProperty.title}
                </h4>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>{currentProperty.location}</span>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {currentProperty.bedrooms && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
                      <Bed className="w-4 h-4" />
                      <span className="text-lg font-bold">
                        {currentProperty.bedrooms}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Bedrooms
                    </p>
                  </div>
                )}
                {currentProperty.bathrooms && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400 mb-1">
                      <Bath className="w-4 h-4" />
                      <span className="text-lg font-bold">
                        {currentProperty.bathrooms}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Bathrooms
                    </p>
                  </div>
                )}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400 mb-1">
                    <Square className="w-4 h-4" />
                    <span className="text-lg font-bold">
                      {currentProperty.area.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Sq Ft
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Description
                </h5>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {currentProperty.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Features
                </h5>
                <div className="flex flex-wrap gap-2">
                  {currentProperty.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Link
                  href={`/property/${currentProperty.id}`}
                  className="flex-1"
                >
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    View Full Details
                  </Button>
                </Link>
                <Button variant="outline" className="flex-1">
                  Contact Agent
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Property Navigation Dots */}
      {properties.length > 1 && (
        <div className="flex justify-center gap-2">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProperty(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentPropertyIndex
                  ? "bg-blue-600 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
