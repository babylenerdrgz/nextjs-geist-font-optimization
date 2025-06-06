import React from "react";

import Admin_LogIn_Button from './Admin_LogIn_Button';
import Student_LogIn_Button from './Student_LogIn_Button';

const RightSection = () => {
  return (
        <div>
          <div className="px-8 pt-16">
            <h1 className="text-blue text-center font-bold text-3xl leading-snug">
              Login your account
            </h1>
    
            {/* Divider */}
            <div className="flex items-center py-6 pt-12 px-24">
              <hr className="flex-grow border-gray" />
              <span className="px-2 text-gray">AS</span>
              <hr className="flex-grow border-gray" />
            </div>
    
            <div className="flex items-center tracking-wider justify-evenly w-full pt-12">
              <Admin_LogIn_Button />
              <Student_LogIn_Button />
            </div>
          </div>
        </div>
  );
};

export default RightSection;
