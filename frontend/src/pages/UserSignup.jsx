import React from "react";
import Signup from "../components/Signup";

function UserSignup() {
  return (
    <Signup
      heading="User Sign Up"
      apiEndpoint="http://localhost:8080/api/users"
      redirectPath="/user"
      loginPath="/user-login"
    />
  );
}

export default UserSignup;
