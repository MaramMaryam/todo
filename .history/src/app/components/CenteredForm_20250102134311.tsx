import React from 'react';

const CenteredForm = ({ children }: any) => {
  return (
  <div>
    <div   <div className='border border-gray-400 shadow-md place-items-center  flex justify-center items-center w-full  rounded-md'
    >
  </div>
      {children}
    </div>
  );
};

export default CenteredForm;