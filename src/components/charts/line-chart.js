import Chart from "react-apexcharts";
import PropTypes from "prop-types";
export const LineChart = (props) => (
  <Chart options={props.options} series={props.series} type="line" />
);
LineChart.propTypes = {
  series: PropTypes.array.isRequired,
  options: PropTypes.object,
};
