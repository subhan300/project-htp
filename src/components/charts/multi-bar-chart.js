import Chart from "react-apexcharts";
import PropTypes from "prop-types";

export const MultiBarChart = (props) => (
  <Chart options={props.options} series={props.series} type="bar" />
);

MultiBarChart.propTypes = {
  options: PropTypes.any,
  series: PropTypes.any.isRequired,
};
