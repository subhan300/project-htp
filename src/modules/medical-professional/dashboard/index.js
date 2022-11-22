import React, { useEffect } from "react";
import { Card, Divider } from "antd";
import {
  DateRangeInput,
  DoughNut,
  BarChart,
  LineChart,
} from "../../../components";
import "./scss/index.scss";
import "../../../app.scss";
import { CustomerServiceOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { chartsAction } from "../../../store/actions";

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
export const data = {
  datasets: [
    {
      label: "Red dataset",
      data: Array.from({ length: 8 }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 5,
      })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const Dashboard = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(chartsAction.getMedicalProfeesionalCharts());
    dispatch(chartsAction.getPatientsByMonthChart());
  }, [dispatch]);
  let circularChart = useSelector((state) => state.charts?.circularChart);
  let testTypeChart = useSelector((state) => state.charts?.testTypeChart);
  let patientByMonthChart = useSelector(
    (state) => state.charts?.patientsByMonthChart
  );
  let testArray = [];
  let typeArray = [];
  testArray.findIndex;
  for (let i = 0; i < testTypeChart?.length; i++) {
    if (testArray?.indexOf(testTypeChart[i]?._id?.name) === -1) {
      testArray?.push(testTypeChart[i]?._id?.name);
    }
    if (typeArray?.indexOf(testTypeChart[i]?._id?.type) === -1) {
      typeArray?.push(testTypeChart[i]?._id?.type);
    }
  }
  let lineState = {
    series: [
      {
        name: "Untested Patients",
        data: patientByMonthChart?.map((val) => val.unTestedPatient),
      },
      {
        name: "Tested Patients",
        data: patientByMonthChart?.map((val) => val.testedPatient),
      },
    ],
    options: {
      chart: {
        height: 450,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Patients by Months",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: patientByMonthChart.map((val) => val.month),
      },
    },
  };
  let barstate = {
    series: typeArray?.map((val) => ({
      name: val,
      data: testArray?.map((value) => {
        let pNo = 0;
        for (let i = 0; i < testTypeChart?.length; i++) {
          if (
            testTypeChart[i]?._id.name === value &&
            testTypeChart[i]?._id.type === val
          ) {
            pNo = testTypeChart[i]?.noOfPatient;
          }
        }
        return pNo;
      }),
    })),
    options: {
      chart: {
        type: "bar",
        stacked: true,
        stackType: "50%",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: testArray,
      },
      yaxis: {
        categories: [],
      },
    },
  };
  let doughnutState = {
    options: {
      labels: circularChart?.map((val) => val._id),
    },
    series: circularChart?.map((val) => val.noOfPatient),
  };
  const graphByDate = (arr) => {
    if (arr) {
      let data = {
        from: `${arr[0]?._d?.getFullYear()}-${
          arr[0]?._d?.getMonth() + 1
        }-${arr[0]?._d?.getDate()}`,
        to: `${arr[1]?._d?.getFullYear()}-${
          arr[1]?._d?.getMonth() + 1
        }-${arr[1]?._d?.getDate()}`,
      };
      dispatch(chartsAction.getMedicalProfeesionalChartsByDate(data));
    }
  };
  return (
    <div>
      <div className="flex justify-between w-9/12 items-center pl-4 pr-4 mt-3">
        <div className="manager-panel-title-div">
          <h1 className="panel-title">Dashboard</h1>
        </div>
        <div>
          <DateRangeInput onChange={graphByDate} />
        </div>
      </div>
      <div className=" flex xs:flex-col-reverse md:flex-row justify-between xs:items-center mt-3">
        <div className=" flex-wrap w-3/4">
          <div className=" xs:flex-col xs:items-center xs:justify-center md:flex-row flex flex-wrap justify-around ">
            <div className="chart-div xs:w-full  xs:mx-auto   mt-3">
              <Card className="cards ">
                <div>
                  <div>
                    <p className="cards-title mb-6">Patients By Test</p>
                  </div>
                  <DoughNut
                    series={doughnutState.series}
                    options={doughnutState.options}
                  />
                </div>
              </Card>
            </div>
            <div className="chart-div xs:w-full xs:mx-auto   mt-3">
              <Card className="cards">
                <div>
                  <div>
                    <p className="cards-title mb-6">Patients By Test Type</p>
                  </div>
                  <BarChart
                    series={barstate.series}
                    options={barstate.options}
                  />
                </div>
              </Card>
            </div>
            <div className="chart-large-div xs:w-full mb-10  mt-7 ">
              <Card className="cards">
                <div>
                  <div>
                    <p className="cards-title mb-6">Current Year Patients</p>
                  </div>
                  <LineChart
                    series={lineState.series}
                    options={lineState.options}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="relative  w-1/4  xs:w-4/5 flex-col mr-3 flex mt-3">
          <Card className="cards sm:fixed sm:right-1 xl:right-4  xs:w-5/6 xs:mx-auto  sm:w-3/12 lg:w-1/5 z-[100] sm:top-20 ">
            <div className="flex xs:flex-col-reverse  xs:items-center sm:justify-between sm:items-start  sm:pr-3 ">
              <div className="pl-2 xs:mt-4 sm:w-9/12 xs:w-full xs:text-center ">
                <p className="cards-title-number">$4250</p>
                <p className="cards-subtitle">Earned this month</p>
              </div>
              <CustomerServiceOutlined
                className="card-icon mt-1 xs:w-1/5  sm:w-1/3 lg:w-1/5 p-2"
                size={"large"}
              />
            </div>
            <Divider />
            <div className="flex xs:flex-col-reverse  xs:items-center sm:justify-between sm:items-start  sm:pr-3 ">
              <div className="pl-2 xs:mt-4 sm:w-9/12 xs:w-full xs:text-center ">
                <p className="cards-title-number">$4250</p>
                <p className="cards-subtitle">Earned this month</p>
              </div>
              <CustomerServiceOutlined className="card-icon mt-1  xs:w-1/5  sm:w-1/3 lg:w-1/5  p-2" />
            </div>
            <Divider />
            <div className="flex xs:flex-col-reverse  xs:items-center sm:justify-between sm:items-start  sm:pr-3 ">
              <div className="pl-2 xs:mt-4 sm:w-9/12 xs:w-full xs:text-center ">
                <p className="cards-title-number">$4250</p>
                <p className="cards-subtitle">Earned this month</p>
              </div>
              <CustomerServiceOutlined className="card-icon mt-1  xs:w-1/5  sm:w-1/3 lg:w-1/5  p-2" />
            </div>
            <Divider />
            <div className="flex xs:flex-col-reverse  xs:items-center sm:justify-between sm:items-start  sm:pr-3 ">
              <div className="pl-2 xs:mt-4 sm:w-9/12 xs:w-full xs:text-center ">
                <p className="cards-title-number">$4250</p>
                <p className="cards-subtitle">Earned this month</p>
              </div>
              <CustomerServiceOutlined className="card-icon mt-1 w-1/5 p-2" />
            </div>
            <Divider />
          </Card>
        </div>
      </div>
    </div>
  );
};
