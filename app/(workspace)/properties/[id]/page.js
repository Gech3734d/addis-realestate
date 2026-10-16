import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BedDouble, Bath, Maximize2, MapPin } from "lucide-react";
import { getProperty } from "@/lib/data";
import { money } from "@/lib/format";
import InquiryForm from "@/components/InquiryForm";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = getProperty(id);
  return { title: property ? property.title : "Property not found", description: property?.description || "Property listing details" };
}

export default async function PropertyDetailPage({ params }) {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) notFound();
  return <><Link href="/properties" className="back-link"><ArrowLeft size={15}/> Back to properties</Link><div className="page-header"><div><p className="eyebrow">PROPERTY DETAILS</p><h1>{property.title}</h1><p className="page-description"><MapPin size={14} style={{display:"inline",verticalAlign:"middle"}}/> {property.location}</p></div><span className={`status-pill ${property.status === "For Sale" ? "sale" : "rent"}`}>{property.status}</span></div><div className="detail-grid"><div><img className="detail-image" src={property.image} alt={property.title}/><section className="detail-main"><h2>About this property</h2><p>{property.description}</p><div className="detail-features"><div className="detail-feature"><span>Bedrooms</span><strong><BedDouble size={15} style={{display:"inline",verticalAlign:"middle"}}/> {property.beds}</strong></div><div className="detail-feature"><span>Bathrooms</span><strong><Bath size={15} style={{display:"inline",verticalAlign:"middle"}}/> {property.baths}</strong></div><div className="detail-feature"><span>Floor area</span><strong><Maximize2 size={14} style={{display:"inline",verticalAlign:"middle"}}/> {property.area} m²</strong></div></div></section></div><aside className="detail-sidebar"><div className="detail-price">{money(property.price)} <small>{property.status === "For Rent" ? "/ month" : ""}</small></div><h2>{property.title}</h2><p className="property-location"><MapPin size={15}/>{property.location}</p><div className="property-features"><span><BedDouble size={15}/>{property.beds} beds</span><span><Bath size={15}/>{property.baths} baths</span></div><InquiryForm propertyId={property.id} propertyTitle={property.title}/></aside></div></>;
}
