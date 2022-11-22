import Chart from "react-apexcharts";
import PropTypes from "prop-types";
export const DoughNut = (props) => (
  <Chart
    width="75%"
    options={props.options}
    series={props.series}
    type="donut"
  />
);
DoughNut.propTypes = {
  series: PropTypes.array.isRequired,
  options: PropTypes.object,
};
