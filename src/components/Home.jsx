import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

function Home() {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = new URLSearchParams(search).get("category");

  const [filteredproducts, setfilteredproducts] = useState(null);

  const getfilteredproducts = async () => {
    try {
      const { data } = await axios.get(
        `/products/category/${encodeURIComponent(category)}`,
      );
      setfilteredproducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!category) {
      setfilteredproducts(products);
      return;
    }

    if( category != "undefined"){
      setfilteredproducts(products.filter((p)=>p.category == category))
    }

   // getfilteredproducts();
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.12),_transparent_24%)] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-300/80">Catalog</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Discover premium products
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Clean layouts, sharper visuals, and a more polished shopping experience.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredproducts &&
          filteredproducts.map((p, i) => (
            <Link
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-lg shadow-slate-950/30 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-sky-950/30"
              to={`/details/${p.id}`}
              key={p.id}
            >
              <div
                className="mb-3 aspect-square w-full rounded-xl bg-slate-900/70 bg-contain bg-no-repeat bg-center p-2 transition duration-300 group-hover:scale-[1.02]"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h1 className="truncate text-base font-semibold text-white transition group-hover:text-sky-300">
                    {p.title}
                  </h1>
                  <p className="mt-1 truncate text-sm text-slate-400">{p.category}</p>
                </div>
                <span className="shrink-0 rounded-full bg-sky-400/10 px-3 py-1 text-sm font-semibold text-sky-300">
                  ${p.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
