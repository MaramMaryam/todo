import React from "react";

const CenteredForm = ({ children }: any) => {
  return (
    <div>
      <div className="border border-gray-400 shadow-md place-items-center    rounded-md">
        {children}
      </div>
    </div>
  );
};

export default CenteredForm;
