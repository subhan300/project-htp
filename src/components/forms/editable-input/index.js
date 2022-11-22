import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { CloseOutlined } from "@ant-design/icons";
import "./scss/index.scss";

export const EditableInput = (props) => {
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState(props.text);
  const [prevText, setPrevText] = useState(text);

  function onClickOutSide(e) {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setPrevText(text);
      setInputVisible(false);
      // setInputVisible(false);
    }
  }
  return (
    <>
      {inputVisible ? (
        <div>
          <input
            ref={inputRef}
            defaultValue={props.defaultValue}
            value={text}
            className="input-editor p-1"
            name={props.name}
            onChange={(e) => {
              setText(e.target.value);
              props.onChange(e);
            }}
          />
          <div className="flex align-center  mt-1">
            <div className="save-btn-div">
              <button
                className="save-btn p-2 pl-3 pr-3"
                onClick={(e) => onClickOutSide(e)}
              >
                Save
              </button>
            </div>
            <div className="save-btn-div p-2">
              <CloseOutlined
                size="large"
                onClick={(e) => {
                  setText(prevText);

                  setPrevText(text);
                  onClickOutSide(e);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <span
          className={`break-all  user-information-modal-title `}
          onClick={() => {
            setInputVisible(true);
          }}
        >
          {text || props.defaultValue}
        </span>
      )}
    </>
  );
};

EditableInput.propTypes = {
  text: PropTypes.any,
  defaultValue: PropTypes.any,
  name: PropTypes.any,
  inputVisible: PropTypes.bool,
  setInputVisible: PropTypes.func,
  onChange: PropTypes.func,
};
