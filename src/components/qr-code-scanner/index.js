import React from "react";
import { QrReader } from "react-qr-reader";
import { PropTypes } from "prop-types";

export const QrCodeScanner = (props) => {
  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            props.setData(result?.text);
          }
          if (error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      />
      {/* <p>{props.data}</p> */}
    </>
  );
};
QrCodeScanner.propTypes = {
  data: PropTypes.any,
  setData: PropTypes.func,
};
