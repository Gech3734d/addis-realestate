import Link from "next/link";
import { Building2 } from "lucide-react";

export default function Logo() {
  return <Link href="/" className="brand"><span className="brand-mark"><Building2 size={21}/></span><span>estate<span className="brand-accent">flow</span></span></Link>;
}
