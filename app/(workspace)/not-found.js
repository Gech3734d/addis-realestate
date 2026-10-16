import Link from "next/link";
export default function NotFound() {
  return <div className="empty-state"><div className="empty-icon">404</div><h3>Page not found</h3><p>The page you’re looking for doesn’t exist or has moved.</p><Link href="/dashboard" className="button button-primary">Go to dashboard</Link></div>;
}
