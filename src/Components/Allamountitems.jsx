import React, { useContext, useEffect, useRef, useState } from "react";
import Homecontex from "../Context/Home/HomeContext";
import { useNavigate } from "react-router-dom";
import { Allmonthamount } from "./Allmonthamount";

const Allamountitems = () => {
  const navigate = useNavigate();
  const context = useContext(Homecontex);
  const {
    GetAllAmount,
    AllAmount,
    GetAmount,
    CRdataS,
    DRdataS,
    CRdata,
    DRdata,
    GetSelectTIME,
    AllMonthAmount,
    AllMonthCrData,
    AllMonthDrData,
    AllMonthCrDataS,
    AllMonthDrDataS,
    setAllMonthAmount,
    setAllMonthCrData,
    setAllMonthDrData,
    EDITSelectTIMEAmount,
  } = context;

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const ref = useRef(null);
  const refClose = useRef(null);

  const ref1 = useRef(null);
  const refClose1 = useRef(null);

  const refEdit = useRef(null);
  const refEditClose = useRef(null);

  const [Month, setMonth] = useState();
  const [Year, setYear] = useState();

  const [loader, setloader] = useState(true);
  const [Sloader, setSloader] = useState(false);

  const [UpdateID, setUpdateID] = useState("");
  const [UpdateTitle, setUpdateTitle] = useState("");
  const [UpdateAmount, setUpdateAmount] = useState(0);
  const [UpdateAmounttype, setUpdateAmounttype] = useState("");
  const [UpdateDescription, setUpdateDescription] = useState("");

  const [monthname, setmonthname] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      GetAmount();
      GetAllAmount();
      setInterval(() => {
        setloader(false);
      }, 2000);
    } else {
      navigate("/signup");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setInterval(() => {
        setSloader(false);
      }, 2000);
    } else {
      navigate("/signup");
    }
  }, []);

  const ADDMONTH = (i) => {
    setMonth(i);
    setmonthname(month[i - 1]);
    GetSelectTIME(Number(Year), Number(i));
    refClose.current.click();
    setSloader(true);
    ref1.current.click();
  };

  const ADDYEAR = (i) => {
    setYear(i);
    setAllMonthAmount([]);
    setAllMonthCrData(0);
    setAllMonthDrData(0);
    setSloader(false);
    ref.current.click();
  };

  const update = (amountfata) => {
    setUpdateID(amountfata._id);
    setUpdateTitle(amountfata.Title);
    setUpdateAmount(amountfata.Amount);
    setUpdateAmounttype(amountfata.Amount_type);
    setUpdateDescription(amountfata.Description);
    refEdit.current.click();
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
        Year: Number(Year),
        Month: Number(Month),
      };
      EDITSelectTIMEAmount(formdata);
      refEditClose.current.click();
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
        <>
          <div className="row justify-content-center text-center p-3">
            <div className="col p-3">
              <h4 className="text-success">
                {CRdata !== 0 ? (
                  <>Total Credit Amount :- {CRdataS} Cr</>
                ) : (
                  <>Credit amount is not added</>
                )}
              </h4>
            </div>
            <div className="col p-3">
              <h4 className="text-danger">
                {DRdata !== 0 ? (
                  <>Total Debit Amount :- {DRdataS} Dr</>
                ) : (
                  <>Debit amount is not added</>
                )}
              </h4>
            </div>
          </div>

          {/* ALL MOTH DATA SHOW  */}
          <>
            {/* Button trigger modal */}
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop1"
              ref={ref1}
              hidden
            >
              Launch static backdrop modal
            </button>
            {/* Modal */}
            <div
              className="modal fade"
              id="staticBackdrop1"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {monthname} {" / "} {Year}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      ref={refClose1}
                    />
                  </div>
                  <div className="modal-body">
                    {Sloader ? (
                      <>
                        <div>
                          <div style={{ height: 200 }}></div>
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-info"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-flex justify-content-evenly container-fluid p-5">
                          <h4 className="text-success">
                            {AllMonthCrData !== 0 ? (
                              <>Total Credit Amount :- {AllMonthCrDataS} Cr</>
                            ) : (
                              <>Credit amount is not added</>
                            )}
                          </h4>
                          <h4 className="text-danger">
                            {AllMonthDrData !== 0 ? (
                              <>Total Debit Amount :- {AllMonthDrDataS} Dr</>
                            ) : (
                              <>Debit amount is not added</>
                            )}
                          </h4>
                        </div>
                        <table className="table table-hover container-sm border-warning text-center">
                          <thead>
                            <tr>
                              <th scope="col">id</th>
                              <th scope="col">Title</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Description</th>
                              <th scope="col">Date</th>
                              <th scope="col">Edit</th>
                              <th scope="col">Delete</th>
                            </tr>
                          </thead>
                          {
                            <tbody>
                              {AllMonthAmount &&
                                AllMonthAmount.map((allmonth, index) => {
                                  return (
                                    <Allmonthamount
                                      index={index}
                                      allmonth={allmonth}
                                      update={update}
                                      Year={Year}
                                      Month={Month}
                                    />
                                  );
                                })}
                            </tbody>
                          }
                        </table>
                        <div className="bd-highlight text-center">
                          <h3>
                            {AllMonthCrData === 0 &&
                              AllMonthDrData === 0 &&
                              "No Data added this month!"}
                          </h3>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          </>

          {/* Edit MOTH DATA */}
          <>
            <button
              ref={refEdit}
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop4"
              hidden
            >
              Launch static backdrop modal
            </button>
            {/* Modal */}
            <div
              className="modal fade"
              id="staticBackdrop4"
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
                      {monthname} {" / "} {Year}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      ref={refEditClose}
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

          {/* MOTH SHOW */}
          <>
            <>
              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel"
                tabIndex={-1}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalToggleLabel">
                        Select Month
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
                      <p className="card-text"></p>
                      <table className="table table-borderless text-center">
                        <tbody className="p-2">
                          <tr>
                            <td>
                              <button
                                className="btn p-2 btn-outline-info text-dark"
                                onClick={() => {
                                  ADDMONTH(1);
                                }}
                              >
                                JANUARY
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn p-2 btn-outline-info text-dark"
                                onClick={() => {
                                  ADDMONTH(2);
                                }}
                              >
                                FEBRUARY
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn p-2 btn-outline-info text-dark"
                                onClick={() => {
                                  ADDMONTH(3);
                                }}
                              >
                                MARCH
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn p-2 btn-outline-info text-dark"
                                onClick={() => {
                                  ADDMONTH(4);
                                }}
                              >
                                APRIL
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <button
                                className="btn p-2 btn-outline-info text-dark"
                                onClick={() => {
                                  ADDMONTH(5);
                                }}
                              >
                                MAY
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn p-2 btn-outline-info text-dark"
                                onClick={() => {
                                  ADDMONTH(6);
                                }}
                              >
                                JUNE
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn p-2 btn-outline-info text-dark"
                                onClick={() => {
                                  ADDMONTH(7);
                                }}
                              >
                                JULY
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn p-2 btn-outline-info text-dark"
                                onClick={() => {
                                  ADDMONTH(8);
                                }}
                              >
                                AUGUST
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <button
                                className="btn p-2 btn-outline-info text-dark"
                                onClick={() => {
                                  ADDMONTH(9);
                                }}
                              >
                                SEPTEMBER
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn p-2 btn-outline-info text-dark"
                                onClick={() => {
                                  ADDMONTH(10);
                                }}
                              >
                                OCTOBER
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn p-2 btn-outline-info text-dark"
                                onClick={() => {
                                  ADDMONTH(11);
                                }}
                              >
                                NOVEMBER
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn p-2 btn-outline-info text-dark"
                                onClick={() => {
                                  ADDMONTH(12);
                                }}
                              >
                                DECEMBER
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer"></div>
                  </div>
                </div>
              </div>
              <a
                className="btn btn-primary"
                data-bs-toggle="modal"
                href="#staticBackdrop"
                role="button"
                ref={ref}
                hidden
              >
                Open first modal
              </a>
            </>
          </>

          {/* Year */}
          <>
            <div className="row container-fluid">
              {AllAmount &&
                AllAmount.map((allamount, index) => {
                  return (
                    <div className="col-sm-3 p-2" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <h2 className="card-title">{allamount.year}</h2>
                          <p className="card-text text-success">
                            Total Credit Amount :-{" "}
                            {allamount.totalyearCRamount.toLocaleString()} Cr
                          </p>
                          <p className="card-text text-danger">
                            Total Credit Amount :-{" "}
                            {allamount.totalyearDRamount.toLocaleString()} Dr
                          </p>
                          <a
                            className="btn btn-primary"
                            onClick={() => {
                              ADDYEAR(Number(allamount.year));
                            }}
                          >
                            Go somewhere
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default Allamountitems;
