import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";

import { Footer, Navbar } from "../../exports";
import { EmptyCart, Guatemala, TrashIco } from "../../exports/exportImages";

import rupiahFormat from "rupiah-format";

import { API } from "../../config/api";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";

const Cart = () => {
  const title = "Cart";
  document.title = "WaysBeans | " + title;

  let navigate = useNavigate();

  const [state] = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);
  const [postcode, setPostCode] = useState("");
  const [form, setForm] = useState({
    postalcode: "",
  });

  const getProductCart = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await API.get("/cart/" + state.user.id, config);
      setProducts(response.data.data);
      const totalqty = response.data.data.reduce(
        (sum, elem) => sum + elem.qty,
        0
      );
      setQty(totalqty);
      console.log(totalqty);
      const totalprice = response.data.data.reduce(
        (sum, elem) => sum + elem.qty * elem.product.price,
        0
      );
      setTotal(totalprice);
      console.log(totalprice);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseCart = async (idProduct) => {
    try {
      const result = products.find(({ id }) => id == idProduct);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Basic " + localStorage.token,
        },
      };

      const body = JSON.stringify({ qty: result.qty + 1 });
      const response = await API.patch("/cart/" + idProduct, body, config);
      console.log(result.qty++);
      getProductCart();
    } catch (error) {
      console.log(error);
    }
  };

  const getQty = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseCart = async (idProduct) => {
    try {
      const result = products.find(({ id }) => id == idProduct);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Basic " + localStorage.token,
        },
      };

      const body = JSON.stringify({ qty: result.qty - 1 });
      const response = await API.patch("/cart/" + idProduct, body, config);
      console.log(result.qty--);
      getProductCart();
    } catch (error) {
      console.log(error);
    }
  };

  const [idDelete, setIdDelete] = useState(null);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Create function handle get id product & show modal confirm delete data here ...
  const handleDelete = (id) => {
    setIdDelete(id);
    setOpen(!open);
  };

  const deleteById = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      await API.delete(`/cart/${id}`, config);
      getProductCart();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = () => {
    setOpen(!open);
    setConfirmDelete(true);
  };
  const [openAddCart, setOpenAddCart] = useState(false);

  const handleBuy = async () => {
    try {
      // e.preventDefault();

      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };

      const data = {
        price: total,
        qty: qty,
        product: products,
      };

      const body = JSON.stringify(data);
      const response = await API.post("/transaction/", body, config);
      // setOpenAddCart(true);

      // navigate("/profile");
      console.log(response);

      const token = response.data.payment.token;

      // // Init Snap for display payment page with token here ...
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          //  navigate("/profile");
          setOpenAddCart(true);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          //  navigate("/profile");
          setOpenAddCart(true);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          API.delete(`/transaction/${response.data.id}`);
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Call function for handle close modal and execute delete data with useEffect here ...
  useEffect(() => {
    if (confirmDelete) {
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  useEffect(() => {
    getProductCart();
    console.log(state);
    // sendMessage();
    getQty();
    //   console.log(postcode);
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-pqxbQKlhow9771qF";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex mt-20">
        <div className="ml-32 basis-1/2">
          <div className="text-brand-font-color font-[Avenir-Black] font-bold text-2xl mb-8">
            My Cart
          </div>
          <div className="text-brand-font-color mb-5">Review Your Order</div>
          <hr className="my-3 borde-1 border-brand-font-color" />
          {products.length !== 0 ? (
            <>
              {products?.map((item, index) => (
                <div key={index} className="flex justify-between my-3">
                  <div className="flex">
                    <img src={item.product.image} alt="" className="w-16" />
                    <div className="flex flex-col mx-3 justify-center">
                      <span className="text-brand-font-color font-bold mb-3">
                        {item.product.name}
                      </span>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => decreaseCart(item.id)}
                          className="text-brand-font-color text-xl font-bold"
                        >
                          -
                        </button>
                        <span className="bg-card-color px-3 py-1 text-brand-font-color text-sm rounded-md">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => increaseCart(item.id)}
                          className="text-brand-font-color font-[Avenir-Black]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    <span className="text-brand-font-color my-2">
                      {rupiahFormat.convert(item.qty * item.product.price)}
                    </span>
                    <img
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="cursor-pointer"
                      src={TrashIco}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <img className="w-1/2" src={EmptyCart} alt="" />
                <button
                  onClick={() => navigate("/")}
                  className="bg-brand-font-color hover:bg-amber-800 text-white text-sm mt-5 py-2 px-6 rounded-md"
                >
                  Go Shop
                </button>
              </div>
            </>
          )}

          <hr className="my-3 borde-1 border-brand-font-color" />
        </div>
        <div className="ml-14 mt-24 basis-1/4 text-brand-font-color">
          <hr className="my-3 borde-1 border-brand-font-color" />
          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>{rupiahFormat.convert(total)}</span>
          </div>
          <div className="flex justify-between">
            <span>Qty</span>
            <span>{qty}</span>
          </div>
          <hr className="my-3 borde-1 border-brand-font-color" />
          <div className="flex justify-between">
            <span className="font-[Avenir-Black]">Total</span>
            <span className="font-[Avenir-Black]">
              {rupiahFormat.convert(total)}
            </span>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleBuy}
              className="w-3/4 py-2 my-10 bg-brand-font-color hover:bg-amber-800 text-white rounded-md"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Delete Data
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this item on your
                            Cart??
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-9 py-2 bg-input-brown text-base font-medium text-white hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-8 py-2 bg-brand-font-color hover:bg-amber-800 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={deleteData}
                      ref={cancelButtonRef}
                    >
                      Yes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

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
              <div className="inline-block align-bottom bg-white text-brand-soft-font rounded-lg text-center overflow-hidden text-brand- py-8 px-9 shadow-xl transform transition-all md:mt-56 sm:my-28 sm:align-middle w-96">
                Thank you for ordering in us, please wait 1 x 24 hours to verify
                you order
                <div>
                  <button
                    onClick={() => {
                      navigate("/profile");
                    }}
                    className="bg-brand-font-color text-white text-sm mt-5 py-2 px-6 rounded-md"
                  >
                    Oke
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Cart;
