import React from "react";

import { IoIosArrowForward } from "react-icons/io";

const Admin_SignIn_Disclaimer_Page = ({ nextStep }) => {
  return (
    <div className="tracking-wider w-full px-12 mt-10">
      <h2 className="text-center text-2xl font-bold">DISCLAIMER</h2>
      <p className="text-center mt-4">
        To ensure accurate facial recognition, please note the following:
      </p>

      <div className="bg-blue text-white mt-8 p-14 rounded-2xl">

        <div className="flex items-center">
          <span className="w-7 h-7 flex items-center justify-center rounded-full border-2">1</span> 
          <span className="text-lg font-bold pl-4">Good Lighting</span>    
        </div>
        <p className="text-sm pl-12 pb-10">For accurate facial recognition during login,
                                           please avoid poor lighting conditions, excessive brightness, or backlighting.
        </p>

        <div className="flex items-center">
          <span className="w-7 h-7 flex items-center justify-center rounded-full border-2">2</span> 
          <span className="text-lg font-bold pl-4">Look Straight</span>    
        </div>
        <p className="text-sm pl-12">Maintain a straight posture and face forward while logging in, avoiding any upward,
                                     downward, or sideways head movements to ensure a clear capture of your facial features.
        </p>
          
      </div>

      <div className="flex justify-between pt-10">
        <button onClick={nextStep} type="button" className="w-full px-2.5 py-2 rounded bg-blue text-sm text-white flex justify-center items-center gap-2 hover:bg-indigo hover:text-black">
          Proceed to Facial Verification
          <IoIosArrowForward />  
        </button>
      </div>
    </div>
  );
};

export default Admin_SignIn_Disclaimer_Page;
