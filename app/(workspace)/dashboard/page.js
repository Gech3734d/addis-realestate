import Link from "next/link";
import { Suspense } from "react";
import { House, BadgeDollarSign, KeyRound, MessageSquare, ArrowUpRight, Plus, ListChecks } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import PropertyCard from "@/components/PropertyCard";
import { getProperties, getSummary } from "@/lib/data";
import { money } from "@/lib/format";

async function DashboardSummary() {
  // Read data directly on the server instead of making an HTTP request to
  // our own Route Handler. This avoids localhost/port/env URL problems.
  const summary = getSummary();

  return <div className="stat-grid">
    <StatCard label="Total properties" value={summary.propertyCount} hint="Across all listings" icon={House} tone="blue"/>
    <StatCard label="For sale" value={summary.forSale} hint="Active sale listings" icon={BadgeDollarSign} tone="green"/>
    <StatCard label="For rent" value={summary.forRent} hint="Rental opportunities" icon={KeyRound} tone="orange"/>
    <StatCard label="Inquiries" value={summary.inquiryCount} hint="Messages received" icon={MessageSquare} tone="purple"/>
  </div>;
}
function StatsFallback() { return <div className="stat-grid">{[1,2,3,4].map(n=><div className="stat-card" key={n}><div className="skeleton" style={{height:38,width:38}}/><div className="skeleton skeleton-line"/><div className="skeleton skeleton-line short"/></div>)}</div>; }

export default async function DashboardPage() {
  const properties = await getProperties();
  const featured = properties.filter((p) => p.featured).slice(0, 3);
  return <><PageHeader eyebrow="OVERVIEW" title="Good morning, Gizachew" description="Here’s what’s happening with your properties today." action={<Link className="button button-primary" href="/properties/new"><Plus size={17}/> Add property</Link>}/>
    <Suspense fallback={<StatsFallback/>}><DashboardSummary/></Suspense>
    <section className="content-section"><div className="section-heading"><div><h2>Featured properties</h2><p>Your highlighted listings at a glance</p></div><Link className="text-link" href="/properties">View all properties <ArrowUpRight size={15}/></Link></div><div className="property-grid">{featured.map(p=><PropertyCard key={p.id} property={p}/>)}</div></section>
    <section className="content-section"><div className="section-heading"><div><h2>Quick actions</h2><p>Jump straight into your daily work</p></div></div><div className="quick-actions"><Link href="/properties/new" className="quick-action"><span className="quick-action-icon"><Plus size={19}/></span><span><strong>Add a property</strong><small>Create a new listing</small></span></Link><Link href="/properties" className="quick-action"><span className="quick-action-icon"><House size={19}/></span><span><strong>Manage listings</strong><small>Review your properties</small></span></Link><Link href="/inquiries" className="quick-action"><span className="quick-action-icon"><ListChecks size={19}/></span><span><strong>Review inquiries</strong><small>Respond to prospective clients</small></span></Link></div></section>
    <div className="content-section"><div className="section-heading"><div><h2>Portfolio value</h2><p>Combined asking price of sale listings</p></div></div><div className="stat-card"><div className="stat-label">Estimated listed value</div><div className="stat-value">{money(properties.filter(p=>p.status==="For Sale").reduce((sum,p)=>sum+p.price,0))}</div><div className="stat-hint">Asking prices only — not a formal valuation.</div></div></div>
  </>;
}
