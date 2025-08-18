"use client";

import { Property } from "@/types/realEstate";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin, Heart, Phone } from "lucide-react";

import { useState } from "react";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactNumber, setShowContactNumber] = useState(false);

  // Helper function to get image URL
  const getImageUrl = (
    image: string | { url: string; description: string }
  ) => {
    return typeof image === "string" ? image : image.url;
  };

  // Sample contact number - in a real app, this would come from the property data
  const contactNumber = "+251933031633";

  const handleContactClick = () => {
    if (showContactNumber) {
      // If number is showing, make a call
      window.open(`tel:${contactNumber}`, "_self");
    } else {
      // If not showing, toggle to show the number
      setShowContactNumber(true);
    }
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
    <div className="group animate-fade-in-up hover:-translate-y-1 transition-all duration-500 relative">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800">
        {/* Image Section */}
        <div className="relative h-36 sm:h-64 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url(${getImageUrl(
                property.images[currentImageIndex]
              )})`,
            }}
          />

          {/* Image Navigation Dots */}
          {property.images.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
            <Badge
              className={`${getStatusColor(
                property.status
              )} text-white border-0 capitalize text-xs sm:text-sm px-2 py-1 font-medium`}
            >
              {property.status.replace("-", " ")}
            </Badge>
          </div>

          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
                isLiked ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </button>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <CardContent className="p-2.5 sm:p-6 space-y-1.5 sm:space-y-4">
          {/* Price & Location */}
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(property.price)}
            </h3>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-sm sm:text-sm font-medium">
                {property.location}
              </span>
            </div>
          </div>

          {/* Title */}
          <h4 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white line-clamp-1 sm:line-clamp-none leading-tight">
            {property.title}
          </h4>

          {/* Description - Hidden on mobile for cleaner look */}
          <p className="hidden sm:block text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>

          {/* Property Details */}
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-1.5 text-gray-600 dark:text-gray-300">
            {property.bedrooms && (
              <div className="flex flex-col items-center gap-1">
                <Bed className="w-4 h-4 sm:w-4 sm:h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-semibold">
                  {property.bedrooms} bed
                </span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex flex-col items-center gap-1">
                <Bath className="w-4 h-4 sm:w-4 sm:h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-semibold">
                  {property.bathrooms} bath
                </span>
              </div>
            )}
            <div className="flex flex-col items-center gap-1">
              <Square className="w-4 h-4 sm:w-4 sm:h-4 text-blue-600" />
              <span className="text-xs sm:text-sm font-semibold">
                {property.area.toLocaleString()} sqft
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {property.features.slice(0, 3).map((feature, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2.5 py-1 font-medium border border-blue-200 dark:border-blue-700"
              >
                {feature}
              </Badge>
            ))}
            {property.features.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs px-2.5 py-1 font-medium border-dashed"
              >
                +{property.features.length - 3} more
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link href={`/property/${property.id}`} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm py-1.5 sm:py-2 h-7 sm:h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                <span className="hidden sm:inline">View Details</span>
                <span className="sm:hidden">View</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              className={`flex-1 text-xs sm:text-sm py-1.5 sm:py-2 h-7 sm:h-auto font-semibold border-2 transition-all duration-200 ${
                showContactNumber
                  ? "bg-green-50 border-green-300 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300"
                  : "border-gray-300 hover:border-blue-500 hover:text-blue-600"
              }`}
              onClick={handleContactClick}
              title={
                showContactNumber ? "Click to call" : "Show contact number"
              }
            >
              {showContactNumber ? (
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="truncate">{contactNumber}</span>
                </div>
              ) : (
                "Contact Agent"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
