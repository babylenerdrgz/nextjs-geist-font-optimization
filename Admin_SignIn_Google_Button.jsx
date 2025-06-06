import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { handleGoogleAuth } from '/src/utils/authUtils';

function Admin_SignIn_Google_Button({ nextStep }) {
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    if (isProcessing) return; // Prevent multiple clicks
    setIsProcessing(true);

    // Use the shared Google auth handler
    await handleGoogleAuth(
      'admin', // Role
      (email, isProfileComplete) => {
        // Success handler
        if (isProfileComplete === false) {
          // Redirect to profile setup if profile is not complete
          navigate('/admin/setupProfile');
        } else {
          // Profile is complete, proceed to the next step (chat page)
          nextStep();  // Trigger the next step (e.g., redirect to chat)
        }
        setIsProcessing(false);
      },
      (errorMessage, existingRole) => {
        // Error handler
        setError(errorMessage);
        setIsProcessing(false);

        // If account exists as another role, redirect after a delay
        if (existingRole && existingRole !== 'admin') {
          setTimeout(() => {
            navigate(`/${existingRole}/signIn`);
          }, 3000);
        }
      },
      true // isSignIn = true (this is sign-in)
    );
  };

  return (
    <>
      {error && (
        <div className={`px-4 py-3 rounded mb-4 ${error.includes("doesn't exist") 
          ? "bg-yellow-100 border border-yellow-400 text-yellow-700" 
          : "bg-red-100 border border-red-400 text-red-700"}`}>
          {error}
        </div>
      )}
      <button 
        onClick={handleGoogleSignIn}
        disabled={isProcessing}
        className="w-full flex items-center justify-center space-x-2 border border-gray py-2 rounded-md transition hover:bg-gray-100 disabled:opacity-70"
      >
        <FcGoogle size={24} />
        <span className="text-gray">{isProcessing ? "Processing..." : "Continue With Google"}</span>
      </button>
    </>
  );
}

export default Admin_SignIn_Google_Button;
