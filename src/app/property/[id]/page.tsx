import { notFound } from "next/navigation";
import { getPropertyById } from "@/services/companyService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Bed,
  Bath,
  Square,
  MapPin,
  Heart,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { PropertyImageGallery } from "@/components/PropertyImageGallery";

interface PropertyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { id } = await params;

  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  // Get the company information from the property
  const company = property.company;

  // If no company is associated with the property, show not found
  if (!company) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </Link>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Image Gallery */}
            <PropertyImageGallery
              images={property.images}
              title={property.title}
            />

            {/* Property Info */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        {property.title}
                      </h1>
                      <Badge
                        className={`${getStatusColor(
                          property.status
                        )} text-white border-0 capitalize`}
                      >
                        {property.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg">{property.location}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      ETB
                      {Math.round(
                        property.price / property.area
                      ).toLocaleString()}
                      /ka mtr
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Property Details */}
                <div className="grid grid-cols-3 gap-6 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {property.bedrooms && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                        <Bed className="w-5 h-5" />
                        <span className="text-2xl font-bold">
                          {property.bedrooms}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Bedrooms
                      </p>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 mb-1">
                        <Bath className="w-5 h-5" />
                        <span className="text-2xl font-bold">
                          {property.bathrooms}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Bathrooms
                      </p>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                      <Square className="w-5 h-5" />
                      <span className="text-2xl font-bold">
                        {property.area.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      ka mtr
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Features & Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {company.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  Listed by {company.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{company.contactInfo.phone}</p>
                    <p className="text-sm text-gray-500">Phone</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">{company.contactInfo.email}</p>
                    <p className="text-sm text-gray-500">Email</p>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Agent
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Property Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Property Type
                  </span>
                  <span className="font-medium capitalize">
                    {property.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Status
                  </span>
                  <span className="font-medium capitalize">
                    {property.status.replace("-", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Price per Sq Ft
                  </span>
                  <span className="font-medium">
                    ETB
                    {Math.round(
                      property.price / property.area
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Total Area
                  </span>
                  <span className="font-medium">
                    {property.area.toLocaleString()} ka mtr
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
