import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

function Details() {
  const navigate = useNavigate();
  const [product, setproduct] = React.useState(null);
  const [products, setproducts] = useContext(ProductContext);

  const { id } = useParams();

  /* const getsingleproduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setproduct(data);
    } catch (error) {
      console.log(error);
    }
  }; */

   const ProductDeleteHandler = (id) => {
    const FilteredProducts = products.filter((p)=> p.id != id);
    setproducts(FilteredProducts);
    localStorage.setItem("products", JSON.stringify(FilteredProducts));
    toast.info("Product Deleted Successfully");
    navigate('/'); 
   }

  useEffect(() => {
    if(!product){
      setproduct(products.filter((p)=> p.id == id)[0])
    }
   // getsingleproduct();
  }, []);

  return product ? (
    <div
      key={product.id}
      className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-10 sm:px-8 lg:px-10"
    >
      <Link
        to="/"
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 shadow-lg shadow-slate-950/30 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-sky-400"
          aria-hidden="true"
        >
          <path d="M12.707 2.293a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13h1v7a1 1 0 0 0 1 1h5v-6h4v6h5a1 1 0 0 0 1-1v-7h1a1 1 0 0 0 .707-1.707l-9-9Z" />
        </svg>
        <span>Home</span>
      </Link>

      <div className="grid w-full gap-8 rounded-4xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
        <div className="flex items-center justify-center rounded-[1.75rem] bg-slate-900/70 p-6">
          <img
            className="max-h-128 w-full object-contain drop-shadow-2xl"
            src={`${product.image}`}
            alt=""
          />
        </div>
        <div className="content flex flex-col justify-center rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-6 sm:p-8">
          <div className="inline-flex w-fit rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            {product.category}
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {product.title}
          </h1>
          <h2 className="mt-4 text-2xl font-semibold text-emerald-300">
            ${product.price}
          </h2>
          <p className="mt-5 leading-7 text-slate-300">{product.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`/edit/${product.id}`}
              className="inline-flex items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-300 hover:shadow-sky-400/30"
            >
              Edit
            </Link>
            <button
              onClick={() => {ProductDeleteHandler(product.id)}}
              className="inline-flex items-center justify-center rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-500/20 hover:text-rose-100"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;
