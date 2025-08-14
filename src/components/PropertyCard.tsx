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
    <div className="group animate-fade-in-up hover:-translate-y-1 transition-all duration-500">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800">
        {/* Image Section */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
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
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge
              className={`${getStatusColor(
                property.status
              )} text-white border-0 capitalize`}
            >
              {property.status.replace("-", " ")}
            </Badge>
          </div>

          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-200 ${
                isLiked ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </button>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <CardContent className="p-4 sm:p-6">
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(property.price)}
            </h3>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>

          {/* Title */}
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {property.title}
          </h4>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>

          {/* Property Details */}
          <div className="flex items-center gap-4 mb-4 text-gray-600 dark:text-gray-300">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span className="text-sm">{property.bedrooms} bed</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span className="text-sm">{property.bathrooms} bath</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span className="text-sm">
                {property.area.toLocaleString()} ka mtr
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {property.features.slice(0, 3).map((feature, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              >
                {feature}
              </Badge>
            ))}
            {property.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{property.features.length - 3} more
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link href={`/property/${property.id}`} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                View Details
              </Button>
            </Link>
            <Button
              variant="outline"
              className={`flex-1 text-xs sm:text-sm transition-all duration-200 ${
                showContactNumber
                  ? "bg-green-50 border-green-300 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300"
                  : ""
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
