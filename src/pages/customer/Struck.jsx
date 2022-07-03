import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";
import { Navbar } from "../../exports";
import { LogoHomePage } from "../../exports/exportImages";
import rupiahFormat from "rupiah-format";

const Struck = () => {
  const [struct, setStruct] = useState({});
  const [products, setProducts] = useState([]);
  let { id } = useParams();
  const getStruct = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };

      const response = await API.get("/transactionstruct/" + id, config);
      // Store product data to useState variabel
      setStruct(response.data.struct.data);
      setProducts(response.data.struct.products);
      console.log(response.data.struct.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStruct(id);
  }, []);
  return (
    <div className="flex justify-center h-screen items-center bg-gray-100">
      <div className="bg-white shadow-md px-6 py-10 text-sm  text-gray-500">
        <div className="text-center mx-16">
          <p>WaysBeans || Indonesia</p>
          <p>Jl.KH Encep Nawawi No.27</p>
          <p>Bubulak, Bogor Barat</p>
          <p>081229474378</p>
        </div>
        <div className="hr-dash">
          <hr className="my-3" />
        </div>
        <div>
          <p>Kode Struk : {struct.id}</p>
          <p>Tanggal : {struct.createdAt}</p>
        </div>
        <div className="hr-dash">
          <hr className="my-3" />
        </div>
        {/* {products.map((item, index) => ( */}
        {products.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <div className="">
                <p>{item.name}</p>
              </div>
              <div className="flex">
                <p className="mr-8">x{item.producttransaction.qty}</p>
                <p>{item.price * item.producttransaction.qty}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="hr-dash">
          <hr className="my-3" />
        </div>
        <div className="flex justify-between mb-5">
          <p>Total :</p>
          <p>{rupiahFormat.convert(struct.price)}</p>
        </div>
        <div className="text-center">
          <p>WaysBeans Murah Berkualitas</p>
        </div>
        <div className="hr-dash">
          <hr className="my-3" />
        </div>
        <div className="flex justify-center">
          <img src={LogoHomePage} className="w-20 mt-5" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Struck;
