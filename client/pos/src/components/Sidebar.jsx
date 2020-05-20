import React, {useState} from "react";
import ItemQty from "./ItemQty";
import ItemName from "./ItemName";
import ItemPrice from "./ItemPrice";
import Order from "./Order";

const Sidebar = ({items, onChange, onReset, auth}) => {
  const [total, setTotal] = useState(0);

  const handleTotal = (est) => {
    setTotal(est);
  }

  const handleReset = () => {
    setTotal(0);
    onReset();
  }
  //Format Currency Local (use with currencyFormat.format() to return currency-based string)
  const currencyFormat = new Intl.NumberFormat ("en-US", {
    style: "currency", currency: "IDR",
  });

  return (
    <div className="sidebar">
      <div className="cart">
      <h2>Shopping Cart</h2>
        <ul className="table">
          <ul>
            <li>Item</li>
            <ItemName items={items}/>
          </ul>
          <ul>
            <li>Qty</li>
            <ItemQty onChange={onChange} items={items}/>
          </ul>
          <ul>
            <li>Price</li>
            <ItemPrice onChange={handleTotal} items={items}/>
          </ul>
        </ul>
      </div>
      <div className="checkout">
        <div>
          <hr />
          <h2>Total {currencyFormat.format(total) + " "}</h2>
        </div>
        <Order items={items} isDisabled={!total} onReset={handleReset} auth={auth}>Order</Order>
      </div>
    </div>
  );
};

export default Sidebar;
