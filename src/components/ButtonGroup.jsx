import { useState } from 'react';

const statuses = [
  
  { text: "Present", color: '#14ae5c' },
  { text: "Late", color: '#FFC13C' },
  { text: "Absent" , color: '#C72027' }
];

const ButtonGroup = ({ color }) => {
  const [selected, setSelected] = useState("Present");

  const buttons = ['Present', 'Late', 'Absent'];
  const buttonWidth = 100;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {buttons.map((button, idx) => (
        <button
          key={idx}
          onClick={() => setSelected(button)}
          style={{
            color: selected === button ? '#FFFFFF' : statuses[idx].color,
            backgroundColor: selected === button ? statuses[idx].color : 'transparent',
            margin: '0 4px',
            width: `${buttonWidth}px`,
            padding: '8px 16px',
            border: '2px solid',
            borderColor: statuses[idx].color,
            borderRadius: '10px',
            outline: 'none',
            cursor: 'pointer',
            fontWeight: "bold",
            opacity: selected === button ? '1': '0.7'
          }}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
