"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ImageUpload";
import { Home, Plus, X, Loader2 } from "lucide-react";

interface Company {
  id: string;
  name: string;
}

interface PropertyImage {
  url: string;
  description: string;
}

interface PropertyFormProps {
  property?: any;
  isEdit?: boolean;
}

export function PropertyForm({ property, isEdit = false }: PropertyFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [features, setFeatures] = useState<string[]>(property?.features || []);
  const [newFeature, setNewFeature] = useState("");
  const [images, setImages] = useState<PropertyImage[]>(
    property?.images?.map((img: any) => ({
      url: img.url,
      description: img.description || "",
    })) || []
  );

  const [formData, setFormData] = useState({
    title: property?.title || "",
    price: property?.price?.toString() || "",
    location: property?.location || "",
    type: property?.type || "apartment",
    bedrooms: property?.bedrooms?.toString() || "",
    bathrooms: property?.bathrooms?.toString() || "",
    area: property?.area?.toString() || "",
    description: property?.description || "",
    status: property?.status || "for-sale",
    companyId: property?.companyId || "",
  });

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch("/api/companies");
      if (response.ok) {
        const companiesData = await response.json();
        setCompanies(companiesData);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter((f) => f !== feature));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const url = isEdit ? `/api/properties/${property.id}` : "/api/properties";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          features,
          images,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Failed to ${isEdit ? "update" : "create"} property`
        );
      }

      setSuccess(true);

      // Only reset form if creating new property
      if (!isEdit) {
        setFormData({
          title: "",
          price: "",
          location: "",
          type: "apartment",
          bedrooms: "",
          bathrooms: "",
          area: "",
          description: "",
          status: "for-sale",
          companyId: "",
        });
        setFeatures([]);
        setImages([]);
      }
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
          <Home className="h-6 w-6" />
          {isEdit ? "Edit Property" : "Add New Property"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800">
              Property {isEdit ? "updated" : "created"} successfully!
            </p>
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
                Property Title *
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Modern Downtown Apartment"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Company *
              </label>
              <select
                name="companyId"
                value={formData.companyId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price *</label>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
                placeholder="850000"
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
                placeholder="Downtown LA, CA"
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bedrooms</label>
              <Input
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleInputChange}
                placeholder="2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Bathrooms
              </label>
              <Input
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleInputChange}
                placeholder="2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Area (sqft) *
              </label>
              <Input
                name="area"
                type="number"
                value={formData.area}
                onChange={handleInputChange}
                required
                placeholder="1800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
            </select>
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
              placeholder="Property description"
            />
          </div>

          {/* Features Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Features</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature (e.g., Swimming Pool)"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addFeature())
                  }
                />
                <Button type="button" onClick={addFeature} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {feature}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeFeature(feature)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Images Section */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Property Images
            </label>
            <ImageUpload
              onImagesUploaded={(uploadedImages) => {
                setImages(
                  uploadedImages.map((img) => ({
                    url: img.url,
                    description: img.description || "",
                  }))
                );
              }}
              propertyId={formData.title ? `property-${Date.now()}` : undefined}
              companyId={formData.companyId}
              maxFiles={10}
              existingImages={images.map((img) => ({
                url: img.url,
                hash: "", // Will be populated after upload
                description: img.description,
              }))}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEdit ? "Updating" : "Creating"} Property...
              </>
            ) : isEdit ? (
              "Update Property"
            ) : (
              "Create Property"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
