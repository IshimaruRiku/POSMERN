import React from "react";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

const Minus = ({index, onChange}) => {
  function removeQty(){
    onChange(index, "remove");
  }
  return <IndeterminateCheckBoxIcon onClick={removeQty} className="normal-font"/>;
}

export default Minus;
