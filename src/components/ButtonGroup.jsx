import { useState } from 'react';

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
            color: selected === button ? '#FFFFFF' : '#154884',
            backgroundColor: selected === button ? '#154884' : 'transparent',
            margin: '0 4px',
            width: `${buttonWidth}px`,
            padding: '8px 16px',
            border: '2px solid #154884',
            borderRadius: '10px',
            outline: 'none',
            cursor: 'pointer',
            fontWeight: "bold",
          }}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
