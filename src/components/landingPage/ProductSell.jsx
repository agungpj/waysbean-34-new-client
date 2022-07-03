import React, { useState, useEffect } from "react";
import ProductCard from "../card/ProductCard";
// import Menu from "../../dummyDatabase/Menu";

import { API } from "../../config/api";

const ProductSell = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      // Store product data to useState variabel
      setProducts(response.data.data.listProduct);
      console.log(response.data.data.listProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mx-4 lg:ml-32 lg:mr-24 my-2 lg:my-10 relative">
      <div className="product-list flex flex-wrap justify-center lg:justify-start mb-20 text-brand-font-color">
        {products.map((item, index) => (
          <div className="lg:mr-6">
            <ProductCard key={index} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSell;
