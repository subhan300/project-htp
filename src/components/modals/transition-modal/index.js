import { PromiseModal } from "../promise-modals";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "../../../store/actions";
import {
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
export const TransitionModal = () => {
  const [show, setShow] = useState(false);
  const modal = useSelector((e) => e.modal);
  const dispatch = useDispatch();
  const handleModal = () => dispatch(modalAction.close());
  const handleExternelFunction = () => {
    modal?.data?.handleOk();
    handleModal();
    setShow(false);
  };
  useEffect(() => setShow(modal.show), [modal.show]);
  return (
    <PromiseModal
      modalType={modal?.type}
      icon={
        modal?.type === "success" ? (
          <CheckCircleTwoTone twoToneColor={"#4BB543"} />
        ) : modal?.type === "warning" ? (
          <ExclamationCircleTwoTone twoToneColor={"#EED202"} />
        ) : (
          <CloseCircleTwoTone twoToneColor={"#FF9494"} />
        )
      }
      title={modal?.data?.title}
      content={<p className="redux-modal-content">{modal?.data?.content}</p>}
      onOk={
        modal?.data?.handleOk
          ? handleExternelFunction
          : () => {
              setShow(false);
              handleModal();
            }
      }
      onCancel={() => {
        setShow(false);
        handleModal();
      }}
      centered={true}
      visible={show}
    />
  );
};
