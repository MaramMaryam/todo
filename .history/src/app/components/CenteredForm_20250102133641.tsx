import React from 'react';

const CenteredForm = ({ children }: any) => {
  return (
    <div className='border border-gray-400 shadow-md place-items-center min-h-screen flex justify-center items-center w-full  rounded-md'
    //  style={{
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   height: '100vh', // Full viewport height
    // }}
    >
      {children}
    </div>
  );
};

export default CenteredForm;