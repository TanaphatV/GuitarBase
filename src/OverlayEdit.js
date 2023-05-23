import React from 'react';
import Edit from './EditGuitar';

const OverlayEdit = ({onCloseOverlay,initialData}) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const exitButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div style={overlayStyle}>
      <span style={exitButtonStyle} onClick={onCloseOverlay}>X</span>
      {<Edit initialData={initialData}/>}
    </div>
  );
};

export default OverlayEdit;