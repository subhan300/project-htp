import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "antd";
import {
  Btn,
  DetailModal,
  VendorForm,
  LocationCard,
} from "../../../components";
import { Spinner } from "../../../components";
import "../scss/index.scss";
import { locationAction, testTypeAction } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const postsPerPage = 3;
let arrayForHoldingPosts = [];
export const Locations = () => {
  // let posts = ["a", "b", "c", "d", "e", "f", "s", "y"];
  const [isVendorModalVisible, setVendorIsModalVisible] = useState(false);
  let [load, setLoad] = useState(false);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(locationAction.getAllLocations(setLoad));
  }, [dispatch]);

  useEffect(() => {
    dispatch(testTypeAction.getTestTypes());
  }, [dispatch]);
  let locations = useSelector((state) => state.location?.getAllLocations);
  // let manager_id=useSelector(state=>state.location)
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

  const [postsToShow, setPostsToShow] = useState([]);

  const [next, setNext] = useState(3);

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

  const loopWithSlicePrevious = (start, end) => {
    const slicedPosts = locations.slice(start, end);

    arrayForHoldingPosts = [...slicedPosts];

    setPostsToShow(arrayForHoldingPosts);
  };

  const handleShowMorePosts = () => {
    console.log("should get on click", next);
    if (next < locations?.length) {
      loopWithSlice(next, next + postsPerPage);
      setNext(next + postsPerPage);
      console.log("next ", next);
    }
  };
  const handleShowPreviousPosts = () => {
    console.log("should get on click", next);
    if (next > 3) {
      loopWithSlicePrevious(0, next - postsPerPage);
      setNext(next - postsPerPage);
    }
    console.log("next ", next);
  };

  let [currentKey, setCurrentKey] = useState(null);
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

      <div className="xs:container 2xl:w-11/12 mx-auto">
        <div className="manager-panel-header flex xs:flex-col xs:justify-center sm:justify-between items-center pl-6  mt-3 mb-6">
          <div className="manager-panel-title-div">
            <h1 className="panel-title">Locations</h1>
          </div>
          <div className="flex w-100 xs:flex-col  sm:flex-row sm:justify-between p-3">
            <div className="xs:mt-3 sm:ml-4">
              <Link to="create-location ">
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
            <div className="xs:mt-3 sm:ml-4">
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
          {locations.length == 0 ? (
            <div className="location_loader">
              <Spinner />
            </div>
          ) : (
            postsToShow.map((val, i) => {
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
                    patientNumber={val.noOfPatient}
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
