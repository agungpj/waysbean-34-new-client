import React, {
  useState,
  useContext,
  useEffect,
  Fragment,
  useRef,
} from "react";
import AdminTransaction from "../../dummyDatabase/AdminTransaction";
import { Dialog, Transition } from "@headlessui/react";
import { Footer, Navbar } from "../../exports";

import { API } from "../../config/api";
import { Cencel, Success } from "../../exports/exportImages";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const title = "Transactions";
  document.title = "WaysBeans | " + title;

  const navigate = useNavigate();
  const [openUpdateTransaction, setOpenUpdateTransaction] = useState(false);
  const cancelButtonRef = useRef(null);

  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await API.get("/transactionsall", config);
      setTransactions(response.data.data);
      console.log(response.data.data.products.length);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({ status: status });
      const response = await API.patch(`/transaction/${id}`, body, config);
      setOpenUpdateTransaction(true);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  function Action(props) {
    let component;

    if (props.props.status == "pending") {
      component = (
        <>
          <button
            className="md:m-1 bg-btn-cencel text-white md:px-3 py-1 rounded-md"
            onClick={() => {
              updateStatus(props.props.id, "cancel");
            }}
          >
            Cancel
          </button>
          <button
            className="md:m-1 bg-btn-approve text-white md:px-3 py-1 rounded-md"
            onClick={() => {
              updateStatus(props.props.id, "on the way");
            }}
          >
            Approve
          </button>{" "}
        </>
      );
    } else if (props.props.status == "cancel") {
      component = (
        <div className="flex flex-col">
          <img className="w-5 mx-24" src={Cencel} />
        </div>
      );
    } else if (props.props.status == "success") {
      component = (
        <div className="flex flex-col">
          <img className="w-5 mx-24" src={Success} />
        </div>
      );
    } else {
      component = (
        <div className="flex flex-col">
          <img className="w-5 mx-24" src={Success} />
        </div>
      );
    }
    return component;
  }

  function Status(props) {
    let component;

    if (props.props == "pending") {
      component = (
        <td className="text-brand-soft-font flex flex-col items-center text-center mx-2">
          {props.props}
        </td>
      );
    } else if (props.props == "cancel") {
      component = (
        <td className="text-red-700 flex flex-col items-center text-center mx-2">
          {props.props}
        </td>
      );
    } else if (props.props == "success") {
      component = (
        <td className="text-green-700 flex flex-col items-center text-center mx-2">
          {props.props}
        </td>
      );
    } else {
      component = (
        <td className="text-blue-700 flex flex-col items-center text-center">
          {props.props}
        </td>
      );
    }
    return component;
  }

  return (
    <div>
      <Navbar />
      <div className="">
        <div className="font-bold font-['Avenir-Black'] text-brand-font-color text-3xl mt-14 mb-6 mx-32">
          <h1>Income transaction</h1>
        </div>
        {/* Table */}
        <div className="transactionWrapp md:w-10/12 md:m-auto md:mt-12">
          <div>
            <table className="md:w-full text-center md:mb-20">
              <thead className="bg-gray-200 text-gray-600 border border-gray-300 font-bold ">
                <tr>
                  <td className="px-2 border border-collapse">No</td>
                  <td className="md:py-3 border border-collapse">Name</td>
                  <td className="border border-collapse">Address</td>
                  <td className="border border-collapse">Post Code</td>
                  <td className="border border-collapse">Product Order</td>
                  <td className="border border-collapse">Status</td>
                  <td className="border border-collapse">Action</td>
                </tr>
              </thead>
              {transactions.map((items, index) => (
                <tbody>
                  <tr>
                    <td className="border border-collapse">{index + 1}</td>
                    <td className="md:py-3 border border-collapse">
                      {items.buyer.name}
                    </td>
                    <td className="border border-collapse py-3 px-2">
                      {items.profile.address}
                    </td>
                    <td className="border border-collapse">
                      {items.profile.postcode}
                    </td>
                    <td className="border border-collapse">
                      {items.products.length !== 1 ? (
                        <div>
                          {items.products?.map(
                            (product) => `${product.name}, `
                          )}
                        </div>
                      ) : (
                        <div>
                          {items.products?.map((product) => `${product.name}`)}
                        </div>
                      )}
                    </td>
                    <td className="border border-collapse">
                      <Status props={items.status} />
                    </td>
                    <td className="border border-collapse w-52">
                      <Action props={items} />
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
      <Footer />
      <Transition.Root show={openUpdateTransaction} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpenUpdateTransaction}
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
                Status Update
                <div>
                  <button
                    onClick={() => {
                      navigate("/product");
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

export default AdminDashboard;
