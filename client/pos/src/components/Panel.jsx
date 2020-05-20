import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Section from "./Section";

const Panel = ({auth}) => {
  const [items, setItems] = useState([]);

  function insertItem(newItem){
    setItems(initialValue => {
      for(let i = 0; i < initialValue.length; i++){
        if(initialValue[i].name === newItem.name){
          return [...initialValue];
        }
      }
      return [...initialValue, newItem];
    });
  };

  function resetItem(){
    setItems([]);
  }

  function changeQty(id, changeType){
    if(changeType === "remove"){
      setItems(initialValue => {
        if(initialValue[id].qty - 1 === 0){
          const newValue = initialValue.filter((value, index) => index !== id)
          return newValue;
        } else {
          const newValue = initialValue.map((value, index) => {
            if(index === id){
              return {...value, qty: value.qty - 1};
            } else return value;
          });
          return newValue;
        }
      })
    }
    else {
      setItems(initialValue => {
        const newValue = initialValue.map((value, index) => {
          if(index === id){
            return {...value, qty: value.qty + 1};
          } else return value;
        });
        return newValue;
      });
    }
  };

  return (
    <div className="panel">
      <Sidebar onChange={changeQty} items={items} onReset={resetItem} auth={auth}/>
      <Section onInsert={insertItem}/>
    </div>
  );
};

export default Panel;
