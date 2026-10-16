"use client";
import "./globals.css";
export default function GlobalError({ reset }) {
  return <html lang="en"><body><main className="main-content"><div className="error-box"><h2>Something went wrong</h2><p>An unexpected application error occurred.</p><button className="button button-primary" onClick={() => reset()}>Try again</button></div></main></body></html>;
}
