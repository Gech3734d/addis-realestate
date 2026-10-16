export const initialProperties = [
  { id: "p-101", title: "Modern Family Villa", location: "Bole, Addis Ababa", price: 12500000, type: "Villa", status: "For Sale", beds: 4, baths: 3, area: 260, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", description: "A bright family villa with a private garden, generous living spaces, and secure parking.", featured: true },
  { id: "p-102", title: "Downtown Apartment", location: "Kazanchis, Addis Ababa", price: 68000, type: "Apartment", status: "For Rent", beds: 2, baths: 2, area: 110, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80", description: "Contemporary apartment close to offices, cafés, and public transport.", featured: true },
  { id: "p-103", title: "Lakeside Retreat", location: "Bahir Dar, Amhara", price: 8700000, type: "House", status: "For Sale", beds: 3, baths: 2, area: 190, image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80", description: "Relaxed single-family home with a covered terrace and a landscaped yard.", featured: false },
  { id: "p-104", title: "Garden Studio", location: "CMC, Addis Ababa", price: 32000, type: "Studio", status: "For Rent", beds: 1, baths: 1, area: 55, image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80", description: "Efficient furnished studio with natural light and shared garden access.", featured: false },
  { id: "p-105", title: "Executive Townhouse", location: "Summit, Addis Ababa", price: 9800000, type: "Townhouse", status: "For Sale", beds: 3, baths: 3, area: 210, image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80", description: "Low-maintenance townhouse with modern finishes and a practical floor plan.", featured: true },
  { id: "p-106", title: "Office Suite", location: "Piazza, Addis Ababa", price: 95000, type: "Commercial", status: "For Rent", beds: 0, baths: 2, area: 145, image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80", description: "Flexible commercial office space in a central business location.", featured: false }
];

let properties = [...initialProperties];
let inquiries = [
  { id: "i-1", name: "Sara Bekele", email: "sara@example.com", propertyId: "p-101", message: "Could I schedule a viewing this weekend?", status: "New", createdAt: "2026-10-12" },
  { id: "i-2", name: "Dawit Alemu", email: "dawit@example.com", propertyId: "p-102", message: "Is the apartment available from next month?", status: "Contacted", createdAt: "2026-10-11" }
];

export function getProperties() { return properties.map((p) => ({ ...p })); }
export function getProperty(id) { return properties.find((p) => p.id === id) || null; }
export function addProperty(input) {
  const property = { ...input, id: `p-${Date.now()}`, featured: false };
  properties = [property, ...properties];
  return property;
}
export function updateProperty(id, patch) {
  const index = properties.findIndex((p) => p.id === id);
  if (index < 0) return null;
  properties[index] = { ...properties[index], ...patch, id };
  return { ...properties[index] };
}
export function deleteProperty(id) {
  const before = properties.length;
  properties = properties.filter((p) => p.id !== id);
  return properties.length !== before;
}
export function getInquiries() { return inquiries.map((i) => ({ ...i })); }
export function addInquiry(input) {
  const inquiry = { ...input, id: `i-${Date.now()}`, status: "New", createdAt: new Date().toISOString().slice(0, 10) };
  inquiries = [inquiry, ...inquiries];
  return inquiry;
}
export function getSummary() {
  return {
    propertyCount: properties.length,
    forSale: properties.filter((p) => p.status === "For Sale").length,
    forRent: properties.filter((p) => p.status === "For Rent").length,
    inquiryCount: inquiries.length,
    estimatedPortfolioValue: properties.filter((p) => p.status === "For Sale").reduce((sum, p) => sum + p.price, 0)
  };
}
