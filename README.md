# EstateFlow — Real Estate Management System

A responsive Next.js App Router learning project with a property-management dashboard.

## Run locally
1. Install Node.js 20.9+.
2. Extract this ZIP and open the project folder in VS Code.
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:3000

## Included concepts
- File-system routing: `/`, `/properties`, `/properties/[id]`, `/dashboard`, `/inquiries`, `/api/properties`, `/api/properties/[id]`, `/api/inquiries`
- Nested layouts and shared navigation
- Special files: `loading.js`, `error.js`, `not-found.js`, `global-error.js`
- Server Components by default; Client Components only for interactive filters, forms, and mobile navigation
- Composition using reusable `PropertyCard`, `PageHeader`, and `StatCard` components
- Suspense streaming for dashboard summaries
- Server-side data loading with `cache: 'no-store'` for fresh demo data
- Route Handlers with GET/POST/PATCH/DELETE examples
- Dynamic metadata and `notFound()` for invalid property IDs
- Responsive CSS

## Demo data note
The API uses an in-memory demo store. It is reset when the development server restarts and is not a production database. For production, connect a database (PostgreSQL/Prisma, MySQL, etc.), add authentication/authorization, validation, logging, and rate limiting.

## Routing and rendering notes
- `app/properties/[id]/page.js` is a dynamic route.
- `app/(workspace)/layout.js` is a route-group layout; the group name does not appear in URLs.
- `app/dashboard/loading.js` and `app/properties/loading.js` demonstrate route-level loading UI.
- The dashboard streams a slow summary component inside `<Suspense>`.
- `app/api/**/route.js` are Route Handlers, not UI pages.


## Active search
- Use the search field in the top bar and press Enter to open the Properties page with the query applied.
- The Properties page search filters by property title, location, and type as you type.
- Status, property type, and price sorting filters work together with text search.
