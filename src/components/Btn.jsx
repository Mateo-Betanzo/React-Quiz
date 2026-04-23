import React from 'react';

export function Btn({ texto, style, onClick, yaRespondio }) {
  return (
    <button
      // Recibe la clase base 'btn' y le suma la clase dinámica que le manda App ('active' o 'no-army')
      className={`btn-normal ${style}`} 
      onClick={onClick}
      disabled={yaRespondio}
    >
      {texto}
    </button>
  );
}