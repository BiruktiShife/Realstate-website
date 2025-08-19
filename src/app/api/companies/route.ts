import { NextResponse } from "next/server";
import { getAllCompanies } from "@/services/companyService";
import { prisma } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const companies = await getAllCompanies();
    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const isAuthenticated = await verifyAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
          error:
            "Missing required fields: name, description, location, established",
        },
        { status: 400 }
      );
    }

    // Create company
    const company = await prisma.company.create({
      data: {
        name,
        description,
        logo: logo || "",
        logoIpfsHash: logoIpfsHash || null,
        coverImage: coverImage || "",
        coverImageIpfsHash: coverImageIpfsHash || null,
        location,
        established: parseInt(established),
        propertiesCount: 0,
        rating: parseFloat(rating) || 0,
        specialties: JSON.stringify(specialties || []),
        featured: Boolean(featured),
        contactPhone: contactPhone || "",
        contactEmail: contactEmail || "",
        contactWebsite: contactWebsite || "",
        contactAddress: contactAddress || "",
        totalSales: parseInt(totalSales) || 0,
        averagePrice: averagePrice || "$0",
        clientSatisfaction: parseInt(clientSatisfaction) || 0,
      },
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error("Error creating company:", error);
    return NextResponse.json(
      { error: "Failed to create company" },
      { status: 500 }
    );
  }
}
