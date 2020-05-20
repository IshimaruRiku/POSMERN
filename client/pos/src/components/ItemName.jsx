import React from "react";

const ItemName = ({items}) => {
  return items.map((item, index) =>
    <li key={index}>{item.name}</li>);;
}

export default ItemName;
