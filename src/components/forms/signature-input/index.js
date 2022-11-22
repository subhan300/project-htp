import React, { forwardRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./scss/index.scss";

const SignatureInput = (props, ref) => (
  <SignatureCanvas
    id="signature"
    penColor="#035d71"
    clearOnResize={false}
    canvasProps={{
      ...props,
      className: `sigCanvas`,
      id: "signature",
    }}
    ref={ref}
  />
);
export default forwardRef(SignatureInput);
