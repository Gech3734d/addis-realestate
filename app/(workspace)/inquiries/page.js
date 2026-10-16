import { MessageSquare, Mail, CalendarDays } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { getInquiries, getProperty } from "@/lib/data";

export const metadata = { title: "Inquiries" };
export default async function InquiriesPage() {
  const inquiries = getInquiries();
  return <><PageHeader eyebrow="CLIENT MESSAGES" title="Inquiries" description="Keep track of people interested in your listings."/><div className="stat-grid"><article className="stat-card"><div className="stat-icon blue"><MessageSquare size={20}/></div><div className="stat-label">All inquiries</div><div className="stat-value">{inquiries.length}</div><div className="stat-hint">Messages received</div></article><article className="stat-card"><div className="stat-icon orange"><Mail size={20}/></div><div className="stat-label">New messages</div><div className="stat-value">{inquiries.filter(i=>i.status==="New").length}</div><div className="stat-hint">Waiting for follow-up</div></article></div>{inquiries.length ? <div className="inquiry-list">{inquiries.map(i=>{const property=getProperty(i.propertyId);return <article className="inquiry-card" key={i.id}><div><h3>{i.name}</h3><a className="inquiry-email" href={`mailto:${i.email}`}>{i.email}</a><p>{i.message}</p><div className="inquiry-meta"><span><CalendarDays size={13} style={{display:"inline",verticalAlign:"middle"}}/> {i.createdAt}</span><span>Property: {property?.title || "Listing removed"}</span></div></div><span className={`inquiry-status ${i.status==="Contacted"?"contacted":""}`}>{i.status}</span></article>})}</div>:<div className="empty-state"><div className="empty-icon"><MessageSquare size={24}/></div><h3>No inquiries yet</h3><p>Messages sent from property detail pages will appear here.</p></div>}</>;
}
