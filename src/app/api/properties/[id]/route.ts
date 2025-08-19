import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET single property
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id: params.id,
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

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}

// UPDATE property
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Verify admin authentication
    const isAuthenticated = await verifyAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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
    if (!title || !price || !location || !type || !area || !companyId) {
      return NextResponse.json(
        {
          error: "Missing required fields: title, price, location, type, area, companyId",
        },
        { status: 400 }
      );
    }

    // Update property
    const updatedProperty = await prisma.property.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        price: parseFloat(price),
        location,
        type,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        area: parseInt(area),
        description,
        features: Array.isArray(features) ? features : [],
        status,
        companyId,
      },
    });

    // Handle image updates if provided
    if (images && Array.isArray(images)) {
      // Delete existing images
      await prisma.propertyImage.deleteMany({
        where: {
          propertyId: params.id,
        },
      });

      // Add new images
      if (images.length > 0) {
        await prisma.propertyImage.createMany({
          data: images.map((image: any, index: number) => ({
            url: image.url,
            description: image.description || "",
            order: index,
            ipfsHash: image.ipfsHash || "",
            propertyId: params.id,
          })),
        });
      }
    }

    // Fetch updated property with images
    const propertyWithImages = await prisma.property.findUnique({
      where: {
        id: params.id,
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

    return NextResponse.json(propertyWithImages);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 }
    );
  }
}

// DELETE property
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Verify admin authentication
    const isAuthenticated = await verifyAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Delete property images first
    await prisma.propertyImage.deleteMany({
      where: {
        propertyId: params.id,
      },
    });

    // Delete the property
    await prisma.property.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
