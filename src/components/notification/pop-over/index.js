import { Popover, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import "./scss/index.scss";

const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const buttonWidth = 70;
export const Popup = () => (
  <div className="demo mr-2">
    <div
      style={{ marginLeft: buttonWidth, clear: "both", whiteSpace: "nowrap" }}
    >
      <Popover
        placement="bottom"
        title={text}
        content={content}
        trigger="click"
      >
        <Badge size={"small"} count={2}>
          <BellOutlined className="badge-bell-icon" />
        </Badge>
      </Popover>
    </div>
  </div>
);
