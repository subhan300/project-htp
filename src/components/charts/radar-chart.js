import Chart from "react-apexcharts";
import PropTypes from "prop-types";
export const RadarChart = (props) => (
  <Chart options={props.options} series={props.series} type="radar" />
);
RadarChart.propTypes = {
  series: PropTypes.array.isRequired,
  options: PropTypes.any,
};
