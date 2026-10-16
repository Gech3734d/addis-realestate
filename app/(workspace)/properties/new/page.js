import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import NewPropertyForm from "@/components/NewPropertyForm";

export const metadata = { title: "Add property" };
export default function NewPropertyPage() {
  return <><Link href="/properties" className="back-link"><ArrowLeft size={15}/> Back to properties</Link><PageHeader eyebrow="NEW LISTING" title="Add a property" description="Fill in the details below to add a listing to your portfolio."/><div className="form-layout"><NewPropertyForm/></div></>;
}
