import React from "react";

const CenteredForm = ({ children }: any) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="border border-gray-400 shadow-md place-items-center    rounded-md">
        {children}
      </div>
    </div>
  );
};

export default CenteredForm;
