import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Space, message } from "antd";
import { TextInput, Btn, FileInput } from "../../../forms";
import "../scss/index.scss";
import * as yup from "yup";
import { useFormik } from "formik";

const BasicInformationForm = (props) => {
  const basicFormValidationSchema = yup.object({
    location_name: yup
      .string("* Enter your Full name")
      .max(50, "* Full Name can be at most 50 characters long")
      .required("* Full Name is required"),
    email: yup
      .string("* Enter your email")
      .max(40, "* Email can be at most 40 characters long")
      .email("* Enter a valid email")
      .trim("* There should not be a single space")
      .required("* Email is required"),
    state: yup.string("* Enter your State").required("* State is required"),

    zip_code: yup
      .string("* Enter Postal Code")
      .required("* Postal code is required"),
    address: yup
      .string("* Enter Address")
      .max(50, "* Address can be at most 50 characters long")
      .required("* Address is required"),
    city: yup.string("* Enter your City").required("* City is required"),
    location_logo: yup
      .string("* required")
      .required("Please Select default logo or upload here!"),
    send_copy_to_email: yup
      .boolean()
      .required("Please Select any one!")
      .oneOf([true, false], "please tick"),
    business_or_individual: yup
      .string("* required")
      .required("Please Select Business or Individual!"),
  });
  const formik = useFormik({
    validationSchema: basicFormValidationSchema,
    initialValues: {
      location_name: "subhan",
      email: "susb123@gmail.com",
      city: "akatrachi",
      address: "clojs sjsj",
      zip_code: "393",
      state: "sindh",
      location_logo: "",
      business_or_individual: "business",
      send_copy_to_email: false,
    },
    onSubmit: (val) => {
      // console.log("bvla", val.location_logo);
      if (image != null) {
        props.setUploadedLogo(image);
        props.setBasicInfoForm({
          location_name: val.location_name,
          email: val.email,
          location_logo: image,
          zip_code: val.zip_code,
          address: val.address,
          city: val.city,
          business_or_individual: val.business_or_individual,
          send_copy_to_email: val.send_copy_to_email,
        });
        props.next();
      } else {
        setImageError(true);
        props.setBasicInfoForm({
          location_name: val.location_name,
          email: val.email,
          location_logo: val.location_logo,
          zip_code: val.zip_code,
          address: val.address,
          city: val.city,
          business_or_individual: val.business_or_individual,
          send_copy_to_email: val.send_copy_to_email,
        });
        props.next();
      }
      // props.setBasicInfoForm(formdata);
      // props.next();
    },
  });
  // const formdata = new FormData();
  let [uploadLogo, setUploadLogo] = useState(false);
  const [image, setImage] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [imageError, setImageError] = useState(false);
  // const signRef = useRef(null);
  // console.log("image", image);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const fileInputProps = {
    accept: "images/*",
    id: "logo",
    listType: "picture-card",
    beforeUpload: (file) => {
      const types = ["image/png", "image/jpg", "image/gif", "image/jpeg"];
      const isImage = types.includes(file.type);
      if (!isImage) {
        message.error(`${file.name} is not a image file`);
      } else {
        setImage(file);
        setImageError(false);
      }
      return false;
    },
    fileList: fileList,
    onChange: onChange,
    onPreview: onPreview,
    content: fileList.length < 1 && "+ Upload",
    dragger: false,
    maxCount: 1,
    multiple: false,
  };

  return (
    // <Card className="mt-5 mx-auto w-10/12">

    <form onSubmit={formik.handleSubmit}>
      <Row gutter={[20, 20]} className="mt-5">
        <Col sm={12} xs={24}>
          <label> Location&apos;s name:</label>
          <TextInput
            type="text"
            id="location_name"
            placeholder="Enter your location name here"
            {...formik.getFieldProps("location_name")}
          />
          {formik.touched.location_name && formik.errors.location_name ? (
            <span className="error">{formik.errors.location_name}</span>
          ) : null}
        </Col>
        <Col sm={12} xs={24}>
          <label> Email:</label>
          <TextInput
            type="text"
            id="email"
            placeholder="Enter lab's email Address here"
            {...formik.getFieldProps("email")}
          />

          {formik.errors.email && formik.touched.email ? (
            <span className="error">{formik.errors.email}</span>
          ) : null}
        </Col>
        <Col sm={12} xs={24}>
          <label> City:</label>
          <TextInput
            type="text"
            placeholder="City"
            {...formik.getFieldProps("city")}
          />

          {formik.errors.city && formik.touched.city ? (
            <span className="error">{formik.errors.city}</span>
          ) : null}
        </Col>
        <Col sm={12} xs={24}>
          <label> State:</label>
          <TextInput
            type="text"
            placeholder="State"
            id="state"
            {...formik.getFieldProps("state")}
          />

          {formik.errors.state && formik.touched.state ? (
            <span className="error">{formik.errors.state}</span>
          ) : null}
        </Col>
        <Col sm={12} xs={24}>
          <label> Address:</label>

          <TextInput
            type="text"
            placeholder="Address"
            {...formik.getFieldProps("address")}
          />

          {formik.errors.address && formik.touched.address ? (
            <span className="error">{formik.errors.address}</span>
          ) : null}
        </Col>
        <Col sm={12} xs={24}>
          <label> Zip Code/ Postal Code:</label>

          <TextInput
            type="text"
            placeholder="Zip Code"
            {...formik.getFieldProps("zip_code")}
          />

          {formik.errors.zip_code && formik.touched.zip_code ? (
            <span className="error">{formik.errors.zip_code}</span>
          ) : null}
        </Col>
        <Col sm={24} xs={24}>
          <p className="text-font-size">Is it a business or an individual?</p>
          <Space direction="horizontal">
            <input
              type="radio"
              name="business_or_individual"
              id="business"
              {...formik.getFieldProps("business_or_individual")}
              onChange={() => {
                formik.setFieldValue("business_or_individual", "Business");
              }}
            />
            <label htmlFor="business">Business</label>
            <input
              name="business_or_individual"
              id="individual"
              type="radio"
              {...formik.getFieldProps("business_or_individual")}
              onChange={() => {
                formik.setFieldValue("business_or_individual", "Individual");
              }}
            />
            <label htmlFor="individual">Individual</label>
          </Space>
          {submit && formik.errors.business_or_individual && (
            <div>
              <span className="error">
                {formik.errors.business_or_individual}
              </span>
            </div>
          )}
        </Col>
        <Col sm={24} xs={24}>
          <p className="mb-2 text-font-size">
            Would you like to send a copy of all patient to provided email ?
          </p>
          <Space direction="horizontal">
            <input
              type="radio"
              name="sendEmail"
              id="send"
              onChange={() => {
                formik.setFieldValue(`send_copy_to_email`, true);
              }}

              // radioText="Yes, Of course"
            />
            <label htmlFor="send">Yes, Of course</label>

            <input
              type="radio"
              name="sendEmail"
              id="notSend"
              onChange={() => {
                formik.setFieldValue(`send_copy_to_email`, false);
              }}
              // radioText="No, Thank you"
            />
            <label htmlFor="notSend">No, Thank you</label>
          </Space>

          {submit && formik.errors.send_copy_to_email && (
            <div>
              <span className="error ">{formik.errors.send_copy_to_email}</span>
            </div>
          )}
        </Col>

        <Col sm={24} xs={24}>
          <p className="mb-2 text-font-size">Select Logo</p>
          <Space direction="horizontal">
            <input
              type="radio"
              name="location_logo"
              id="logo"
              value="default"
              // radioText="Default"
              onChange={(e) => {
                formik.handleChange(e);
                setUploadLogo(false);
                setImage(null);
              }}
            />
            {/* <RadioComponent
              radioText="Location Logo"
              checked={formik.values.location_logo}
              onClick={() => {
                formik.setFieldValue("location_logo", true);
                setUploadLogo(false);
              }}
            /> */}

            <label htmlFor="logo">Default</label>

            <input
              type="radio"
              name="location_logo"
              id="upload"
              value="upload"
              // radioText="Upload"
              onChange={(e) => {
                formik.handleChange(e);
                setUploadLogo(true);
              }}
            />
            <label htmlFor="upload">Upload</label>
          </Space>
          {submit && formik.errors.location_logo && (
            <div>
              <span className="error">{formik.errors.location_logo}</span>
            </div>
          )}
        </Col>

        <Col sm={24} xs={24}>
          {uploadLogo == true ? (
            <Col sm={20} xs={16}>
              <FileInput {...fileInputProps} />
              {submit && (image == null || imageError) && (
                <div>
                  <span className="error">Please Select Logo !</span>
                </div>
              )}
            </Col>
          ) : (
            ""
          )}
        </Col>
      </Row>

      <Row className="w-full flex justify-end items-end">
        <Col sm={6} xs={12}>
          <Btn
            bgColor="#008ba4"
            color="white"
            type={`${
              uploadLogo == "true" && (image == null || imageError)
                ? null
                : "submit"
            }`}
            value="Next"
            onClick={() => {
              uploadLogo == "true" && (image == null || imageError)
                ? false
                : setSubmit(true);
            }}
          />
        </Col>
      </Row>
    </form>
  );
};

BasicInformationForm.propTypes = {
  next: PropTypes.func,
  setBasicInfoForm: PropTypes.any,
  setUploadedLogo: PropTypes.any,
};

export default BasicInformationForm;
