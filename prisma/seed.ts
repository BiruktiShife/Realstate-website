const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.company.deleteMany();

  // Create companies with properties
  const companies = [
    {
      name: "Premium Properties",
      description:
        "Luxury real estate specialists with over 20 years of experience in high-end residential and commercial properties.",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      coverImage:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop",
      location: "New York, NY",
      established: 2003,
      propertiesCount: 2,
      rating: 4.8,
      specialties: JSON.stringify([
        "Luxury Homes",
        "Commercial",
        "Investment Properties",
      ]),
      featured: true,
      contactPhone: "+1 (555) 123-4567",
      contactEmail: "info@premiumproperties.com",
      contactWebsite: "www.premiumproperties.com",
      contactAddress: "123 Fifth Avenue, New York, NY 10001",
      totalSales: 1250,
      averagePrice: "$2.5M",
      clientSatisfaction: 98,
      properties: {
        create: [
          {
            title: "Modern Luxury Penthouse",
            price: 4500000,
            location: "Manhattan, NY",
            type: "APARTMENT",
            bedrooms: 4,
            bathrooms: 3,
            area: 3200,
            description: "Stunning penthouse with panoramic city views",
            features: JSON.stringify([
              "City View",
              "Private Terrace",
              "Concierge",
            ]),
            status: "FOR_SALE",
            images: {
              create: [
                {
                  url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
                  description:
                    "Stunning living room with floor-to-ceiling windows and city views",
                  order: 0,
                },
                {
                  url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
                  description:
                    "Modern kitchen with premium appliances and marble countertops",
                  order: 1,
                },
                {
                  url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
                  description:
                    "Master bedroom with panoramic city skyline views",
                  order: 2,
                },
              ],
            },
          },
          {
            title: "Executive Corner Office",
            price: 2800000,
            location: "Midtown Manhattan, NY",
            type: "COMMERCIAL",
            area: 2500,
            description:
              "Premium corner office space with floor-to-ceiling windows and city views",
            features: JSON.stringify([
              "Corner Unit",
              "City Views",
              "Modern Finishes",
              "Conference Room",
            ]),
            status: "FOR_SALE",
            images: {
              create: [
                {
                  url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
                  description: "Professional office space with modern design",
                  order: 0,
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: "Urban Living Realty",
      description:
        "Modern urban properties for the contemporary lifestyle. Specializing in downtown apartments and condos.",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop&crop=center",
      coverImage:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
      location: "Los Angeles, CA",
      established: 2010,
      propertiesCount: 2,
      rating: 4.6,
      specialties: JSON.stringify([
        "Urban Apartments",
        "Condos",
        "First-Time Buyers",
      ]),
      featured: true,
      contactPhone: "+1 (555) 987-6543",
      contactEmail: "contact@urbanliving.com",
      contactWebsite: "www.urbanlivingrealty.com",
      contactAddress: "456 Sunset Boulevard, Los Angeles, CA 90028",
      totalSales: 890,
      averagePrice: "$850K",
      clientSatisfaction: 95,
      properties: {
        create: [
          {
            title: "Modern Downtown Loft",
            price: 850000,
            location: "Downtown LA, CA",
            type: "APARTMENT",
            bedrooms: 2,
            bathrooms: 2,
            area: 1800,
            description: "Stylish loft in the heart of downtown",
            features: JSON.stringify([
              "City View",
              "Modern Kitchen",
              "Gym Access",
            ]),
            status: "FOR_SALE",
            images: {
              create: [
                {
                  url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
                  description:
                    "Open-concept living space with industrial design elements",
                  order: 0,
                },
              ],
            },
          },
        ],
      },
    },
  ];

  for (const companyData of companies) {
    const company = await prisma.company.create({
      data: companyData,
      include: {
        properties: {
          include: {
            images: true,
          },
        },
      },
    });
    console.log(
      `✅ Created company: ${company.name} with ${company.properties.length} properties`
    );
  }

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
