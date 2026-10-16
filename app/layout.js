import "./globals.css";

export const metadata = {
  title: { default: "EstateFlow | Real Estate Management", template: "%s | EstateFlow" },
  description: "Manage property listings, inquiries, and real estate operations in one responsive workspace."
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
