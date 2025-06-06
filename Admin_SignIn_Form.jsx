import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '/src/Firebase/firebase';

import Admin_SignUp_Button from '/src/components/HomePage/Admin_SignUp_Button';
import Admin_SignIn_Google_Button from '/src/components/SignInPage/Admin_SignIn/Admin_SignIn_Google_Button';

const Admin_SignIn_Form = ({ nextStep }) => {
  const navigate = useNavigate();

  
  const handleContinue = async (e) => {
    e.preventDefault();
    
    
    setIsChecking(true);
    
    try {
      // Check if email exists in Firestore
      const adminUsersRef = collection(db, 'adminUsers');
      const q = query(adminUsersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // No user found with this email
        setEmailError('Account doesn\'t exist. Please sign up first.');
        
        // Wait a moment before redirecting to sign-up page
        setTimeout(() => {
          navigate('/admin/signUp');
        }, 2000);
        
        return;
      }
      
      // Email exists, store it for next steps
      localStorage.setItem('tempAuthEmail', email);
      
      // Continue to next step (password/verification)
      nextStep();
    } catch (error) {
      console.error("Error checking email existence:", error);
      setEmailError('An error occurred. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="pt-20">
      
       {/* Google Login Button - Make sure we pass nextStep */}
        <div className="px-24">
          <Admin_SignIn_Google_Button nextStep={nextStep} />
        </div>
  
        {/* Sign In Link */}
        <div className="py-8">
          <Admin_SignUp_Button />
        </div>
      
    </div>
  );
}

export default Admin_SignIn_Form;