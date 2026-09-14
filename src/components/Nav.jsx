import React from "react";
import { ProductContext } from "../utils/Context";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [products] = useContext(ProductContext);

  const distinct_category = [
    ...new Set(products?.reduce((acc, cv) => [...acc, cv.category], []) || []), //Set only keeps distinct values
  ];

  const color = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;
  };

  return (
    <nav className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-slate-950/95 px-5 py-6 text-slate-100 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
      <Link
        to="/"
        className="mb-3 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
      >
        Home
      </Link>
      <a
        className="inline-flex items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-300 hover:shadow-sky-400/30"
        href="/create"
      >
        Add New Product
      </a>
      <div className="my-6 h-px w-full bg-white/10" />
      <div className="mb-4">
        <h1 className="text-lg font-semibold tracking-tight text-white">Category Filter</h1>
        <p className="mt-1 text-xs text-slate-400">Browse products by category</p>
      </div>
      <div className="space-y-2 overflow-y-auto pr-1">
        {distinct_category.map((c, i) => (
          <Link
            to={`/?category=${encodeURIComponent(c)}`}
            key={i}
            className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-3 py-3 text-sm font-medium text-slate-200 transition hover:-translate-x-1 hover:border-sky-400/30 hover:bg-slate-800/90"
          >
            <span
              style={{ backgroundColor: color() }}
              className="h-3.5 w-3.5 rounded-full ring-2 ring-white/10"
            ></span>
            <span className="truncate">{c}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Nav;
