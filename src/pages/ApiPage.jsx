import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

const PAGE_SIZE = 10;

export default function ApiPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(res => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then(data => {
        if (!ignore) setItems(data);
      })
      .catch(err => {
        if (!ignore) setError(err.message || "Error fetching");
      })
      .finally(()=> { if (!ignore) setLoading(false); });

    return () => { ignore = true; };
  }, []);

  const filtered = items.filter(item => item.title.includes(q.toLowerCase()) || item.body.includes(q.toLowerCase()));
  const total = filtered.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const pageItems = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  return (
    <div className="space-y-4">
      <Card title="Public API Data (JSONPlaceholder)">
        <div className="flex gap-2 mb-4">
          <input value={q} onChange={(e)=>{ setQ(e.target.value); setPage(1); }} placeholder="Search titles or body..." className="flex-1 px-3 py-2 rounded border" />
          <Button variant="secondary" onClick={()=>{ setQ(""); setPage(1); }}>Clear</Button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <ul className="space-y-3">
          {pageItems.map(post => (
            <li key={post.id} className="p-3 bg-white dark:bg-gray-800 rounded shadow-sm">
              <h4 className="font-semibold">{post.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{post.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm">Total: {total} • Page {page} / {pages || 1}</div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={()=>setPage(p => Math.max(1, p-1))} disabled={page===1}>Prev</Button>
            <Button variant="primary" onClick={()=>setPage(p => Math.min(pages || 1, p+1))} disabled={page===pages || pages===0}>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
