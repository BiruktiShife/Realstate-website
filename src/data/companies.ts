import { RealEstateCompany } from "@/types/realEstate";

export const realEstateCompanies: RealEstateCompany[] = [
  {
    id: "1",
    name: "Premium Properties",
    description:
      "Luxury real estate specialists with over 20 years of experience in high-end residential and commercial properties.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
    coverImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop",
    location: "New York, NY",
    established: 2003,
    propertiesCount: 450,
    rating: 4.8,
    specialties: ["Luxury Homes", "Commercial", "Investment Properties"],
    contactInfo: {
      phone: "+1 (555) 123-4567",
      email: "info@premiumproperties.com",
      website: "www.premiumproperties.com",
      address: "123 Fifth Avenue, New York, NY 10001",
    },
    stats: {
      totalSales: 1250,
      averagePrice: "$2.5M",
      clientSatisfaction: 98,
    },
    featured: true,
    properties: [
      {
        id: "p1",
        title: "Modern Luxury Penthouse",
        price: 4500000,
        location: "Manhattan, NY",
        type: "apartment",
        bedrooms: 4,
        bathrooms: 3,
        area: 3200,
        images: [
          {
            url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
            description:
              "Stunning living room with floor-to-ceiling windows and city views",
          },
          {
            url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
            description:
              "Modern kitchen with premium appliances and marble countertops",
          },
          {
            url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            description: "Master bedroom with panoramic city skyline views",
          },
          {
            url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
            description:
              "Luxurious bathroom with spa-like amenities and marble finishes",
          },
          {
            url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
            description:
              "Private terrace with outdoor seating and breathtaking views",
          },
          {
            url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
            description: "Elegant dining area perfect for entertaining guests",
          },
        ],
        description: "Stunning penthouse with panoramic city views",
        features: ["City View", "Private Terrace", "Concierge"],
        status: "for-sale",
      },
      {
        id: "p1b",
        title: "Executive Corner Office",
        price: 2800000,
        location: "Midtown Manhattan, NY",
        type: "commercial",
        area: 2500,
        images: [
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&h=600&fit=crop",
        ],
        description:
          "Premium corner office space with floor-to-ceiling windows and city views",
        features: [
          "Corner Unit",
          "City Views",
          "Modern Finishes",
          "Conference Room",
        ],
        status: "for-sale",
      },
    ],
  },
  {
    id: "2",
    name: "Urban Living Realty",
    description:
      "Modern urban properties for the contemporary lifestyle. Specializing in downtown apartments and condos.",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop&crop=center",
    coverImage:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    location: "Los Angeles, CA",
    established: 2010,
    propertiesCount: 320,
    rating: 4.6,
    specialties: ["Urban Apartments", "Condos", "First-Time Buyers"],
    contactInfo: {
      phone: "+1 (555) 987-6543",
      email: "contact@urbanliving.com",
      website: "www.urbanlivingrealty.com",
      address: "456 Sunset Boulevard, Los Angeles, CA 90028",
    },
    stats: {
      totalSales: 890,
      averagePrice: "$850K",
      clientSatisfaction: 95,
    },
    featured: true,
    properties: [
      {
        id: "p2",
        title: "Modern Downtown Loft",
        price: 850000,
        location: "Downtown LA, CA",
        type: "apartment",
        bedrooms: 2,
        bathrooms: 2,
        area: 1800,
        images: [
          {
            url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
            description:
              "Open-concept living space with industrial design elements",
          },
          {
            url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
            description:
              "Modern kitchen with exposed brick and stainless steel appliances",
          },
          {
            url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
            description: "Spacious bedroom with large windows and city views",
          },
          {
            url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            description:
              "Contemporary bathroom with modern fixtures and finishes",
          },
          {
            url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
            description: "Elegant dining area with designer lighting",
          },
        ],
        description: "Stylish loft in the heart of downtown",
        features: ["City View", "Modern Kitchen", "Gym Access"],
        status: "for-sale",
      },
      {
        id: "p2b",
        title: "Luxury High-Rise Condo",
        price: 1200000,
        location: "Beverly Hills, CA",
        type: "apartment",
        bedrooms: 3,
        bathrooms: 2,
        area: 2200,
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        ],
        description:
          "Elegant high-rise condominium with premium amenities and stunning views",
        features: ["High Floor", "Concierge", "Gym", "Pool", "Valet Parking"],
        status: "for-sale",
      },
    ],
  },
  {
    id: "3",
    name: "Coastal Estates",
    description:
      "Beachfront and coastal properties with breathtaking ocean views. Your gateway to waterfront living.",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    location: "Miami, FL",
    established: 1998,
    propertiesCount: 180,
    rating: 4.9,
    specialties: ["Beachfront", "Luxury Villas", "Vacation Homes"],
    contactInfo: {
      phone: "+1 (555) 456-7890",
      email: "info@coastalestates.com",
      website: "www.coastalestates.com",
      address: "789 Ocean Drive, Miami, FL 33139",
    },
    stats: {
      totalSales: 650,
      averagePrice: "$3.2M",
      clientSatisfaction: 99,
    },
    featured: true,
    properties: [
      {
        id: "p3",
        title: "Oceanfront Villa",
        price: 3200000,
        location: "Miami Beach, FL",
        type: "villa",
        bedrooms: 5,
        bathrooms: 4,
        area: 4500,
        images: [
          {
            url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            description:
              "Stunning oceanfront exterior with private beach access",
          },
          {
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
            description: "Luxurious living room with panoramic ocean views",
          },
          {
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
            description:
              "Master suite with direct ocean access and private balcony",
          },
          {
            url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
            description:
              "Gourmet kitchen with ocean views and premium appliances",
          },
          {
            url: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=800&h=600&fit=crop",
            description: "Private infinity pool overlooking the ocean",
          },
          {
            url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
            description: "Spa bathroom with ocean views and luxury amenities",
          },
          {
            url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
            description: "Private beach area with exclusive access",
          },
        ],
        description: "Luxury oceanfront villa with private beach access",
        features: ["Ocean View", "Private Beach", "Pool", "Spa"],
        status: "for-sale",
      },
      {
        id: "p3b",
        title: "Beachfront Penthouse",
        price: 4800000,
        location: "South Beach, FL",
        type: "apartment",
        bedrooms: 4,
        bathrooms: 3,
        area: 3800,
        images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        ],
        description:
          "Stunning penthouse with panoramic ocean views and luxury finishes",
        features: [
          "Ocean View",
          "Private Elevator",
          "Rooftop Terrace",
          "Wine Cellar",
        ],
        status: "for-sale",
      },
    ],
  },
  {
    id: "4",
    name: "Family Homes Plus",
    description:
      "Dedicated to helping families find their perfect home. Suburban specialists with a personal touch.",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop&crop=center",
    coverImage:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=400&fit=crop",
    location: "Austin, TX",
    established: 2015,
    propertiesCount: 280,
    rating: 4.7,
    specialties: ["Family Homes", "Suburban Properties", "School Districts"],
    contactInfo: {
      phone: "+1 (555) 321-0987",
      email: "hello@familyhomesplus.com",
      website: "www.familyhomesplus.com",
      address: "321 Main Street, Austin, TX 78701",
    },
    stats: {
      totalSales: 720,
      averagePrice: "$650K",
      clientSatisfaction: 96,
    },
    featured: false,
    properties: [
      {
        id: "p4",
        title: "Spacious Family Home",
        price: 650000,
        location: "Cedar Park, TX",
        type: "house",
        bedrooms: 4,
        bathrooms: 3,
        area: 2800,
        images: [
          {
            url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
            description:
              "Beautiful two-story family home with manicured front yard",
          },
          {
            url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
            description:
              "Spacious living room with fireplace and natural light",
          },
          {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
            description: "Modern kitchen with island and family dining area",
          },
          {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            description:
              "Master bedroom with walk-in closet and en-suite bathroom",
          },
          {
            url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
            description: "Backyard with deck and space for children to play",
          },
        ],
        description:
          "Perfect family home in excellent school district with modern amenities",
        features: [
          "Great Schools",
          "Large Backyard",
          "Garage",
          "Fireplace",
          "Updated Kitchen",
        ],
        status: "for-sale",
      },
      {
        id: "p4b",
        title: "Cozy Suburban Cottage",
        price: 485000,
        location: "Round Rock, TX",
        type: "house",
        bedrooms: 3,
        bathrooms: 2,
        area: 1950,
        images: [
          {
            url: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
            description: "Charming cottage-style home with covered front porch",
          },
          {
            url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            description:
              "Cozy living room with built-in shelving and natural light",
          },
          {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
            description:
              "Updated kitchen with granite countertops and breakfast nook",
          },
          {
            url: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&h=600&fit=crop",
            description: "Peaceful backyard garden with mature trees",
          },
        ],
        description:
          "Charming cottage perfect for first-time homebuyers or small families",
        features: [
          "Quiet Neighborhood",
          "Garden",
          "Updated Appliances",
          "Near Parks",
        ],
        status: "for-sale",
      },
    ],
  },
  {
    id: "5",
    name: "Metro Commercial Group",
    description:
      "Commercial real estate experts serving businesses of all sizes. From office spaces to retail locations.",
    logo: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=100&h=100&fit=crop&crop=center",
    coverImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop",
    location: "Chicago, IL",
    established: 2005,
    propertiesCount: 150,
    rating: 4.5,
    specialties: ["Commercial", "Office Spaces", "Retail"],
    contactInfo: {
      phone: "+1 (555) 654-3210",
      email: "business@metrocommercial.com",
      website: "www.metrocommercialgroup.com",
      address: "654 Michigan Avenue, Chicago, IL 60611",
    },
    stats: {
      totalSales: 420,
      averagePrice: "$1.8M",
      clientSatisfaction: 94,
    },
    featured: false,
    properties: [
      {
        id: "p5",
        title: "Modern Office Building",
        price: 1800000,
        location: "Downtown Chicago, IL",
        type: "commercial",
        area: 5500,
        images: [
          {
            url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
            description: "Impressive modern office building with glass facade",
          },
          {
            url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
            description:
              "Professional lobby with marble finishes and modern lighting",
          },
          {
            url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
            description: "Open office space with floor-to-ceiling windows",
          },
          {
            url: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&h=600&fit=crop",
            description: "Executive conference room with city views",
          },
          {
            url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
            description: "Modern break room and kitchen facilities",
          },
        ],
        description: "Prime commercial space in the heart of downtown Chicago",
        features: [
          "Prime Location",
          "Parking Garage",
          "Security System",
          "High-Speed Internet",
        ],
        status: "for-sale",
      },
      {
        id: "p5b",
        title: "Retail Space Downtown",
        price: 950000,
        location: "Michigan Avenue, Chicago, IL",
        type: "commercial",
        area: 2200,
        images: [
          {
            url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
            description:
              "Street-level retail space with large storefront windows",
          },
          {
            url: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
            description: "Open retail floor with modern lighting and fixtures",
          },
          {
            url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            description: "Back office space and storage area",
          },
        ],
        description:
          "High-traffic retail location on prestigious Michigan Avenue",
        features: [
          "High Foot Traffic",
          "Street Level",
          "Storage Space",
          "Display Windows",
        ],
        status: "for-sale",
      },
    ],
  },
  {
    id: "6",
    name: "Green Valley Homes",
    description:
      "Eco-friendly and sustainable housing solutions. Building the future of environmentally conscious living.",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=center",
    coverImage:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=400&fit=crop",
    location: "Portland, OR",
    established: 2012,
    propertiesCount: 95,
    rating: 4.8,
    specialties: ["Eco-Friendly", "Sustainable Homes", "Green Building"],
    contactInfo: {
      phone: "+1 (555) 789-0123",
      email: "info@greenvalleyhomes.com",
      website: "www.greenvalleyhomes.com",
      address: "987 Green Street, Portland, OR 97201",
    },
    stats: {
      totalSales: 310,
      averagePrice: "$750K",
      clientSatisfaction: 97,
    },
    featured: false,
    properties: [
      {
        id: "p6",
        title: "Eco-Friendly Modern Home",
        price: 750000,
        location: "Hawthorne, Portland, OR",
        type: "house",
        bedrooms: 3,
        bathrooms: 2,
        area: 2400,
        images: [
          {
            url: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
            description:
              "Sustainable modern home with solar panels and green landscaping",
          },
          {
            url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            description:
              "Open living space with reclaimed wood and energy-efficient windows",
          },
          {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
            description:
              "Modern kitchen with bamboo cabinets and energy-star appliances",
          },
          {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            description:
              "Master bedroom with natural materials and organic bedding",
          },
          {
            url: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&h=600&fit=crop",
            description: "Organic garden with rainwater collection system",
          },
        ],
        description:
          "LEED-certified home with sustainable materials and energy-efficient design",
        features: [
          "Solar Panels",
          "Rainwater Collection",
          "Organic Garden",
          "Energy Efficient",
          "LEED Certified",
        ],
        status: "for-sale",
      },
      {
        id: "p6b",
        title: "Net-Zero Energy House",
        price: 825000,
        location: "Alberta District, Portland, OR",
        type: "house",
        bedrooms: 4,
        bathrooms: 3,
        area: 2650,
        images: [
          {
            url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
            description:
              "Contemporary net-zero home with modern sustainable design",
          },
          {
            url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
            description:
              "Living room with triple-pane windows and radiant floor heating",
          },
          {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
            description: "Gourmet kitchen with recycled glass countertops",
          },
          {
            url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
            description: "Backyard with native plants and permeable paving",
          },
        ],
        description:
          "Innovative net-zero energy home that produces as much energy as it consumes",
        features: [
          "Net-Zero Energy",
          "Geothermal Heating",
          "Smart Home Tech",
          "Native Landscaping",
        ],
        status: "for-sale",
      },
    ],
  },
];
