import React from 'react';

const CenteredForm = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
    }}>
      {children}
    </div>
  );
};

export default CenteredForm;