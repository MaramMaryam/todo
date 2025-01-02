import React from "react";

const CenteredForm = ({ children }: any) => {
  return (
    <div className="flex justify-center place-items-center content-center items-center min-h-screen ">
      <div className="border border-gray-400 shadow-md place-items-center  items-center lg:w-5/12 rounded-md py-5">
        {children}
      </div>
    </div>
  );
};

export default CenteredForm;
