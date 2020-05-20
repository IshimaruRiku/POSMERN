import React from "react";
import Minus from "./Minus";
import Plus from "./Plus";

const ItemQty = ({items, onChange}) => {

  return (
    items.map((item, index) =>
    <li key={index}>
    <Minus index={index} onChange={onChange}/>
    {item.qty}
    <Plus index={index} onChange={onChange}/>
    </li>)
  );
};

export default ItemQty;
