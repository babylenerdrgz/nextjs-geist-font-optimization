import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiAdminFill } from "react-icons/ri";

function Admin_LogIn_Button() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current route is "/" or "/admin/signin"
  const isActive = location.pathname === "/" || location.pathname === "/admin/signIn";

  const goToAdminSignInPage = () => {
    navigate('/admin/signIn');
  };

  return (
    <button
      onClick={goToAdminSignInPage}
      className={`flex items-center space-x-2 transition duration-100
                 ${isActive ? 'text-blue' : 'text-gray'} group`}
    >
      <RiAdminFill 
        className={`text-2xl transition duration-100 
                   ${isActive ? 'text-blue' : 'text-gray'} group-hover:text-blue`} 
      />
      <span 
        className={`text-lg font-normal underline underline-offset-8 transition duration-100 
                    ${isActive ? 'text-blue' : 'text-gray'} group-hover:text-blue`}
      >
        Admin
      </span>
    </button>
  );
}

export default Admin_LogIn_Button;
