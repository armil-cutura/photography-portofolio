/**
 * Contact form submission.
 *
 * Strategy (in order of preference):
 *   1. If VITE_API_URL is set  → POST to your ASP.NET Core API (/api/contact)
 *   2. Fallback                → POST to Formspree (VITE_FORMSPREE_URL)
 *
 * To wire up the ASP.NET Core endpoint, set VITE_API_URL in your .env.
 * The matching C# controller signature is included in the README.
 */

import { api } from "./client";
import type { ContactRequest, ContactResponse } from "./types";

const API_URL = import.meta.env.VITE_API_URL as string | undefined;
const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL as string | undefined;

export async function submitContact(
  data: ContactRequest
): Promise<ContactResponse> {
  if (API_URL) {
    return api.post<ContactResponse>("/api/contact", data);
  }

  if (FORMSPREE_URL) {
    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Formspree error: ${res.status}`);
    return { success: true };
  }

  throw new Error(
    "No contact endpoint configured. Set VITE_API_URL or VITE_FORMSPREE_URL in your .env file."
  );
}
