import { RadioComponent, Btn } from "../..";
import { PropTypes } from "prop-types";
import { Row, Col } from "antd";
export const IsTested = (props) => {
  return (
    <div>
      <h2 className="title">Is Tested ?</h2>
      <div className="mb-5">
        <RadioComponent
          onClick={() => props.setIsTested("Yes")}
          radioText={"Yes"}
          checked={props.isTested === "Yes"}
        />
        <RadioComponent
          onClick={() => props.setIsTested("No")}
          checked={props.isTested === "No"}
          radioText={"No"}
        />
      </div>
      <div className="steps-action mt-5 btn-div absolute bottom-2 left-1">
        <Row justify="space-between">
          <Col sm={11} md={11} xs={24} lg={6} className="mx-1 mt-2">
            <Btn
              bgColor={"#008ba4"}
              color={"#fff"}
              onClick={() => props.previous()}
              value="Previous"
            />
          </Col>
          <Col sm={11} md={11} xs={24} lg={6} className="mx-1 mt-2">
            <Btn
              bgColor={"#008ba4"}
              color={"#fff"}
              onClick={() => props.next()}
              value="Next"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

IsTested.propTypes = {
  previous: PropTypes.func,
  next: PropTypes.func,
  setIsTested: PropTypes.func,
  isTested: PropTypes.any,
};
