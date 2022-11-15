import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Homecontex from "../Context/Home/HomeContext";

const Redfeedback = () => {
  const navigate = useNavigate();

  const context = useContext(Homecontex);
  const { GetFeedback, GetAmount, ReadFeedbackdata } = context;

  const [loader, setloader] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      GetAmount();
      GetFeedback();
      setInterval(() => {
        setloader(false);
      }, 1000);
    } else {
      navigate("/signup");
    }
  }, []);
  return (
    <div className="container-fluid">
      {loader ? (
        <>
          <div>
            <div style={{ height: 200 }}></div>
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {ReadFeedbackdata &&
                ReadFeedbackdata.map((readFeedbackdata, index) => {
                  return (
                    <tr>
                      <th scope="row" key={index + 1}>
                        {index + 1}
                      </th>
                      <td>
                        {readFeedbackdata.Firstname} {readFeedbackdata.Lastname}
                      </td>
                      <td>{readFeedbackdata.Email}</td>
                      <td>{readFeedbackdata.Title}</td>
                      <td>{readFeedbackdata.Description}</td>
                      <td>{readFeedbackdata.Date}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Redfeedback;
