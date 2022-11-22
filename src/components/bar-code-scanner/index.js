import React, { useCallback, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import Quagga from "@ericblade/quagga2";

export default function Scanner(props) {
  const [state, setState] = useState({
    results: [],
  });
  const onDetected = useCallback(
    (result) => {
      let code = result.codeResult.code;
      setState({ results: [...state.results, code] });

      if (state.results.length > 10) {
        props.onDetected(state.results);
      }
    },
    [props, state.results]
  );
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          constraints: {
            width: 640,
            height: 200,
            facingMode: "environment",
            deviceId: "7832475934759384534",
          },
          area: {
            // defines rectangle of the detection/localization area
            top: "0%", // top offset
            right: "0%", // right offset
            left: "0%", // left offset
            bottom: "0%", // bottom offset
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            // "ean_reader",
            // "ean_8_reader",
            // "code_39_reader",
            // "code_39_vin_reader",
            // "codabar_reader",
            // "upc_reader",
            // "upc_e_reader",
            // "i2of5_reader",
            // "2of5_reader",
            // "code_93_reader",
            // "code_32_reader",
          ],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true,
          },
        },

        line: [
          {
            x: 25.97278706156836,
            y: 360.5616435369468,
          },
          {
            x: 401.9220519377024,
            y: 70.87524989906444,
          },
        ],
        angle: -0.6565217179979483,
        pattern: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
          /* ... */ 1,
        ],
        box: [
          [77.4074243622672, 410.9288668804402],
          [0.050203235235130705, 310.53619724086366],
          [360.15706727788256, 33.05711026051813],
          [437.5142884049146, 133.44977990009465],
        ],
        boxes: [
          [
            [77.4074243622672, 410.9288668804402],
            [0.050203235235130705, 310.53619724086366],
            [360.15706727788256, 33.05711026051813],
            [437.5142884049146, 133.44977990009465],
          ],
          [
            [248.90769330706507, 415.2041489551161],
            [198.9532321622869, 352.62160512937635],
            [339.546160777576, 240.3979259789976],
            [389.5006219223542, 302.98046980473737],
          ],
        ],
      },
      function (err) {
        if (err) {
          return console.error(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(onDetected);
    return () => Quagga.offDetected(onDetected);
  }, [onDetected]);

  return (
    <React.Fragment>
      <p>{state.results.length <= 10 ? state.results.length : "10"} / 10</p>
      <div id="interactive" className="viewport" />
    </React.Fragment>
  );
}
Scanner.propTypes = {
  onDetected: PropTypes.func,
};
