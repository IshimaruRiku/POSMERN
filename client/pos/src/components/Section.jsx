import React, { useState, useEffect } from "react";
import Card from "./Card";
const axios = require("axios");

const Section = ({onInsert}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function fetchData(){
      const result = await axios.get("http://127.0.0.1:8000/products");
      if(!ignore) setProducts(result.data);
    }
    fetchData();
    return () => {ignore = true}
  },[]);

  return (
    <div className="section">
      <div className="menu">
        <div className="category">
        </div>

        <div className="filter">
        </div>

      </div>
      <div className="content">
        {products.map(product => {
          return <Card key={product._id} id={product._id} onClick={onInsert} name={product.name} qty={1} price={product.price}/>
        })}
      </div>
    </div>
  );
};

export default Section;
