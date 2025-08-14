export interface RealEstateCompany {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  location: string;
  established: number;
  propertiesCount: number;
  rating: number;
  specialties: string[];
  contactInfo: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  stats: {
    totalSales: number;
    averagePrice: string;
    clientSatisfaction: number;
  };
  featured: boolean;
  properties: Property[];
}

export interface PropertyImage {
  url: string;
  description: string;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: "apartment" | "house" | "villa" | "commercial" | "land";
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  images: (string | PropertyImage)[];
  description: string;
  features: string[];
  status: "for-sale" | "for-rent" | "sold" | "rented";
  company?: {
    id: string;
    name: string;
    logo: string;
    contactInfo: {
      phone: string;
      email: string;
      website: string;
      address: string;
    };
  };
}

export interface CompanyFilters {
  location?: string;
  specialty?: string;
  minRating?: number;
  featured?: boolean;
}
