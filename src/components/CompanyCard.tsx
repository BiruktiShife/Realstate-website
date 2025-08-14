"use client";

import { RealEstateCompany } from "@/types/realEstate";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Building, Phone, Mail, TrendingUp } from "lucide-react";
import Link from "next/link";

interface CompanyCardProps {
  company: RealEstateCompany;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="group animate-fade-in-up hover:scale-105 hover:-translate-y-2 transition-all duration-500">
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
        {/* Glowing border for featured companies */}
        {company.featured && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-pink-500/20 rounded-lg blur-sm -z-10"></div>
        )}

        {/* Featured Badge */}
        {company.featured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white border-0 shadow-lg animate-pulse">
              ⭐ Featured
            </Badge>
          </div>
        )}

        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-700"
            style={{
              backgroundImage: `url(${company.coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500" />
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>

        <CardHeader className="relative -mt-6 sm:-mt-8 z-10 p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-white shadow-lg">
              <AvatarImage src={company.logo} alt={company.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm sm:text-lg">
                {company.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-200">
                {company.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {company.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{company.location}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
            {company.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400">
                <Building className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-bold text-base sm:text-lg">
                  {company.propertiesCount}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Properties
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="font-bold text-lg">
                  {company.stats.totalSales}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Sales</p>
            </div>
            <div className="text-center">
              <div className="text-purple-600 dark:text-purple-400">
                <span className="font-bold text-lg">
                  {company.stats.clientSatisfaction}%
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Satisfaction
              </p>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {company.specialties.slice(0, 3).map((specialty, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              >
                {specialty}
              </Badge>
            ))}
            {company.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{company.specialties.length - 3} more
              </Badge>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{company.contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span className="truncate">{company.contactInfo.email}</span>
            </div>
          </div>

          {/* Action Button */}
          <Link href={`/company/${company.id}`} className="block">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 group-hover:shadow-lg transition-all duration-200">
              View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
