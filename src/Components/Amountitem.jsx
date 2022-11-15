import React, { useContext } from "react";
import Homecontex from "../Context/Home/HomeContext";

const Amountitem = (props) => {
  const context = useContext(Homecontex);
  const { DeleteAmount } = context;
  const { amountfata, index, update, View } = props;
  return (
    <tr>
      <th key={index + 1}>{index + 1}</th>
      <td>{amountfata.Title}</td>
      <td>
        {amountfata.Amount.toLocaleString()} {amountfata.Amount_type}
      </td>
      <td>{amountfata.Date}</td>
      <td>
        <button
          className="btn btn-outline-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleEditModalSubject2"
          onClick={() => {
            View(amountfata);
          }}
        >
          <i className="bi bi-binoculars"></i>
        </button>
      </td>
      <td>
        <button
          className="btn btn-outline-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleEditModalSubject2"
          onClick={() => {
            update(amountfata);
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
            DeleteAmount(amountfata._id);
            props.showAlert("Deleted Successfully", "success");
          }}
        >
          <i className="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
  );
};

export default Amountitem;
