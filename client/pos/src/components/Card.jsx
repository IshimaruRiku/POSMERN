import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";

function Card(props){
  const [product, setProduct] = useState({
    _id: props.id,
    name: props.name,
    qty: props.qty,
    price: props.price
  });

  function clickItem(event){
    event.preventDefault();
    props.onClick(product);
  };

  return (
    <div className="card">
      <a href="/" onClick={clickItem}>
      <img className="product-image" src="/product-default.jpg" alt={props.name} name={product.name}/>
      <div className="product">
        <p>{product.name}</p>
        <p>{props.description}</p>
        <hr />
        <p className="price">IDR {product.price}</p>
      </div>
      </a>
    </div>
  );
};

export default Card;
