import React from "react";
import { Table, Pagination } from "antd";
import "./scss/index.scss";
import PropTypes from "prop-types";

export const TableComponent = (props) => {
  const pageSize = 6;

  const getData = (current, pageSize) => {
    // return props.data?.slice((current - 1) * pageSize, current * pageSize);
    return props.data?.slice(0, pageSize);
  };
  const columns = props.columnsTitles?.map((val, i) => {
    return {
      title: val?.title,
      dataIndex: val?.dataIndex,
      key: i,
      width: val?.width,
      filters: val?.filters,
      filterIcon: val?.filterIcon,
      onFilter: val?.onFilter,
      ...val?.search,
      render: val?.render,
    };
  });
  return (
    <>
      <Table
        pagination={false}
        bordered={true}
        columns={columns}
        editable={true}
        dataSource={getData(props.current, pageSize)}
        size="small"
        rowClassName={props.rowClassName}
        scroll={
          columns.length < 4
            ? { x: 0 }
            : columns.length < 6
            ? { x: 1000 }
            : columns.length > 6 && columns.length <= 12
            ? props.width
              ? { x: props.width }
              : { x: 1800 }
            : { x: 2000 }
        }
      />

      <div className="flex justify-end">
        {" "}
        <Pagination
          className="mt-3"
          onChange={props.onChange}
          total={props.total}
          current={props.current}
          pageSize={pageSize}
        />
      </div>
    </>
  );
};
TableComponent.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  columnsTitles: PropTypes.any,
  width: PropTypes.string,
  rowClassName: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
  onChange: PropTypes.func,
};
