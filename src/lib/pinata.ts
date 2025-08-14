import pinataSDK from "@pinata/sdk";

// Initialize Pinata SDK
const pinata = new pinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY,
});

export interface PinataUploadResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate?: boolean;
}

export interface UploadImageResult {
  success: boolean;
  url?: string;
  hash?: string;
  error?: string;
}

/**
 * Upload an image file to Pinata IPFS
 * @param file - The file to upload
 * @param metadata - Optional metadata for the file
 * @returns Promise with upload result
 */
export async function uploadImageToPinata(
  file: File,
  metadata?: {
    name?: string;
    description?: string;
    propertyId?: string;
    companyId?: string;
  }
): Promise<UploadImageResult> {
  try {
    // Validate environment variables
    if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_API_KEY) {
      throw new Error("Pinata API credentials not configured");
    }

    // Prepare metadata
    const pinataMetadata = {
      name: metadata?.name || `image-${Date.now()}`,
      keyvalues: {
        description: metadata?.description || "",
        propertyId: metadata?.propertyId || "",
        companyId: metadata?.companyId || "",
        uploadedAt: new Date().toISOString(),
      },
    };

    // Upload options
    const options = {
      pinataMetadata,
      pinataOptions: {
        cidVersion: 0,
      },
    };

    // Create FormData for Pinata upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pinataMetadata", JSON.stringify(pinataMetadata));
    formData.append("pinataOptions", JSON.stringify(options.pinataOptions));

    // Upload to Pinata using fetch API directly
    const uploadResponse = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY!,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY!,
        },
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Pinata upload failed: ${errorText}`);
    }

    const result: PinataUploadResponse = await uploadResponse.json();

    // Return success result with IPFS URL
    return {
      success: true,
      url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      hash: result.IpfsHash,
    };
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Upload multiple images to Pinata
 * @param files - Array of files to upload
 * @param metadata - Base metadata for all files
 * @returns Promise with array of upload results
 */
export async function uploadMultipleImagesToPinata(
  files: File[],
  metadata?: {
    propertyId?: string;
    companyId?: string;
  }
): Promise<UploadImageResult[]> {
  const uploadPromises = files.map((file, index) =>
    uploadImageToPinata(file, {
      name: `${metadata?.propertyId || "image"}-${index + 1}`,
      description: `Image ${index + 1}`,
      ...metadata,
    })
  );

  return Promise.all(uploadPromises);
}

/**
 * Delete/unpin an image from Pinata
 * @param hash - IPFS hash to unpin
 * @returns Promise with deletion result
 */
export async function deleteImageFromPinata(
  hash: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_API_KEY) {
      throw new Error("Pinata API credentials not configured");
    }

    // Delete from Pinata using fetch API directly
    const deleteResponse = await fetch(
      `https://api.pinata.cloud/pinning/unpin/${hash}`,
      {
        method: "DELETE",
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY!,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY!,
        },
      }
    );

    if (!deleteResponse.ok) {
      const errorText = await deleteResponse.text();
      throw new Error(`Pinata delete failed: ${errorText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting from Pinata:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Get file info from Pinata
 * @param hash - IPFS hash to get info for
 * @returns Promise with file info
 */
export async function getFileInfoFromPinata(hash: string) {
  try {
    if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_API_KEY) {
      throw new Error("Pinata API credentials not configured");
    }

    // Get file info from Pinata using fetch API directly
    const response = await fetch(
      `https://api.pinata.cloud/data/pinList?hashContains=${hash}`,
      {
        method: "GET",
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY!,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY!,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get file info: ${response.statusText}`);
    }

    const result = await response.json();
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error getting file info from Pinata:", error);
    return null;
  }
}

export default pinata;
