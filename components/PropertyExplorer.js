"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import PropertyCard from "./PropertyCard";

export default function PropertyExplorer({ properties, initialQuery = "" }) {
  const [search, setSearch] = useState(initialQuery);
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("recent");
  const filtered = useMemo(() => properties.filter((p) => {
    const text = `${p.title} ${p.location} ${p.type}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (status === "All" || p.status === status) && (type === "All" || p.type === type);
  }).sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : 0), [properties, search, status, type, sort]);
  const clear = () => { setSearch(""); setStatus("All"); setType("All"); setSort("recent"); };
  return <><div className="filter-panel"><div className="filter-search"><Search size={18}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, type or location..." aria-label="Search properties"/></div><div className="filter-selects"><label><span>Status</span><select value={status} onChange={(e) => setStatus(e.target.value)}><option>All</option><option>For Sale</option><option>For Rent</option></select></label><label><span>Property type</span><select value={type} onChange={(e) => setType(e.target.value)}><option>All</option>{[...new Set(properties.map((p) => p.type))].map((t) => <option key={t}>{t}</option>)}</select></label><label><span>Sort by</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recent">Featured order</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label><button className="button button-quiet clear-filters" onClick={clear}><X size={15}/> Clear</button></div></div><div className="results-line"><span><SlidersHorizontal size={15}/> {filtered.length} properties found</span></div>{filtered.length ? <div className="property-grid">{filtered.map((p) => <PropertyCard key={p.id} property={p}/>)}</div> : <div className="empty-state"><div className="empty-icon"><Search size={25}/></div><h3>No properties found</h3><p>Try changing your search or clearing the filters.</p><button className="button button-secondary" onClick={clear}>Clear filters</button></div>}</>;
}
