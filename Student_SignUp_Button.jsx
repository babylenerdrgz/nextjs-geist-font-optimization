import React from 'react';
import { useNavigate } from 'react-router-dom';

function Student_SignUp_Button() {
  const navigate = useNavigate();

  const goToStudentSignUpPage = () => {
    navigate('/student/signUp');
  };

  return (
      <div className="">
      
      <p className="text-center text-gray text-sm">
          Don't have an account? <a onClick={goToStudentSignUpPage} className="cursor-pointer text-blue">Sign Up</a>
        </p>
    </div>
    
    
  );
}

export default Student_SignUp_Button;
