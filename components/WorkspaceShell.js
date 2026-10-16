"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function WorkspaceShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="app-shell"><Sidebar open={menuOpen} onClose={() => setMenuOpen(false)}/><div className="main-shell"><Topbar onMenu={() => setMenuOpen(true)}/><main className="main-content">{children}</main><footer className="footer">© 2026 EstateFlow <span>Property management, made simpler.</span></footer></div></div>;
}
