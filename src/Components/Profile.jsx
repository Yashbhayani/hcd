import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Homecontex from "../Context/Home/HomeContext";

const Profile = (props) => {
  const navigate = useNavigate();
  const context = useContext(Homecontex);
  const { GetAmount, UserINFO, AddFeedback } = context;

  const [loader, setloader] = useState(true);

  const [Feedback, setFeedback] = useState({
    Title: "",
    Description: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      GetAmount();
      setInterval(() => {
        setloader(false);
      }, 2000);
    } else {
      navigate("/signup");
    }
  }, []);

  const onChange = (e) => {
    setFeedback({ ...Feedback, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      Feedback.Email !== "" &&
      Feedback.Title !== "" &&
      Feedback.Description !== ""
    ) {
      AddFeedback(Feedback);
      setFeedback({
        Title: "",
        Description: "",
      });
      props.showAlert("Data Added Successfully!", "success");
    }else{
      props.showAlert("Some Data is missing!", "danger");
    }
  };

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
        <div className="row p-4">
          <div className="col p-3 text-center">
            <div className="card" style={{ width: "20rem" }}>
              <div className="card-body">
                <h5 className="card-title">
                  Name : {UserINFO.Firstname} {UserINFO.Lastname}
                </h5>
                <p className="card-text">Email : {UserINFO.email}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Mobile No : {UserINFO.Mobile}
                </li>
                <li className="list-group-item">
                  Start Date : {UserINFO.StartDate}
                </li>
              </ul>
            </div>
          </div>
          <div className="col p-3">
            <div className="mb-3">
              <h3>Feedback Form</h3>
            </div>
            <form className="form-floating gap-3" onSubmit={onSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Title"
                  name="Title"
                  value={Feedback.Title}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="Description"
                  name="Description"
                  rows={3}
                  value={Feedback.Description}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

<div
  className="fixed-bottom p-2 bg-info  text-white"
  style={{textAlign: "center" }}
>
  <p>Copyright © Yash Bhayani</p>
</div>

    </div>
  );
};

export default Profile;
