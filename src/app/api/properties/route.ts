import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
        company: true,
      },
    });
    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      area,
      description,
      features,
      status,
      companyId,
      images,
    } = body;

    // Validate required fields
    if (
      !title ||
      !price ||
      !location ||
      !type ||
      !area ||
      !description ||
      !companyId
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, price, location, type, area, description, companyId",
        },
        { status: 400 }
      );
    }

    // Validate company exists
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Convert type and status to uppercase for enum compatibility
    const propertyType = type.toUpperCase().replace("-", "_");
    const propertyStatus = status.toUpperCase().replace("-", "_");

    // Create property with images
    const property = await prisma.property.create({
      data: {
        title,
        price: parseInt(price),
        location,
        type: propertyType,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        area: parseInt(area),
        description,
        features: JSON.stringify(features || []),
        status: propertyStatus,
        companyId,
        images: {
          create:
            images?.map((image: any, index: number) => ({
              url: image.url,
              description: image.description || "",
              order: index,
              ipfsHash: image.hash || null,
            })) || [],
        },
      },
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
        company: true,
      },
    });

    // Update company properties count
    await prisma.company.update({
      where: { id: companyId },
      data: {
        propertiesCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}
