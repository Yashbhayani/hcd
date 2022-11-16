import React, { useEffect, useContext, useRef } from "react";
import { useState } from "react";
import Homecontex from "../Context/Home/HomeContext";
import { useNavigate } from "react-router-dom";
import Amountitem from "./Amountitem";

const Home = (props) => {
  const navigate = useNavigate();
  const context = useContext(Homecontex);
  const {
    AddAmount,
    GetAmount,
    USERAmount,
    EDITAmount,
    TodayCrAmountS,
    TodayDrAmountS,
    TodayCrAmount,
    TodayDrAmount,
  } = context;

  const [loader, setloader] = useState(true);

  const ref = useRef(null);
  const refClose = useRef(null);

  const refSHOW = useRef(null);
  const refSHOWClose = useRef(null);

  const [Title, setTitle] = useState("");
  const [Amount, setAmount] = useState(0);
  const [Amounttype, setAmounttype] = useState("");
  const [Description, setDescription] = useState("");

  const [UpdateID, setUpdateID] = useState("");
  const [UpdateTitle, setUpdateTitle] = useState("");
  const [UpdateAmount, setUpdateAmount] = useState(0);
  const [UpdateAmounttype, setUpdateAmounttype] = useState("");
  const [UpdateDescription, setUpdateDescription] = useState("");

  const [ViewTitle, setViewTitle] = useState("");
  const [ViewAmount, setViewAmount] = useState(0);
  const [ViewAmounttype, setViewAmounttype] = useState("");
  const [ViewDate, setViewDate] = useState("");
  const [ViewDescription, setViewDescription] = useState("");

  // let num = 10000;
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (Amounttype !== "" && Amounttype !== null && Amounttype !== undefined) {
      let formdata = {
        Title: Title,
        Amount: Amount,
        Amount_type: Amounttype,
        Description: Description,
      };
      AddAmount(formdata);
      setTitle("");
      setAmount(0);
      setAmounttype("");
      setDescription("");
      props.showAlert("Data Added Successfully!", "success");
    } else {
      props.showAlert("Some Data is missing!", "danger");
    }
  };

  const update = (amountfata) => {
    setUpdateID(amountfata._id);
    setUpdateTitle(amountfata.Title);
    setUpdateAmount(amountfata.Amount);
    setUpdateAmounttype(amountfata.Amount_type);
    setUpdateDescription(amountfata.Description);
    ref.current.click();
  };

  const onUpdate = (e) => {
    e.preventDefault();

    if (
      UpdateAmounttype !== "" &&
      UpdateAmounttype !== null &&
      UpdateAmounttype !== undefined
    ) {
      let formdata = {
        _id: UpdateID,
        Title: UpdateTitle,
        Amount: UpdateAmount,
        Amount_type: UpdateAmounttype,
        Description: UpdateDescription,
      };
      EDITAmount(formdata);
      refClose.current.click();
      props.showAlert("Update Successfully", "success");
    }
  };

  const View = (amountfata) => {
    setViewTitle(amountfata.Title);
    setViewAmount(amountfata.Amount);
    setViewAmounttype(amountfata.Amount_type);
    setViewDate(amountfata.Date);
    setViewDescription(amountfata.Description);
    refSHOW.current.click();
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
        <>
          {/* Add Data */}
          <section className="vh-10">
            <div className="row d-flex justify-content-center align-items-center h-96 p-5">
              <div className="card text-black" style={{ borderRadius: 10 }}>
                <form className="form-floating gap-3 p-4" onSubmit={onSubmit}>
                  <div className="row g-2  mb-3">
                    <div className="col-md">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="Title"
                          value={Title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="name@example.com"
                          required
                        />
                        <label htmlFor="floatingInputGrid">Title</label>
                      </div>
                    </div>
                    <div className="col-md">
                      <div className="form-floating">
                        <input
                          className="form-control"
                          type="number"
                          value={Amount}
                          onChange={(e) =>
                            setAmount(e.target.value.toLocaleString())
                          }
                          id="Amount"
                          placeholder="10000"
                          required
                        />
                        <label htmlFor="floatingInputGrid">
                          Amount :- {Number(Amount).toLocaleString()}
                        </label>
                      </div>
                    </div>
                    <div className="col-md">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          value={Amounttype}
                          onChange={(e) => setAmounttype(e.target.value)}
                          id="Amounttype"
                          aria-label="Floating label select example"
                        >
                          <option value="" selected disabled>
                            Open this select menu
                          </option>
                          <option value="Cr">Cr</option>
                          <option value="Dr">Dr</option>
                        </select>
                        <label htmlFor="floatingSelectGrid">
                          Amount of type
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                      name="Description"
                      id="Description"
                      style={{ height: 200 }}
                      defaultValue={""}
                      required
                    />
                    <label htmlFor="floatingTextarea2">Description</label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Edit data */}
          <>
            <button
              ref={ref}
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              hidden
            >
              Launch static backdrop modal
            </button>
            {/* Modal */}
            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      ref={refClose}
                    />
                  </div>
                  <div className="modal-body">
                    <section className="vh-10 p-3">
                      <div className="row d-flex justify-content-center align-items-center h-96 p-2">
                        <div
                          className="card text-black"
                          style={{ borderRadius: 10 }}
                        >
                          <form
                            className="form-floating gap-3 p-4"
                            onSubmit={onUpdate}
                          >
                            <div className="row g-2  mb-3">
                              <div className="col-md">
                                <div className="form-floating">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="Title"
                                    value={UpdateTitle}
                                    onChange={(e) =>
                                      setUpdateTitle(e.target.value)
                                    }
                                    placeholder="name@example.com"
                                    required
                                  />
                                  <label htmlFor="floatingInputGrid">
                                    Title
                                  </label>
                                </div>
                              </div>
                              <div className="col-md">
                                <div className="form-floating">
                                  <input
                                    className="form-control"
                                    type="number"
                                    value={UpdateAmount}
                                    onChange={(e) =>
                                      setUpdateAmount(
                                        e.target.value.toLocaleString()
                                      )
                                    }
                                    id="Amount"
                                    placeholder="10000"
                                    required
                                  />
                                  <label htmlFor="floatingInputGrid">
                                    Amount :-{" "}
                                    {Number(UpdateAmount).toLocaleString()}
                                  </label>
                                </div>
                              </div>
                              <div className="col-md">
                                <div className="form-floating">
                                  <select
                                    className="form-select"
                                    value={UpdateAmounttype}
                                    onChange={(e) =>
                                      setUpdateAmounttype(e.target.value)
                                    }
                                    id="Amounttype"
                                    aria-label="Floating label select example"
                                  >
                                    <option value="" selected disabled>
                                      Open this select menu
                                    </option>
                                    <option value="Cr">Cr</option>
                                    <option value="Dr">Dr</option>
                                  </select>
                                  <label htmlFor="floatingSelectGrid">
                                    Amount of type
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="form-floating mb-3">
                              <textarea
                                className="form-control"
                                placeholder="Leave a comment here"
                                value={UpdateDescription}
                                onChange={(e) =>
                                  setUpdateDescription(e.target.value)
                                }
                                name="Description"
                                id="Description"
                                style={{ height: 200 }}
                                defaultValue={""}
                                required
                              />
                              <label htmlFor="floatingTextarea2">
                                Description
                              </label>
                            </div>
                            <button type="submit" className="btn btn-warning">
                              Update
                            </button>
                          </form>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </>

          {/* SHOW DATA WITH DESCRIPTION*/}
          <>
            <button
              ref={refSHOW}
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdroprefSHOW"
              hidden
            >
              Launch static backdrop modal
            </button>
            {/* Modal */}
            <div
              className="modal fade"
              id="staticBackdroprefSHOW"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-md">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      View Data
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      ref={refSHOWClose}
                    />
                  </div>
                  <div className="card modal-body">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Title : {ViewTitle}</h5>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            Amount : {ViewAmount.toLocaleString()} {ViewAmounttype}
                          </li>
                          <li className="list-group-item">
                            {" "}
                            Description : {ViewDescription}
                          </li>
                        </ul>
                        <div className="card-footer">Date : {ViewDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>

          {/* View Data */}
          <div className="bd-highlight text-center">
            <h3>Today Data</h3>
          </div>

          <div className="row justify-content-center text-center">
            <div className="col p-3">
              <h5 className="text-success">
                {TodayCrAmount !== 0 ? (
                  <>Total Credit Amount :- {TodayCrAmountS} Cr</>
                ) : (
                  <>Credit amount is not added today</>
                )}
              </h5>
            </div>
            <div className="col p-3">
              <h5 className="text-danger">
                {TodayDrAmount !== 0 ? (
                  <>Total Debit Amount :- {TodayDrAmountS} Dr</>
                ) : (
                  <>Debit amount is not added today!</>
                )}
              </h5>
            </div>
          </div>
          <table className="table table-hover container-sm border-warning text-center">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Title</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
                <th scope="col">View</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            {
              <tbody>
                {USERAmount &&
                  USERAmount.map((amountfata, index) => {
                    return (
                      <Amountitem
                        key={amountfata._id}
                        index={index}
                        amountfata={amountfata}
                        update={update}
                        View={View}
                      />
                    );
                  })}
              </tbody>
            }
          </table>

          <div className="bd-highlight text-center">
            <h3> {USERAmount.length === 0 && "No Data added today!"}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
