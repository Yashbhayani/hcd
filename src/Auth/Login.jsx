import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, otpverification } from "../API/ApiRouter";

const Login = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("token") ? navigate("/") : navigate("/login");
  }, []);

  const [Fhide, setFhide] = useState(false);

  const [sentmail, setsentmail] = useState();
  const [OTP, setOTP] = useState("");

  const [userotp, setuserotp] = useState();
  const [token, settoken] = useState();

  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [passwordType, setPasswordType] = useState("password");

  const togglepasswordType = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = {
      email: email,
      password: password,
    };

    const response = await fetch(login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const json = await response.json();

    if (json.success) {
      if (json.OTPSUCCESS) {
        console.log(json);
        localStorage.setItem("token", json.authToken);
        props.showAlert("Login Successfully", "success");
        navigate("/");
        Fhide(false);
      } else {
        setuserotp(json.OTP);
        settoken(json.authToken);
        setsentmail(email);
        setemail();
        setpassword();
        setFhide(true);
        props.showAlert("Login Successfully", "success");
      }
    } else {
      console.log(json);
      props.showAlert(json.errors, "danger");
    }
  };

  const OTPconirm = async (e) => {
    e.preventDefault();
    let setd = {
      OTP: OTP,
    };
    if (OTP.length === 4 && userotp === OTP) {
      const response = await fetch(otpverification, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(setd),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", token);
        props.showAlert("Account Created Successfully", "success");
        navigate("/");
        Fhide(false);
      } else {
        console.log(json);
        props.showAlert(json.error, "danger");
      }
    } else {
      props.showAlert("OTP is not Correct", "danger");
    }
    Fhide(true);
  };

  return (
    <div className="container-fluid">
      {Fhide ? (
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="row g-3" onSubmit={OTPconirm}>
              <div className="modal-body">
                <div className="col-md-10">
                  <label htmlFor="inputuser" className="form-label">
                    OTP sent to this mail address {sentmail}
                  </label>
                  <input
                    type="text"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    className="form-control"
                    maxLength={4}
                    required
                  />
                </div>
                <div className="col-12 p-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={OTP.length < 4}
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <section className="vh-10 p-3">
          <div className="container h-10 p-3">
            <div className="row d-flex justify-content-center align-items-center h-10 p-2">
              <div className="col-lg-8 col-xl-8 gap-3">
                <div className="card text-black" style={{ borderRadius: 25 }}>
                  <div className="card-body p-md-5">
                    <form className="row g-3" id="ADD" onSubmit={handleSubmit}>
                      <div className="col-md-7">
                        <label htmlFor="inputEmail4" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          id="inputEmail4"
                          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                          required
                        />
                      </div>
                      <div className="col-md-7">
                        <label htmlFor="inputPassword4" className="form-label">
                          Password
                        </label>
                        <div className="input-group">
                          <input
                            type={passwordType}
                            className="form-control"
                            id="inputPassword4"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            required
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-white bg-transparent text-dark"
                              type="button"
                              onClick={togglepasswordType}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {passwordType === "password" ? (
                                <i
                                  className="bi bi-eye-slash bg-white text-dark"
                                  style={{}}
                                ></i>
                              ) : (
                                <i className="bi bi-eye bg-white text-dark"></i>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Login;
