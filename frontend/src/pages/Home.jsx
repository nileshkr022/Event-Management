import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Home() {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleUserClick = () => {
    navigate("/user-login"); 
};

const handleAdminClick = () => {
    navigate("/admin-login"); 
};

const handleVendorClick = () => {
    navigate("/vendor-login"); 
};

const handleUserSignupClick = () => {
    navigate("/user-signup");
};

const handleVendorSignupClick = () => {
    navigate("/vendor-signup");
};

  const handleDashboard = () => {
    if (user) {
      console.log(user);
      
      // Redirect to the appropriate dashboard
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "vendor") navigate("/vendor");
      else if (user.role === "user") navigate("/user");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
    <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8"> 
        <div className="text-2xl font-bold text-center mb-6"> Event Management System </div> 
      {user ? (
        <div className="text-center">
          <h1 className="text-xl font-bold">Welcome back, {user.name}!</h1>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
            onClick={handleDashboard}
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
         <div className="flex flex-col space-y-4"> 
                    <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-150 ease-in-out" onClick={handleAdminClick}> 
                        Admin Login </button> 
                    <div className="grid grid-cols-2 gap-4">
                        <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-150 ease-in-out" onClick={handleUserClick}>
                            User Login </button> 
                        <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition duration-150 ease-in-out" onClick={handleUserSignupClick}>
                            User Signup </button> 
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-150 ease-in-out" onClick={handleVendorClick}> 
                            Vendor Login </button> 
                        <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition duration-150 ease-in-out" onClick={handleVendorSignupClick}> 
                            Vendor Signup </button> 
                    </div>
                 </div> 
      )}
    </div>
    </div>
  );
}

export default Home;
