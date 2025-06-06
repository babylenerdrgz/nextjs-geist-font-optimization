import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { FaUserGraduate } from "react-icons/fa";

function Student_LogIn_Button() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  // Check if the current page matches the admin sign-in route
  useEffect(() => {
    setIsActive(location.pathname === "/student/signIn");
    }, [location.pathname]);

  const goToStudentSignInPage = () => {navigate('/student/signIn');};

  return (
      <button onClick={goToStudentSignInPage}
              className={`flex items-center space-x-2 transition duration-100 
                          ${isActive ? 'text-blue' : 'text-gray'} group`}
      >
        <FaUserGraduate className={`text-2xl transition duration-100 
                                  ${isActive ? 'text-blue' : 'text-gray'} group-hover:text-blue`} 
        />
        <span className={`text-lg font-normal underline underline-offset-8 transition duration-100 
                          ${isActive ? 'text-blue' : 'text-gray'} group-hover:text-blue`}
        >
          Student
        </span>
      </button>
          );
  }
  

export default Student_LogIn_Button;