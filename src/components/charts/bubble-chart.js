import Chart from "react-apexcharts";
import PropTypes from "prop-types";

export const BubbleChart = (props) => (
  <Chart options={props.options} series={props.series} type="bubble" />
);

BubbleChart.propTypes = {
  options: PropTypes.any,
  series: PropTypes.any.isRequired,
};
