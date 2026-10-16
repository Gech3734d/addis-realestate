import Link from "next/link";
export default function PropertyNotFound() {
  return <div className="empty-state"><div className="empty-icon">404</div><h3>Property not found</h3><p>This property may have been removed or the URL may be incorrect.</p><Link className="button button-primary" href="/properties">Back to properties</Link></div>;
}
