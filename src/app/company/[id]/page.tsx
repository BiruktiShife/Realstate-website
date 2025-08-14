import { notFound } from "next/navigation";
import { getCompanyById } from "@/services/companyService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CompanyPropertyShowcase } from "@/components/CompanyPropertyShowcase";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Building,
  TrendingUp,
  Users,
  Calendar,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface CompanyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CompanyDetailPage({
  params,
}: CompanyDetailPageProps) {
  const { id } = await params;
  const company = await getCompanyById(id);

  if (!company) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Companies
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div
          className="h-64 md:h-80 bg-gradient-to-r from-blue-600 to-purple-600"
          style={{
            backgroundImage: `url(${company.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-6 -mt-16 relative z-10">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={company.logo} alt={company.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-3xl">
                {company.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {company.name}
                    </h1>
                    {company.featured && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        ⭐ Featured
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">
                        {company.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-5 h-5" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-5 h-5" />
                      <span>Est. {company.established}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {company.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Now
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={`mailto:${company.contactInfo.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Company Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {company.propertiesCount}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Properties
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {company.stats.totalSales}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Total Sales
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {company.stats.averagePrice}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Avg Price
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                      {company.stats.clientSatisfaction}%
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Satisfaction
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Specialties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {company.specialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm py-2 px-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Property Showcase */}
            <CompanyPropertyShowcase
              properties={company.properties}
              companyName={company.name}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Contact Information
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

                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <div>
                    <a
                      href={`https://${company.contactInfo.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {company.contactInfo.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <p className="text-sm text-gray-500">Website</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-medium">{company.contactInfo.address}</p>
                    <p className="text-sm text-gray-500">Address</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
