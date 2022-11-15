import React, { useContext } from "react";
import Homecontex from "../Context/Home/HomeContext";

export const Allmonthamount = (props) => {
  const context = useContext(Homecontex);
  const { DELETESelectTIMEAmount } = context;
  const { index, allmonth, update, Year, Month } = props;
  return (
    <tr key={index + 1}>
      <th>{index + 1}</th>
      <td>{allmonth.Title}</td>
      <td>
        {allmonth.Amount.toLocaleString()} {allmonth.Amount_type}
      </td>
      <td>{allmonth.Description}</td>
      <td>{allmonth.Date}</td>
      <td>
        <button
          className="btn btn-outline-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleEditModalSubject2"
          onClick={() => {
            update(allmonth);
          }}
        >
          <i className="bi bi-pen"></i>
        </button>
      </td>
      <td>
        <button
          className="btn btn-outline-danger"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleEditModalSubject2"
          onClick={() => {
            DELETESelectTIMEAmount(allmonth._id, Year, Month);
            props.showAlert("Deleted Successfully", "success");
          }}
        >
          <i className="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
  );
};
