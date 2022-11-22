// import React, { useState } from "react";
// import camIcon from "../../assets/Images/camera.svg";
// import eyeIcon from "../../assets/Images/eye.svg";
// export const UploadInput = (props) => {
//   const [flag, setFlag] = useState(true);
//   let filename = props.value;
//   filename && filename.length > 20
//     ? (filename =
//         filename.slice(0, 20) + filename.slice(filename.lastIndexOf(".")))
//     : null;
//   return (
//     <div className="p-0 m-0 h-11" style={{ padding: 0, margin: 0, height: 45 }}>
//       <input
//         accept="image/*"
//         className={classes.input}
//         id={props.id}
//         type="file"
//         onChange={props?.onChange}
//       />
//       <label
//         htmlFor={flag && props.id}
//         style={{
//           width: "100%",
//           borderRadius: "9px",
//           border: props.error ? "1px solid red" : "1px solid #C3C3C7",
//         }}
//       >
//         <div className={classes.label}>
//           <div>{props.value ? filename : props.placeholder}</div>
//           <div>
//             {props.value ? (
//               <img
//                 onClick={() => {
//                   setFlag(false);
//                   props.iconClick();
//                   setTimeout(() => {
//                     setFlag(true);
//                   }, 100);
//                 }}
//                 src={eyeIcon}
//                 alt="See"
//                 width="35px"
//                 style={{ cursor: "pointer" }}
//               />
//             ) : (
//               <img
//                 src={camIcon}
//                 alt="Cam"
//                 type="file"
//                 width="35px"
//                 style={{ cursor: "pointer" }}
//               />
//             )}
//           </div>
//         </div>
//       </label>
//     </div>
//   );
// };
