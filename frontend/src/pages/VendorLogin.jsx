import React from "react";
import Login from "../components/Login";


function VendorLogin() {
  return (
    <Login
      heading="Vendor Login"
      apiEndpoint="http://localhost:5000/api/vendors/login"
      redirectPath="/vendor"
      role="vendor"
    />
  );
}

export default VendorLogin;
