"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ImageUpload";
import { Building2, Plus, X, Loader2 } from "lucide-react";

export function CompanyForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [newSpecialty, setNewSpecialty] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    logoIpfsHash: "",
    coverImage: "",
    coverImageIpfsHash: "",
    location: "",
    established: "",
    rating: "",
    featured: false,
    contactPhone: "",
    contactEmail: "",
    contactWebsite: "",
    contactAddress: "",
    totalSales: "",
    averagePrice: "",
    clientSatisfaction: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
      setSpecialties([...specialties, newSpecialty.trim()]);
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter((s) => s !== specialty));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          specialties,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create company");
      }

      setSuccess(true);
      // Reset form
      setFormData({
        name: "",
        description: "",
        logo: "",
        coverImage: "",
        location: "",
        established: "",
        rating: "",
        featured: false,
        contactPhone: "",
        contactEmail: "",
        contactWebsite: "",
        contactAddress: "",
        totalSales: "",
        averagePrice: "",
        clientSatisfaction: "",
      });
      setSpecialties([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          Add New Company
        </CardTitle>
      </CardHeader>
      <CardContent>
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800">Company created successfully!</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Company Name *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Location *
              </label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="City, State"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company description"
            />
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Company Logo
              </label>
              <ImageUpload
                onImagesUploaded={(uploadedImages) => {
                  if (uploadedImages.length > 0) {
                    setFormData((prev) => ({
                      ...prev,
                      logo: uploadedImages[0].url,
                      logoIpfsHash: uploadedImages[0].hash,
                    }));
                  }
                }}
                companyId={formData.name ? `company-${Date.now()}` : undefined}
                maxFiles={1}
                existingImages={
                  formData.logo
                    ? [
                        {
                          url: formData.logo,
                          hash: "",
                          description: "Company Logo",
                        },
                      ]
                    : []
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              <ImageUpload
                onImagesUploaded={(uploadedImages) => {
                  if (uploadedImages.length > 0) {
                    setFormData((prev) => ({
                      ...prev,
                      coverImage: uploadedImages[0].url,
                      coverImageIpfsHash: uploadedImages[0].hash,
                    }));
                  }
                }}
                companyId={formData.name ? `company-${Date.now()}` : undefined}
                maxFiles={1}
                existingImages={
                  formData.coverImage
                    ? [
                        {
                          url: formData.coverImage,
                          hash: "",
                          description: "Cover Image",
                        },
                      ]
                    : []
                }
              />
            </div>
          </div>

          {/* Company Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Established Year *
              </label>
              <Input
                name="established"
                type="number"
                value={formData.established}
                onChange={handleInputChange}
                required
                placeholder="2020"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <Input
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="4.5"
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="rounded"
              />
              <label className="text-sm font-medium">Featured Company</label>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="contact@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Website
                </label>
                <Input
                  name="contactWebsite"
                  value={formData.contactWebsite}
                  onChange={handleInputChange}
                  placeholder="www.company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                <Input
                  name="contactAddress"
                  value={formData.contactAddress}
                  onChange={handleInputChange}
                  placeholder="123 Main St, City, State"
                />
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Total Sales
                </label>
                <Input
                  name="totalSales"
                  type="number"
                  value={formData.totalSales}
                  onChange={handleInputChange}
                  placeholder="1250"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Average Price
                </label>
                <Input
                  name="averagePrice"
                  value={formData.averagePrice}
                  onChange={handleInputChange}
                  placeholder="$2.5M"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Client Satisfaction (%)
                </label>
                <Input
                  name="clientSatisfaction"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.clientSatisfaction}
                  onChange={handleInputChange}
                  placeholder="98"
                />
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Specialties
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="Add specialty"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSpecialty())
                }
              />
              <Button type="button" onClick={addSpecialty} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Badge
                  key={specialty}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {specialty}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeSpecialty(specialty)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Company...
              </>
            ) : (
              "Create Company"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
