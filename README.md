# Elara Vance Photography — React Portfolio

A clean, production-ready React + Vite portfolio site with EN / SR / NL translations and a
pre-wired API layer ready to connect to an ASP.NET Core backend.

## Quick start

```bash
npm install   # or: pnpm install / yarn install
npm run dev   # opens http://localhost:5173
```

## Environment variables

Copy `.env.example` to `.env` and fill in your values:

```env
VITE_API_URL=https://localhost:7001          # your ASP.NET Core API
VITE_FORMSPREE_URL=https://formspree.io/f/YOUR_FORM_ID  # fallback while no API
```

The contact form automatically uses `VITE_API_URL` when set, otherwise falls back to Formspree.

## Production build

```bash
npm run build   # outputs to dist/
```

Host the `dist/` folder on any static host (Netlify, Vercel, GitHub Pages, Azure Static Web Apps, etc.).

---

## Connecting to ASP.NET Core

### 1. Set `VITE_API_URL` in `.env`

```env
VITE_API_URL=https://localhost:7001
```

The Vite dev server automatically proxies `/api/*` to that URL (see `vite.config.ts`).

### 2. Contact form endpoint

The contact form (`src/api/contact.ts`) posts to `/api/contact`.  
Add this controller to your ASP.NET Core project:

```csharp
// Controllers/ContactController.cs
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    public record ContactRequest(string Name, string Email, string Type, string Message);
    public record ContactResponse(bool Success, string? Message = null);

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ContactRequest request)
    {
        // TODO: send email, save to DB, etc.
        await Task.CompletedTask;
        return Ok(new ContactResponse(true));
    }
}
```

### 3. CORS (development)

Add this to your `Program.cs`:

```csharp
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()));

// ...

app.UseCors();
```

### 4. Extending the API client

Use `src/api/client.ts` for all future API calls:

```ts
import { api } from "@/api/client";
import type { PortfolioImage } from "@/api/types";

const images = await api.get<PortfolioImage[]>("/api/portfolio");
```

Add new request/response types to `src/api/types.ts`.

---

## Project structure

```
src/
  api/
    client.ts        ← base fetch wrapper (GET / POST / PUT / PATCH / DELETE)
    contact.ts       ← contact form submission (API or Formspree fallback)
    types.ts         ← TypeScript DTOs — add your ASP.NET Core models here
  assets/images/     ← all photography images
  components/
    layout/          ← Navbar, Footer, Layout
    ui/              ← portable shadcn-style components (no Replit deps)
  hooks/
    use-toast.ts     ← toast notification hook
  pages/             ← Home, Portfolio, About, Services, Contact, NotFound
  i18n.ts            ← EN / SR / NL translations
  App.tsx            ← router setup (react-router-dom v6)
  main.tsx
```

## Tech stack

| Library | Purpose |
|---|---|
| React 18 + Vite | UI framework & build tool |
| react-router-dom v6 | Client-side routing |
| Tailwind CSS v4 | Styling |
| framer-motion | Page & scroll animations |
| react-i18next | EN / SR / NL translations |
| react-hook-form + zod | Contact form validation |
| @radix-ui/* | Accessible UI primitives |
| lucide-react | Icons |
