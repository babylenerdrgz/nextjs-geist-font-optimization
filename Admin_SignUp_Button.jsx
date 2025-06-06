import React from 'react';
import { useNavigate } from 'react-router-dom';

function Admin_SignUp_Button() {
  const navigate = useNavigate();

  const goToAdminSignUpPage = () => {
    navigate('/admin/signUp');
  };

  return (
      <div className="">
      
      <p className="text-center text-gray text-sm">
          Don't have an account? <a onClick={goToAdminSignUpPage} className="cursor-pointer text-blue">Sign Up</a>
        </p>
    </div>
    
    
  );
}

export default Admin_SignUp_Button;
