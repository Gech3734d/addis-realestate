export default function Loading() {
  return <div aria-busy="true"><div className="skeleton skeleton-line" style={{width:220,height:30,marginBottom:12}}/><div className="skeleton skeleton-line" style={{width:330,marginBottom:25}}/><div className="skeleton" style={{height:105,marginBottom:20}}/><div className="loading-grid">{[1,2,3].map(n=><div className="skeleton-card" key={n}><div className="skeleton skeleton-image"/><div className="skeleton skeleton-line"/><div className="skeleton skeleton-line short"/></div>)}</div></div>;
}
