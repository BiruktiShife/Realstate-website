import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Home, MapPin, Star } from 'lucide-react';
import { getAllCompanies } from '@/services/companyService';

export default async function DataPage() {
  const companies = await getAllCompanies();

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Database Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View all companies and properties in the database
          </p>
        </div>

        {/* Companies List */}
        <div className="space-y-6">
          {companies.map((company) => (
            <Card key={company.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {company.name}
                        {company.featured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {company.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {company.rating}
                        </div>
                        <div>Est. {company.established}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {company.propertiesCount}
                    </div>
                    <div className="text-sm text-gray-500">Properties</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{company.description}</p>
                
                {/* Company Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{company.stats.totalSales}</div>
                    <div className="text-sm text-gray-500">Total Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{company.stats.averagePrice}</div>
                    <div className="text-sm text-gray-500">Avg Price</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">{company.stats.clientSatisfaction}%</div>
                    <div className="text-sm text-gray-500">Satisfaction</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Properties */}
                {company.properties.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Properties ({company.properties.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {company.properties.map((property) => (
                        <div key={property.id} className="border rounded-lg p-4">
                          <h5 className="font-medium">{property.title}</h5>
                          <p className="text-sm text-gray-500 mb-2">{property.location}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-blue-600">
                              ${property.price.toLocaleString()}
                            </span>
                            <Badge variant="outline" className="capitalize">
                              {property.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500 mt-2">
                            {property.bedrooms && `${property.bedrooms} bed`}
                            {property.bathrooms && ` • ${property.bathrooms} bath`}
                            {` • ${property.area} sqft`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {companies.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-500">Start by adding your first company to the database.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
