import React from "react";

const ItemPrice = ({onChange, items}) => {
  let totalPrice = 0;
  return items.map((item, index) => {
    totalPrice += item.price*item.qty;
    onChange(totalPrice);
    return <li key={index}>{item.price*item.qty}</li>;
  });
}

export default ItemPrice;
