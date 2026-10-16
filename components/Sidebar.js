"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, House, MessageSquare, PlusCircle, Settings, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/properties", label: "Properties", icon: House },
  { href: "/inquiries", label: "Inquiries", icon: MessageSquare }
];

export default function Sidebar({ open = false, onClose = () => {} }) {
  const pathname = usePathname();
  return <>
    {open && <button className="mobile-scrim" aria-label="Close navigation" onClick={onClose}/>}
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="sidebar-top"><Logo/><button className="icon-button close-sidebar" onClick={onClose} aria-label="Close menu"><X size={19}/></button></div>
      <p className="nav-caption">WORKSPACE</p>
      <nav className="side-nav">
        {links.map(({ href, label, icon: Icon }) => <Link onClick={onClose} key={href} href={href} className={`nav-link ${pathname === href || (href !== "/dashboard" && pathname.startsWith(href)) ? "active" : ""}`}><Icon size={19}/><span>{label}</span></Link>)}
      </nav>
      <div className="sidebar-bottom"><div className="help-card"><span className="help-icon"><Settings size={18}/></span><strong>Manage with confidence</strong><p>Your properties, organized in one place.</p></div><div className="profile"><div className="avatar">GD</div><div><strong>Gizachew Dagnew</strong><small>Property manager</small></div><span className="online-dot"/></div></div>
    </aside>
  </>;
}
