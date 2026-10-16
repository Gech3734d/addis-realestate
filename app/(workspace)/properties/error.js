"use client";
export default function PropertiesError({ error, reset }) {
  return <div className="error-box" role="alert"><h2>Properties unavailable</h2><p>{error.message || "We could not load your listings."}</p><button className="button button-primary" onClick={reset}>Reload listings</button></div>;
}
