import Link from "next/link";
import { Plus } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PropertyExplorer from "@/components/PropertyExplorer";
import { getProperties } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Properties" };

export default async function PropertiesPage({ searchParams }) {
  const params = await searchParams;
  const properties = await getProperties();
  const initialQuery = typeof params?.q === "string" ? params.q : "";

  return (
    <>
      <PageHeader
        eyebrow="LISTINGS"
        title="Properties"
        description="Manage your portfolio, update listings, and find the right property."
        action={
          <Link href="/properties/new" className="button button-primary">
            <Plus size={17} /> Add property
          </Link>
        }
      />
      <PropertyExplorer properties={properties} initialQuery={initialQuery} />
    </>
  );
}
