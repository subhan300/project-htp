import Chart from "react-apexcharts";
import PropTypes from "prop-types";
export const BarChart = (props) => (
  <Chart
    width="100%"
    options={props.options}
    series={props.series}
    type="bar"
  />
);
BarChart.propTypes = {
  series: PropTypes.array.isRequired,
  options: PropTypes.object,
};
