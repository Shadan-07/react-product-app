import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Edit() {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const { id } = useParams();

  const [product, setproduct] = useState({
    image: "", 
    title: "",
    category: "",
    price: "",
    description: "",
  });
  /*   const [title, settitle] = useState("");
     const [image, setimage] = useState("");
     const [category, setcategory] = useState("");
     const [price, setprice] = useState("");
     const [description, setdescription] = useState(""); */

  const ChangeHandler = (e) => {
    console.log(e.target.name, e.target.value);
    setproduct({...product, [e.target.name]: e.target.value}); 
  };

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 4 ||
      product.image.trim().length < 4 ||
      product.category.trim().length < 4 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 4
    ) {
      toast.error("Each & every input must have atleast 4 characters");
      return;
    }

    const pi = products.findIndex((p)=> p.id == id);
    const CopyData = [...products];
    CopyData[pi] ={ ...products[pi], ...product }

    setproducts(CopyData);
    localStorage.setItem("products", JSON.stringify(CopyData));
    navigate(-1);

    /* const new_product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setproducts([...products, new_product]);
    localStorage.setItem(
      "products",
      JSON.stringify([...products, new_product]),
    );
    navigate("/");*/
  }; 

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex min-h-screen w-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_25%),linear-gradient(180deg,rgba(2,6,23,1),rgba(15,23,42,1))] px-4 py-10 sm:px-6"
    >
      <div className="w-full max-w-3xl rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8">
      <h1 className="mb-2 text-3xl font-semibold tracking-tight text-white">Edit Product</h1>
      <p className="mb-8 text-sm text-slate-400">Update the existing listing with a cleaner presentation.</p>
      <input
        type="url"
        placeholder="image link"
        className="mb-4 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
        onChange={ChangeHandler}
        name="image"
        value={product && product.image}
      />
      <input
        type="text"
        placeholder="title"
        className="mb-4 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
        onChange={ChangeHandler}
        name="title"
        value={product && product.title}
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="category"
          className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          onChange={ChangeHandler}
          name="category"
          value={product && product.category}
        />
        <input
          type="number"
          placeholder="price"
          className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          onChange={ChangeHandler}
          name="price"
          value={product && product.price}
        />
      </div>
      <textarea
        onChange={ChangeHandler}
        name="description"
        value={product && product.description}
        placeholder="enter product description here.."
        className="mb-5 min-h-48 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
        rows="10"
      ></textarea>
      <div className="flex justify-end">
        <button className="inline-flex items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-300 hover:shadow-sky-400/30 cursor-pointer">
          Save Changes
        </button>
      </div>
      </div>
    </form>
  );
}

export default Edit ;
