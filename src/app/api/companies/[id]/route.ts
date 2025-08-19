import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET single company
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const company = await prisma.company.findUnique({
      where: {
        id: params.id,
      },
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

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { error: "Failed to fetch company" },
      { status: 500 }
    );
  }
}

// UPDATE company
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
      name,
      description,
      logo,
      logoIpfsHash,
      coverImage,
      coverImageIpfsHash,
      location,
      established,
      rating,
      specialties,
      featured,
      contactPhone,
      contactEmail,
      contactWebsite,
      contactAddress,
      totalSales,
      averagePrice,
      clientSatisfaction,
    } = body;

    // Validate required fields
    if (!name || !description || !location || !established) {
      return NextResponse.json(
        {
          error: "Missing required fields: name, description, location, established",
        },
        { status: 400 }
      );
    }

    const updatedCompany = await prisma.company.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        logo,
        logoIpfsHash,
        coverImage,
        coverImageIpfsHash,
        location,
        established: new Date(established),
        rating: rating ? parseFloat(rating) : null,
        specialties: Array.isArray(specialties) ? specialties : [],
        featured: Boolean(featured),
        contactPhone,
        contactEmail,
        contactWebsite,
        contactAddress,
        totalSales: totalSales ? parseInt(totalSales) : 0,
        averagePrice: averagePrice ? parseFloat(averagePrice) : 0,
        clientSatisfaction: clientSatisfaction ? parseInt(clientSatisfaction) : 95,
      },
    });

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { error: "Failed to update company" },
      { status: 500 }
    );
  }
}

// DELETE company
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

    // Check if company exists
    const company = await prisma.company.findUnique({
      where: {
        id: params.id,
      },
      include: {
        properties: true,
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    // Delete all properties and their images first
    for (const property of company.properties) {
      await prisma.propertyImage.deleteMany({
        where: {
          propertyId: property.id,
        },
      });
    }

    await prisma.property.deleteMany({
      where: {
        companyId: params.id,
      },
    });

    // Delete the company
    await prisma.company.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting company:", error);
    return NextResponse.json(
      { error: "Failed to delete company" },
      { status: 500 }
    );
  }
}
