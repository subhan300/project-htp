import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./scss/index.scss";
export const OtpInput = ({ length, loading, onComplete }) => {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef([]);
  const processInput = (e, slot) => {
    const num = e.target.value;
    /[^0-9]/.test(num) && null;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    slot !== length - 1 ? inputs.current[slot + 1].focus() : null;
    newCode.every((num) => num !== "") ? onComplete(newCode.join("")) : null;
  };
  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };
  return (
    <div>
      <div className="code-inputs">
        {code.map((num, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={num}
            autoFocus={!code[0].length && idx === 0}
            readOnly={loading}
            onChange={(e) => processInput(e, idx)}
            onKeyUp={(e) => onKeyUp(e, idx)}
            ref={(ref) => inputs.current.push(ref)}
            placeholder="-"
          />
        ))}
      </div>
    </div>
  );
};
OtpInput.propTypes = {
  length: PropTypes.any,
  loading: PropTypes.bool,
  onComplete: PropTypes.func,
};
