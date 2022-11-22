import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "antd";
import {
  Btn,
  DetailModal,
  VendorForm,
  LocationCard,
  SelectInput,
} from "../../../components";
import { Spinner } from "../../../components";
import "../scss/index.scss";
import { locationAction } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const postsPerPage = 3;
let arrayForHoldingPosts = [];
export const Locations = () => {
  const [isVendorModalVisible, setVendorIsModalVisible] = useState(false);
  // const lelo = useCallback(() => loopWithSlice(0, postsPerPage), []);

  let [load, setLoad] = useState(false);
  let [selectValue, setSelectValue] = useState();
  // console.log("data", data);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(locationAction.getAllAdminLocations(6, setLoad));
    dispatch(locationAction.getAllManagersNameIdL());
  }, [dispatch]);

  let locations = useSelector((state) => state.location?.getAllLocations);
  // let locationLength = useSelector((state) => state.location?.locationLength);

  let managerNameId = useSelector((state) => state.location.managerId);

  const searchLocation = (id) => {
    setLoad(true);
    setCurrentKey(null);
    dispatch(locationAction.getManagerSearchLocation(id, setLoad));
  };

  let locationExist = useSelector((state) => state.location?.isLocationExist);

  const showVendorModal = () => {
    setVendorIsModalVisible(true);
  };
  const handleOkVendor = () => {
    setVendorIsModalVisible(false);
  };
  const handleCancelVendor = () => {
    setVendorIsModalVisible(false);
  };
  let [currentKey, setCurrentKey] = useState(null);
  const [postsToShow, setPostsToShow] = useState([]);

  const [next, setNext] = useState(3);

  const loopWithSlicePrevious = (start, end) => {
    const slicedPosts = locations.slice(start, end);
    arrayForHoldingPosts = [...slicedPosts];
    setPostsToShow(arrayForHoldingPosts);
  };
  const handleShowMorePosts = () => {
    if (next < locations?.length) {
      loopWithSlice(next, next + postsPerPage);
      setNext(next + postsPerPage);
    }
  };
  const handleShowPreviousPosts = () => {
    if (next > 3) {
      loopWithSlicePrevious(0, next - postsPerPage);
      setNext(next - postsPerPage);
    }
  };
  const loopWithSlice = useCallback(
    (start, end) => {
      const slicedPosts = locations.slice(start, end);
      arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
      setPostsToShow(arrayForHoldingPosts);
    },
    [locations]
  );

  useEffect(() => {
    if (locationExist == undefined || locationExist == false) {
      console.log("wait callback....");
    } else {
      const slicedPosts = locations.slice(0, 3);
      arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
      setPostsToShow(arrayForHoldingPosts);
    }
  }, [locationExist, locations]);

  return (
    <>
      <DetailModal
        title={" Vendor Signup"}
        isModalVisible={isVendorModalVisible}
        showModal={showVendorModal}
        handleOk={handleOkVendor}
        handleCancel={handleCancelVendor}
        footer={null}
        content={
          <VendorForm
            className="mt-5"
            locations={locations}
            handleOkVendor={handleOkVendor}
            setOpenModal={setVendorIsModalVisible}
          />
        }
      />

      <div className="xs:container 2xl:w-11/12 mx-auto bd_blue">
        <div className="bd_red manager-panel-header flex xs:flex-col xs:justify-center sm:justify-between items-center pl-4 :mt-3 mb-6">
          <div className="bd_blue manager-panel-title-div pl-1">
            <h1 className="panel-title">Locations</h1>
          </div>
          <div className="flex w-100 xs:flex-col  sm:flex-row sm:justify-between p-3">
            <div className="xs:mt-3 sm:ml-4">
              <SelectInput
                // mode="multiple"
                // bgColor="#F0F2F5"
                // color="#383f51"
                setData={(e) => {
                  searchLocation(
                    managerNameId.filter(
                      (val) => val.full_name + "-" + val.mid === e
                    )[0]._id
                  );
                }}
                placeholder="Select Manager"
                value={managerNameId.map(
                  (val) => val.full_name + "-" + val.mid
                )}
                selectValue={selectValue}
                setValue={setSelectValue}
              />
            </div>
            <div className=" xs:mt-3 sm:ml-4">
              <Link to="create-location">
                <Btn
                  value="Create new location "
                  bgColor="#F0F2F5"
                  color="#383f51"
                  border="1px solid #c3c3c7"
                  btnClass="btnDarkHover"

                  // onClick={() => setIsModalVisible(true)}
                />
              </Link>
            </div>
            <div className="xs:mt-3 sm:ml-4 bd_blue">
              <Btn
                value="Create vendor "
                bgColor="#F0F2F5"
                color="#383f51"
                border="1px solid #c3c3c7"
                btnClass="btnDarkHover"
                onClick={() => setVendorIsModalVisible(true)}
              />
            </div>
          </div>
        </div>

        <Row className="location p-3">
          {load || locationExist == undefined ? (
            <div className="location_loader">
              <Spinner />
            </div>
          ) : locationExist ? (
            postsToShow?.map((val, i) => {
              return (
                <Col
                  key={i}
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 12, offset: 0 }}
                  md={{ span: 12, offset: 0 }}
                  lg={{ span: 8 }}
                  className={`location-card-hand pl-3`}
                >
                  <LocationCard
                    text={"All Patients (collected)"}
                    title={val.location_name}
                    patientNumber={val.noOfPatients}
                    barCodeScanner={val.test}
                    location_id={val._id}
                    testName={val.test}
                    city={val.city}
                    address={val.address}
                    all_details={val}
                    key={i}
                    currentKey={currentKey}
                    setCurrentKey={setCurrentKey}
                  />
                </Col>
              );
            })
          ) : (
            <div
              className="flex items-center h-64 justify-center w-100"
              style={{ width: "100%" }}
            >
              <h1 className="w-full font-medium text-xl text-center">
                Location Does Not Exist
              </h1>
            </div>
          )}
        </Row>

        {load || locationExist == undefined || locationExist == false ? null : (
          <div className="flex justify-end pr-3">
            <div className="ml-3">
              <Btn
                value={"Load More"}
                bgColor="white"
                color=" #008ba4"
                onClick={handleShowMorePosts}
              >
                Load more{" "}
              </Btn>
            </div>

            <div className="ml-3">
              <Btn
                value={"Load Previous"}
                bgColor="white"
                color="#008ba4"
                onClick={handleShowPreviousPosts}
              >
                Load previous{" "}
              </Btn>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
