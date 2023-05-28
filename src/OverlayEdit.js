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

  return (
    <div style={overlayStyle}>

      {<Edit initialData={initialData} handleCloseOverlay={onCloseOverlay}/>}
    </div>
  );
};

export default OverlayEdit;