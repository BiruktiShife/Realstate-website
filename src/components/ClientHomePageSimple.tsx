"use client";

import React from "react";
import { RealEstateCompany } from "@/types/realEstate";

interface ClientHomePageProps {
  companies: RealEstateCompany[];
}

export function ClientHomePage({ companies }: ClientHomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Real Estate Companies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div key={company.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
              <p className="text-gray-600 mb-4">{company.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {company.location}
                </span>
                <span className="text-sm font-medium">
                  Rating: {company.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
