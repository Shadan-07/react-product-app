import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Create() {
  const navigate = useNavigate();

  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  const [products, setproducts] = useContext(ProductContext);

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 4 ||
      image.trim().length < 4 ||
      category.trim().length < 4 ||
      price.trim().length < 1 ||
      description.trim().length < 4
    ) {
      toast.error("Each & every input must have atleast 4 characters");
      return;
    }

    const new_product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setproducts([...products, new_product]);
    localStorage.setItem("products", JSON.stringify([...products, new_product]))
    toast.success("Product Added Successfully");
    navigate('/');
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex min-h-screen w-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_25%),linear-gradient(180deg,rgba(2,6,23,1),rgba(15,23,42,1))] px-4 py-10 sm:px-6"
    >
      <div className="w-full max-w-3xl rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-white">Add New Product</h1>
        <p className="mb-8 text-sm text-slate-400">Create a polished new listing for your catalog.</p>
      <input
        type="url"
        placeholder="image link"
        className="mb-4 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="title"
        className="mb-4 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
        onChange={(e) => settitle(e.target.value)}
        value={title}
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="category"
          className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="price"
          className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        onChange={(e) => setdescription(e.target.value)}
        value={description}
        placeholder="enter product description here.."
        className="mb-5 min-h-48 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
        rows="10"
      ></textarea>
      <div className="flex justify-end">
        <button className="inline-flex items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-300 hover:shadow-sky-400/30 cursor-pointer">
          Add New Product
        </button>
      </div>
      </div>
    </form>
  );
}

export default Create;
