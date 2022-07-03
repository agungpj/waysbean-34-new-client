import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Footer, Navbar } from "../../exports";
import { Peniti } from "../../exports/exportImages";

import { API } from "../../config/api";

const EditProduct = () => {
  const title = "Edit Product";
  document.title = "WaysBeans | " + title;

  let navigate = useNavigate();
  let { id } = useParams();

  const [preview, setPreview] = useState(null);
  const [product, setProduct] = useState({});
  const [form, setFrom] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  });

  const getProduct = async (id) => {
    try {
      const response = await API.get("/product/" + id);
      // Store product data to useState variabel
      // return console.log(response);
      setPreview(response.data.data.getProduct.image);
      setFrom({
        ...form,
        name: response.data.data.getProduct.name,
        desc: response.data.data.getProduct.desc,
        price: response.data.data.getProduct.price,
        qty: response.data.data.getProduct.qty,
      });
      // return console.log(response.data.data.getProduct);
      setProduct(response.data.data.getProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  //handle change data on form
  const handleChange = (e) => {
    setFrom({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  //handle onsubmit for update data when submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);

      // Insert product data
      const response = await API.patch(
        "/product/" + product.id,
        formData,
        config
      );
      console.log(response.data);

      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-brand-font-color font-[Avenir-Black] text-2xl mx-40 mt-12">
        Edit Product
      </h1>
      <div className="flex items-start justify-between mx-40">
        <div className="basis-3/5">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              value={form?.name}
              onChange={handleChange}
              class="text-brand-font-color bg-input-brown border-brand-font-color w-full my-2 px-3 py-2 border-2 rounded-md focus:outline-none placeholder-gray-500 focus:border-zinc-400 focus:z-10"
            />
            <input
              type="number"
              placeholder="Stock"
              name="qty"
              value={form?.qty}
              onChange={handleChange}
              class="text-brand-font-color bg-input-brown border-brand-font-color w-full my-2 px-3 py-2 border-2 rounded-md focus:outline-none placeholder-gray-500 focus:border-zinc-400 focus:z-10"
            />
            <input
              type="number"
              placeholder="Price (Rp.)"
              name="price"
              value={form?.price}
              onChange={handleChange}
              class="text-brand-font-color bg-input-brown border-brand-font-color w-full my-2 px-3 py-2 border-2 rounded-md focus:outline-none placeholder-gray-500 focus:border-zinc-400 focus:z-10"
            />
            <textarea
              placeholder="Product Desc"
              name="desc"
              value={form?.desc}
              onChange={handleChange}
              cols="130"
              rows="4"
              class="text-brand-font-color bg-input-brown border-brand-font-color w-full my-2 px-3 py-2 border-2 rounded-md focus:outline-none placeholder-gray-500 focus:border-zinc-400 focus:z-10"
            ></textarea>
            <label
              htmlFor="photo-upload"
              className="relative cursor-pointer font-medium text-gray-500"
              placeholder="asdads"
            >
              <div
                className="flex mr-96 border-2 border-brand-font-color bg-input-brown rounded-md justify-between items-center px-1 py-2
                        focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
              >
                <p className="ml-2 text-sm bg-input-brown opacity-100 font-normal">
                  Photo Product
                </p>
                <input
                  id="photo-upload"
                  name="image"
                  type="file"
                  className="hidden place"
                  onChange={handleChange}
                />
                <img className="h-5 mr-2" src={Peniti} alt="" />
              </div>
            </label>

            <button className="bg-brand-font-color hover:bg-amber-900 mt-4 w-full px-3 py-2 rounded-md text-white font-semibold">
              Save
            </button>
          </form>
        </div>
        <div className="1/3">
          {preview && (
            <div>
              <img
                src={preview}
                className="w-80"
                style={{
                  objectFit: "cover",
                }}
                alt="preview"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProduct;
