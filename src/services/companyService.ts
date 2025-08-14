import { prisma } from "@/lib/db";
import { RealEstateCompany, Property } from "@/types/realEstate";
import {
  Company,
  Property as PrismaProperty,
  PropertyImage,
} from "@prisma/client";

// Type for database company with included relations
type DbCompanyWithRelations = Company & {
  properties: (PrismaProperty & {
    images: PropertyImage[];
  })[];
};

// Type for database property with included relations
type DbPropertyWithRelations = PrismaProperty & {
  images: PropertyImage[];
  company?: Company;
};

// Helper function to convert database company to our interface
function convertDbCompanyToInterface(
  dbCompany: DbCompanyWithRelations
): RealEstateCompany {
  return {
    id: dbCompany.id,
    name: dbCompany.name,
    description: dbCompany.description,
    logo: dbCompany.logo,
    coverImage: dbCompany.coverImage,
    location: dbCompany.location,
    established: dbCompany.established,
    propertiesCount: dbCompany.propertiesCount,
    rating: dbCompany.rating,
    specialties: JSON.parse(dbCompany.specialties || "[]"),
    featured: dbCompany.featured,
    contactInfo: {
      phone: dbCompany.contactPhone,
      email: dbCompany.contactEmail,
      website: dbCompany.contactWebsite,
      address: dbCompany.contactAddress,
    },
    stats: {
      totalSales: dbCompany.totalSales,
      averagePrice: dbCompany.averagePrice,
      clientSatisfaction: dbCompany.clientSatisfaction,
    },
    properties: dbCompany.properties?.map(convertDbPropertyToInterface) || [],
  };
}

// Helper function to convert database property to our interface
function convertDbPropertyToInterface(
  dbProperty: DbPropertyWithRelations
): Property {
  return {
    id: dbProperty.id,
    title: dbProperty.title,
    price: dbProperty.price,
    location: dbProperty.location,
    type: dbProperty.type.toLowerCase().replace("_", "-") as Property["type"],
    bedrooms: dbProperty.bedrooms ?? undefined,
    bathrooms: dbProperty.bathrooms ?? undefined,
    area: dbProperty.area,
    description: dbProperty.description,
    features: JSON.parse(dbProperty.features || "[]"),
    status: dbProperty.status
      .toLowerCase()
      .replace("_", "-") as Property["status"],
    images:
      dbProperty.images?.map((img: PropertyImage) => ({
        url: img.url,
        description: img.description || "",
      })) || [],
    company: dbProperty.company
      ? {
          id: dbProperty.company.id,
          name: dbProperty.company.name,
          logo: dbProperty.company.logo,
          contactInfo: {
            phone: dbProperty.company.contactPhone,
            email: dbProperty.company.contactEmail,
            website: dbProperty.company.contactWebsite,
            address: dbProperty.company.contactAddress,
          },
        }
      : undefined,
  };
}

// Get all companies
export async function getAllCompanies(): Promise<RealEstateCompany[]> {
  try {
    const companies = await prisma.company.findMany({
      include: {
        properties: {
          include: {
            images: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    });

    return companies.map(convertDbCompanyToInterface);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
}

// Get company by ID
export async function getCompanyById(
  id: string
): Promise<RealEstateCompany | null> {
  try {
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        properties: {
          include: {
            images: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    });

    if (!company) return null;

    return convertDbCompanyToInterface(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    return null;
  }
}

// Get property by ID
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
        company: true,
      },
    });

    if (!property) return null;

    return convertDbPropertyToInterface(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

// Get all properties
export async function getAllProperties(): Promise<Property[]> {
  try {
    const properties = await prisma.property.findMany({
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return properties.map(convertDbPropertyToInterface);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

// Get featured properties
export async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const properties = await prisma.property.findMany({
      where: {
        company: {
          featured: true,
        },
      },
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
      take: 6, // Limit to 6 featured properties
    });

    return properties.map(convertDbPropertyToInterface);
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }
}
