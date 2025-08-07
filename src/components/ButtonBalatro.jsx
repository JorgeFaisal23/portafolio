import { useEffect } from 'react';
import Balatro from 'balatrobutton';
import 'balatrobutton/style'; 

export default function ButtonBalatro({ children, onClick, power = 500 }) {
  useEffect(() => {
    new Balatro({
      selector: '.balatro-btn',
      power: () => power,
      score: 0,
      colorStart: '#f00',
      colorMid: '#f50',
      colorEnd: '#ff0'
    });
  }, [power]);

  return (
    <button
      className="balatro-btn"
      onClick={onClick}
    >
      {children}
    </button>
  );
}