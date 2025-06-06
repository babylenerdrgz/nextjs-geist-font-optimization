import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SignIn_LeftSection from '/src/components/HomePage/SignIn_LeftSection';
import SignIn_RightSection from '/src/components/HomePage/SignIn_RightSection';
import Admin_SignIn_Form from '/src/components/SignInPage/Admin_SignIn/Admin_SignIn_Form';
import Admin_SignIn_Disclaimer_Page from '/src/components/SignInPage/Admin_SignIn/Admin_SignIn_Disclaimer_Page';
import Admin_FacialVerification_Page from '/src/components/SignInPage/Admin_SignIn/Admin_FacialVerification_Page';

function Admin_SignIn_Page() {
  const [currentPage, setCurrentPage] = useState("admin_signIn_form");
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentPage === "admin_signIn_form") {
      setCurrentPage("admin_signIn_disclaimer");
    } else if (currentPage === "admin_signIn_disclaimer") {
      setCurrentPage("admin_signIn_facialVerification");
    } else if (currentPage === "admin_signIn_facialVerification") {
      // After the facial verification step, navigate to the chat page
      navigate('/admin/chat');
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="w-1/2 bg-blue text-center tracking-wider text-white">
          {currentPage === "admin_signIn_facialVerification" || currentPage === "admin_signIn_disclaimer" ? (
            // New content for Facial Verification Page
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="tracking-wider font-bold text-5xl mt-28">Welcome Back To</h1>
              <img
                alt="Face Scan"
                src="/src/assets/images/commNEUnicate_White.png"
                className="w-[550px] h-[550px] object-contain"
              />
            </div>
          ) : (
            // Original content for Sign-in & Disclaimer pages
            <SignIn_LeftSection />
          )}
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-white tracking-wider px-0 py-8">
        
          <h1
            className={` ${currentPage === "admin_signIn_disclaimer" || currentPage === "admin_signIn_facialVerification"
                ? "text-wrap text-2xl font-bold px-16"  // Change text color & animation during verification
                : "text-blue text-center font-bold text-3xl leading-snug pt-12"
            }`}
          >
            {(currentPage === "admin_signIn_disclaimer" || currentPage === "admin_signIn_facialVerification") && (
              <>Log in as <span className="text-blue block">Admin</span></>
            )}
          </h1>

          {currentPage === "admin_signIn_form" && <SignIn_RightSection />}

          {/* Form sections */}
          <div className="justify-center px-8 lg:px-8">
            {currentPage === "admin_signIn_form" && <Admin_SignIn_Form nextStep={nextStep} />}
            {currentPage === "admin_signIn_disclaimer" && <Admin_SignIn_Disclaimer_Page nextStep={nextStep} />}
            {currentPage === "admin_signIn_facialVerification" && <Admin_FacialVerification_Page navigate={navigate} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_SignIn_Page;
