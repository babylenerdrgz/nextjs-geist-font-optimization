import React from "react";

const LeftSection = () => {
  return (
    <div>
          <div>
            <img
              alt="commNEUnicate"
              src="/src/assets/images/small_commNEUnicate_white.png"
              className="absolute w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto object-contain p-5"
            />
          </div>

          <div>
            <h1 className="font-bold text-6xl leading-snug pt-40">
              Welcome To commNEUnicate
            </h1>
          </div>

          <div>
            <p className="text-lg pt-44">
              Authenticate, engage, and collaborate.<br />
              Let’s make it happen with commNEUnicate!
            </p>
          </div>
    </div>
  );
};

export default LeftSection;
