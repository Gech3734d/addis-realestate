"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";

export default function Topbar({ onMenu }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function submitSearch(event) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    router.push(`/properties?q=${encodeURIComponent(value)}`);
  }

  return (
    <header className="topbar">
      <button className="icon-button menu-toggle" onClick={onMenu} aria-label="Open navigation"><Menu size={21} /></button>
      <form className="global-search" role="search" onSubmit={submitSearch}>
        <Search size={18} />
        <input aria-label="Search properties" placeholder="Search properties, locations..." value={query} onChange={(event) => setQuery(event.target.value)} />
        <button className="global-search-submit" type="submit" aria-label="Submit property search"><kbd>Enter</kbd></button>
      </form>
      <div className="topbar-actions">
        <span className="today-label">Property workspace</span>
        <button className="icon-button notification" aria-label="Notifications"><Bell size={19} /><i /></button>
        <div className="avatar top-avatar">GD</div>
      </div>
    </header>
  );
}
