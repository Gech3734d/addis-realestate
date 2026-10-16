"use client";
export default function DashboardError({ error, reset }) {
  return <div className="error-box" role="alert"><h2>Dashboard could not load</h2><p>{error.message || "Something went wrong while loading dashboard data."}</p><button className="button button-primary" onClick={() => reset()}>Try again</button></div>;
}
