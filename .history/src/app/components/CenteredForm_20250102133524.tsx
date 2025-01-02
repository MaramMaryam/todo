import React from 'react';

const CenteredForm = ({ children }: any) => {
  return (
    <div className='border border-gray-400 shadow-md place-items-center  flex justify  rounded-md'
     style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    //   height: '100vh', // Full viewport height
    }}>
      {children}
    </div>
  );
};

export default CenteredForm;