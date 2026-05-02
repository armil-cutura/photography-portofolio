/**
 * Shared TypeScript types for API request/response shapes.
 * Add your ASP.NET Core DTOs here as you build out the backend.
 */

// ── Contact ──────────────────────────────────────────────────────────────────

export interface ContactRequest {
  name: string;
  email: string;
  type: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
}

// ── Booking (example future extension) ───────────────────────────────────────

export interface BookingRequest {
  name: string;
  email: string;
  phone?: string;
  sessionType: string;
  preferredDate: string;
  notes?: string;
}

export interface BookingResponse {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
  confirmedAt?: string;
}

// ── Portfolio (example future extension) ─────────────────────────────────────

export interface PortfolioImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  category: string;
  title: string;
  description?: string;
}
