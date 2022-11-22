import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, message } from "antd";
import { TextInput, Btn, SelectInput } from "../../forms";
import "../scss/index.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { vendorService } from "../../../services";
import { Spinner } from "../../../components";
export const VendorForm = (props) => {
  let [load, setLoad] = useState(false);
  const vendorSignUp = yup.object({
    vendor_name: yup
      .string("* Enter your Full name")
      .max(50, "* Full Name can be at most 50 characters long")
      .required("* Full Name is required"),
    email: yup
      .string("* Enter your email")
      .max(40, "* Email can be at most 40 characters long")
      .email("* Enter a valid email")
      .trim("* There should not be a single space")
      .required("* Email is required"),
    password: yup
      .string("* Enter your password")
      .trim("* There should not be a single space")
      .required("* password is required"),
  });

  const formik = useFormik({
    validationSchema: vendorSignUp,
    initialValues: {
      vendor_name: "",
      email: "",
      password: "",
      vendor_locations: [],
      type: "Vendor",
    },
    onSubmit: (val) => {
      setLoad(true);
      vendorService
        .vendorSignup(val)
        .then((res) => {
          setLoad(false);

          if (res.status == 200) {
            message.success("signup successfuly");
            props.setOpenModal(false);
          } else {
            message.error(res.response.data.message);
          }
        })
        .catch((err) => {
          setLoad(false);
          message.error(`signup ${err}`);
        });
      props.handleOkVendor;
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row gutter={[20, 20]} className="mt-5">
          <Col sm={12} xs={24}>
            <label>Name</label>
            <TextInput
              type="text"
              placeholder="Enter Name"
              {...formik.getFieldProps("vendor_name")}
            />
            {formik.touched.vendor_name && formik.errors.vendor_name ? (
              <span className="error">{formik.errors.vendor_name}</span>
            ) : null}
          </Col>
          <Col sm={12} xs={24}>
            <label className="font-size ">
              Select Locations
              <br />
            </label>

            <SelectInput
              mode="multiple"
              name="vendor_locations"
              setData={(e) => {
                let location_id_array = [];
                e.map((val) => {
                  props.locations.filter((name) => {
                    if (name.location_name == val) {
                      location_id_array.push(name._id);
                    }
                  });
                });
                formik.setFieldValue("vendor_locations", location_id_array);
              }}
              value={props.locations.map((val) => val.location_name)}
              placeholder="Add Test"
            />
          </Col>
          <Col sm={12} xs={24}>
            <label>Email:</label>
            <TextInput
              type="text"
              id="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />

            {formik.errors.email && formik.touched.email ? (
              <span className="error">{formik.errors.email}</span>
            ) : null}
          </Col>
          <Col sm={12} xs={24}>
            <label>Password</label>
            <TextInput
              type="text"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="error">{formik.errors.password}</span>
            ) : null}
          </Col>
        </Row>
        <Row className="w-full flex justify-end items-end mt-6">
          <Col xs={24} sm={8} md={6} lg={24}>
            <Btn
              bgColor="#008ba4"
              color="white"
              type="submit"
              value={
                load ? (
                  <span>
                    <Spinner className="btn-spinner mr-2" />
                    Loading...
                  </span>
                ) : (
                  "Sign Up"
                )
              }
            />
          </Col>
        </Row>
      </form>
    </div>
  );
};

VendorForm.propTypes = {
  handleOkVendor: PropTypes.func,
  locations: PropTypes.array,
  setOpenModal: PropTypes.func,
};
