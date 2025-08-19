import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production"
);

export async function verifyAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");

    if (!token) {
      return false;
    }

    // Verify JWT token
    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    
    return payload.admin === true;
  } catch (error) {
    console.error("Auth verification error:", error);
    return false;
  }
}

export async function requireAdminAuth() {
  const isAuthenticated = await verifyAdminAuth();
  
  if (!isAuthenticated) {
    throw new Error("Unauthorized access");
  }
  
  return true;
}
