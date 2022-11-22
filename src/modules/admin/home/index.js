import React, { useEffect, useState } from "react";
import { Card, Divider } from "antd";
import {
  DateRangeInput,
  DoughNut,
  BarChart,
  LineChart,
  BubbleChart,
} from "../../../components";
import "./scss/index.scss";
import "../../../app.scss";
import { CustomerServiceOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../../components";
import {
  // employeeAction,
  locationAction,
  chartsAction,
  // patientAction,
  // testTypeAction,
} from "../../../store/actions";
import { MultiBarChart } from "../../../components/charts/multi-bar-chart";

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

export const Home = () => {
  let dispatch = useDispatch();
  let [adminChartsloader, setAdminChartsLoader] = useState(true);
  let [loader, setLoader] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(locationAction.getAllAdminLocations(abortController));
    dispatch(chartsAction.adminCharts(setAdminChartsLoader, abortController));
    dispatch(chartsAction.adminPatientCharts(setLoader, abortController));
    return () => {
      console.log("cancel equest ");
      abortController.abort();
    };
  }, [dispatch]);

  let locations = useSelector((state) => state.location?.getAllLocations);

  let charts = useSelector((state) => state.charts.charts);

  let patientChart = useSelector((state) => state.charts.patientChart);

  let totalPatients = patientChart?.reduce((acc, charts) => {
    return (acc += charts?.totalPatient);
  }, 0);

  let testedPatients = patientChart?.reduce((acc, charts) => {
    return (acc += charts?.testedPatient);
  }, 0);

  let totalMedical = charts[0]?.secondChart?.reduce((acc, emp) => {
    return (acc += emp?.medicalProfession);
  }, 0);

  let totalLabTechnician = charts[0]?.secondChart?.reduce((acc, emp) => {
    return (acc += emp?.labTechnicican);
  }, 0);

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
      console.log("data>", data);
      setAdminChartsLoader(true);
      setLoader(true);
      dispatch(
        chartsAction.getAdminChartsByDate(data, setAdminChartsLoader, setLoader)
      );
    }
  };

  let bubbleState = {
    series: locations.map((val, i) => {
      return {
        name: val.location_name,
        data: [
          [15 * (i + 1), 12, 22 * (i + 1)],
          // [50 * (i + 1), 130, 46 * (i + 1)],
          // [27 * (i + 1), 19, 21 * (i + 1)],
        ],
      };
    }),

    options: {
      chart: {
        height: 350,
        type: "bubble",
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      title: {
        text: "",
      },
      xaxis: {
        tickAmount: 12,
        type: "category",
        labels: {
          rotate: 0,
        },
      },
      yaxis: {
        max: 70,
      },
      theme: {
        palette: "palette2",
      },
    },
  };

  let doughnutState = {
    options: {
      xaxis: { floating: true },
    },

    series: charts[0]?.firstChart.map((val) => val.noOfPatient),

    chartOptions: {
      labels: charts[0].firstChart.map((val) => val._id),
    },
  };

  let multiBarChart = {
    series: ["labTechnicican", "medicalProfession"].map((val) => {
      return {
        name: val,
        data: charts[0]?.secondChart?.map((no) => no[val]),
      };
    }),

    options: {
      chart: {
        type: "bar",
        height: 350,
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: charts[0]?.secondChart?.map((val) => val.location_name),
      },
      yaxis: {
        title: {
          // text: "(thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  let lineState = {
    series: [
      {
        name: "Tested Patient",
        // data: patientComparisionChart.map((val) => val.testedPatient),
        data: patientChart.map((val) => val.testedPatient),
      },
      {
        name: "Untested Patient",
        data: patientChart.map((val) => val.unTestedPatient),
        // data: [1, 2, 3, 4],
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
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  };
  let testArray = [];
  let typeArray = [];
  testArray.findIndex;
  for (let i = 0; i < charts[0]?.thirdChart?.length; i++) {
    if (testArray?.indexOf(charts[0]?.thirdChart[i]?._id?.name) === -1) {
      testArray?.push(charts[0]?.thirdChart[i]?._id?.name);
    }
    if (typeArray?.indexOf(charts[0]?.thirdChart[i]?.type) === -1) {
      typeArray?.push(charts[0]?.thirdChart[i]?._id?.type);
    }
  }
  // console.log("asdas", testArray, typeArray);
  let barstate = {
    series: typeArray?.map((val) => ({
      name: val,
      data: testArray?.map((value) => {
        let pNo = 0;
        for (let i = 0; i < charts[0]?.thirdChart?.length; i++) {
          if (
            charts[0]?.thirdChart[i]?._id.name === value &&
            charts[0]?.thirdChart[i]?._id.type === val
          ) {
            pNo = charts[0]?.thirdChart[i]?.noOfPatient;
          }
        }
        // console.log("Number => ", pNo);
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
  return (
    <div>
      <div
        className="flex xs:flex-col sm:flex-row xs:mx-auto sm:justify-between w-9/12 items-center md:pl-6 
    md:pr-7 2xl:pr-12 2xl:pl-10  mt-3"
      >
        <div className="manager-panel-title-div">
          <h1 className="panel-title xs:text-center">Asin&apos;s Dashboard</h1>
        </div>
        <div className="xs:mt-4 sm:mt-0">
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
                    <p className="cards-title mb-6">Patient Reports</p>
                  </div>

                  {adminChartsloader ? (
                    <div className="h-40 flex items-center justify-center  ">
                      <Spinner />
                    </div>
                  ) : (
                    <DoughNut
                      series={doughnutState.series}
                      options={doughnutState.chartOptions}
                    />
                  )}
                </div>
              </Card>
            </div>
            <div className="chart-div xs:w-full xs:mx-auto   mt-3">
              <Card className="cards">
                <div>
                  <div>
                    <p className="cards-title mb-6">Employees</p>
                  </div>
                  {adminChartsloader ? (
                    <div className="h-40 flex items-center justify-center ">
                      <Spinner />
                    </div>
                  ) : (
                    <BarChart
                      series={barstate.series}
                      options={barstate.options}
                    />
                  )}
                </div>
              </Card>
            </div>
            <div className="chart-div xs:w-full xs:mx-auto   mt-3">
              <Card className="cards ">
                <div>
                  <div>
                    <p className="cards-title mb-6"></p>
                  </div>
                  {adminChartsloader ? (
                    <div className="h-40 flex items-center justify-center  text-center">
                      <Spinner />
                    </div>
                  ) : (
                    <MultiBarChart
                      series={multiBarChart.series}
                      options={multiBarChart.options}
                    />
                  )}
                </div>
              </Card>
            </div>
            <div className="chart-large-div xs:w-full xs:mx-auto   mt-3">
              <Card className="cards">
                <div>
                  <div>
                    <p className="cards-title mb-6">Locations</p>
                  </div>
                  <BubbleChart
                    series={bubbleState.series}
                    options={bubbleState.options}
                  />
                </div>
              </Card>
            </div>
            <div className="chart-large-div xs:w-full mb-10  mt-7 ">
              <Card className="cards">
                <div>
                  <div>
                    <p className="cards-title mb-6">Patient</p>
                  </div>

                  {loader ? (
                    <div className="h-40 flex items-center justify-center  text-center">
                      <Spinner />
                    </div>
                  ) : (
                    <LineChart
                      series={lineState.series}
                      options={lineState.options}
                    />
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="relative  w-1/4 xs:mr-0 xs:w-3/4 flex-col mr-3 flex mt-3">
          <Card className="cards sm:fixed sm:right-1 xl:right-4  xs:w-100 xs:mx-auto  sm:w-3/12 lg:w-1/5 z-[100] sm:top-20 ">
            <div className="flex xs:flex-col-reverse  xs:items-center sm:justify-between sm:items-start  sm:pr-3 ">
              <div className="pl-2 xs:mt-4 sm:w-9/12 xs:w-full xs:text-center ">
                <p className="cards-title-number">{totalPatients}</p>
                <p className="cards-subtitle">Total Patients</p>
              </div>
              <CustomerServiceOutlined
                className="card-icon mt-1 xs:w-1/5  sm:w-1/3 lg:w-1/5 p-2"
                size={"large"}
              />
            </div>
            <Divider />
            <div className="flex xs:flex-col-reverse  xs:items-center sm:justify-between sm:items-start  sm:pr-3 ">
              <div className="pl-2 xs:mt-4 sm:w-9/12 xs:w-full xs:text-center ">
                <p className="cards-title-number">{totalMedical}</p>
                <p className="cards-subtitle">Medical Employees</p>
              </div>
              <CustomerServiceOutlined className="card-icon mt-1  xs:w-1/5  sm:w-1/3 lg:w-1/5  p-2" />
            </div>
            <Divider />
            <div className="flex xs:flex-col-reverse  xs:items-center sm:justify-between sm:items-start  sm:pr-3 ">
              <div className="pl-2 xs:mt-4 sm:w-9/12 xs:w-full xs:text-center ">
                <p className="cards-title-number">{totalLabTechnician}</p>
                <p className="cards-subtitle">Lab Technicians</p>
              </div>
              <CustomerServiceOutlined className="card-icon mt-1  xs:w-1/5  sm:w-1/3 lg:w-1/5  p-2" />
            </div>
            <Divider />
            <div className="flex xs:flex-col-reverse  xs:items-center sm:justify-between sm:items-start  sm:pr-3 ">
              <div className="pl-2 xs:mt-4 sm:w-9/12 xs:w-full xs:text-center ">
                <p className="cards-title-number">{testedPatients}</p>
                <p className="cards-subtitle">Tested Patients</p>
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
