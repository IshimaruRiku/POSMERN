import React from "react";

const Setting = ({auth}) => {
  return auth.role === 1 ? <li name="setting" hidden={!auth.type && auth.role !== 1}>Setting</li>
   : <li name="setting" hidden={!auth.type}><a href="#">Profile</a></li>
}

export default Setting;
