import { Footer, Navbar } from "../../exports";
// import dataProduct from "../../dummyDatabase/Product";
import rupiahFormat from "rupiah-format";

import React, { useEffect, useState, Fragment, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Dialog, Transition } from "@headlessui/react";

import { API } from "../../config/api";

const DetailProduct = () => {
  const title = "Detail Product";
  document.title = "WaysBeans | " + title;

  let navigate = useNavigate();
  let { id } = useParams();

  const [product, setProduct] = useState({});
  const [openAddCart, setOpenAddCart] = useState(false);
  const cancelButtonRef = useRef(null);

  // Fetching detail product data by id from database
  const getProduct = async (id) => {
    try {
      const response = await API.get("/product/" + id);
      // Store product data to useState variabel
      setProduct(response.data.data.getProduct);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCart = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({ idProduct: id });

      const response = await API.post("/cart", body, config);
      setOpenAddCart(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-start">
        <div className="basis-2/5 ml-32 py-10">
          <img className="w-80 rounded-md" src={product.image} alt="product2" />
        </div>
        <div className="basis-3/5 mt-20 mr-40 h-96 grid grid-cols-1 gap-4">
          <div>
            <h1 className="text-brand-font-color text-3xl font-[Avenir-Black]">
              {product.name}
            </h1>
            <p className="mt-2 mb-9 text-brand-soft-font">
              Stock : {product.qty}
            </p>
            <p className="text-justify">{product.desc}</p>
          </div>
          <p className="text-right text-brand-soft-font text-2xl font-bold place-self-end">
            {/* {product.price} */}
            {rupiahFormat.convert(product.price)}
          </p>
          <button
            onClick={handleAddCart}
            className="bg-brand-font-color text-white text-[Avenir-Black] hover:bg-amber-800 w-full py-2 rounded-md mt-5 place-self-end"
          >
            Buy
          </button>
        </div>
      </div>
      <Footer />
      <Transition.Root show={openAddCart} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpenAddCart}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white text-brand-soft-font rounded-lg text-center overflow-hidden text-brand- py-8 shadow-xl transform transition-all md:mt-56 sm:my-28 sm:align-middle w-96">
                Success Add Product <br />
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="bg-brand-font-color hover:bg-amber-800 text-white text-sm mt-5 mr-3 py-2 px-6 rounded-md"
                >
                  Continue Shop
                </button>
                <button
                  onClick={() => {
                    navigate("/my-cart");
                  }}
                  className="bg-brand-font-color hover:bg-amber-800 text-white text-sm mt-5 py-2 px-6 rounded-md"
                >
                  To Cart
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default DetailProduct;
