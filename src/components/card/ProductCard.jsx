import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const { name, price, qty, image } = item;

  return (
    <Link to={`/detail-product/${item.id}`}>
      <div className="relative mb-10 w-64 bg-card-color">
        <div>
          <img src={image} alt="img" className="w-full h-80" />
        </div>
        <div className="py-3 pl-4">
          <h4 className="font-['Avenir-Black'] text-lg mb-4">{name}</h4>
          <p>Rp {price} </p>
          <p>Stock : {qty} </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
