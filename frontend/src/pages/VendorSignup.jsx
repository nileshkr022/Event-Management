import React from "react";
import Signup from "../components/Signup";

function VendorSignup() {
  return (
    <Signup
      heading="Vendor Sign Up"
      apiEndpoint="http://localhost:5000/api/vendors"
      redirectPath="/vendor"
      loginPath="/vendor-login"
    />
  );
}

export default VendorSignup;
