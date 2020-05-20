import React from "react";
import AddBoxIcon from '@material-ui/icons/AddBox';

const Plus = ({index, onChange}) => {
  function addQty(){
    onChange(index, "add");
  }

  return <AddBoxIcon onClick={addQty} className="normal-font"/>
}

export default Plus;
