import Link from "next/link";
import { BedDouble, Bath, Maximize2, MapPin, ArrowUpRight } from "lucide-react";
import { money } from "@/lib/format";

export default function PropertyCard({ property }) {
  return <article className="property-card"><Link href={`/properties/${property.id}`} className="property-image-wrap"><img className="property-image" src={property.image} alt={property.title}/><span className={`status-pill ${property.status === "For Sale" ? "sale" : "rent"}`}>{property.status}</span><span className="image-arrow"><ArrowUpRight size={18}/></span></Link><div className="property-card-body"><div className="property-price">{money(property.price)}<small>{property.status === "For Rent" ? "/ month" : ""}</small></div><Link href={`/properties/${property.id}`} className="property-title">{property.title}</Link><p className="property-location"><MapPin size={15}/>{property.location}</p><div className="property-features">{property.beds > 0 && <span><BedDouble size={16}/>{property.beds} beds</span>}<span><Bath size={16}/>{property.baths} baths</span><span><Maximize2 size={15}/>{property.area} m²</span></div></div></article>;
}
