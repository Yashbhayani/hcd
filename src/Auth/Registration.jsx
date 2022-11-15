import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register, otpverification } from "../API/ApiRouter";

const Registration = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("token") ? navigate("/") : navigate("/signup");
  }, []);

  const [Fhide, setFhide] = useState(false);

  const [userotp, setuserotp] = useState();
  const [token, settoken] = useState();
  const [sentmail, setsentmail] = useState();
  const [Firstname, setFirstname] = useState();
  const [Lastname, setLastname] = useState();
  const [email, setemail] = useState();
  const [mobile, setmobile] = useState();
  const [gender, setgender] = useState();
  const [Birthdate, setBirthdate] = useState();
  const [password, setpassword] = useState();
  const [conformationpassword, setconformationPassword] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const [conformationpasswordType, setconformationPasswordType] =
    useState("password");
  const [OTP, setOTP] = useState("");
  const togglepasswordType = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const toggleconformationpasswordType = () => {
    conformationpasswordType === "password"
      ? setconformationPasswordType("text")
      : setconformationPasswordType("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === conformationpassword) {
      let formdata = {
        Firstname: Firstname,
        Lastname: Lastname,
        mobile: mobile,
        email: email,
        Birthdate: Birthdate,
        gender: gender,
        password: password,
      };
      const response = await fetch(register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const json = await response.json();
      if (json.success) {
        setuserotp(json.OTP);
        settoken(json.authToken);
        setsentmail(email);
        setFirstname();
        setLastname();
        setpassword();
        setmobile();
        setemail();
        setBirthdate();
        setconformationPassword();
        setFhide(true);
        props.showAlert("Account Created Successfully", "success");
      } else {
        props.showAlert(json.error, "danger");
      }
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
      if (json.success) {
        localStorage.setItem("token", token);
        props.showAlert("Account Created Successfully", "success");
        navigate("/");
        Fhide(false);
      }
      props.showAlert(json.error, "danger");
      Fhide(true);
    }
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
          <div className="container h-96 p-3">
            <div className="row d-flex justify-content-center align-items-center h-96 p-2">
              <div className="col-lg-8 col-xl-10 gap-3">
                <div className="card text-black" style={{ borderRadius: 25 }}>
                  <div className="card-body p-md-5">
                    <form className="row g-3" id="ADD" onSubmit={handleSubmit}>
                      <div className="col-md-4">
                        <label htmlFor="inputuser" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          value={Firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="inputuser" className="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          value={Lastname}
                          onChange={(e) => setLastname(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="inputMobile" className="form-label">
                          Mobile Number
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          value={mobile}
                          pattern="[789][0-9]{9}"
                          onChange={(e) => setmobile(e.target.value)}
                          id="inputMobile"
                          required
                        />
                      </div>
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
                      <div className="col-md-4">
                        <label htmlFor="inputEmail4" className="form-label">
                          Birthdate
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          value={Birthdate}
                          onChange={(e) => setBirthdate(e.target.value)}
                          id="inputEmail4"
                          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="inputxender" className="form-label">
                          Select Gender
                        </label>
                        <select
                          id="inputGender"
                          value={gender}
                          onChange={(e) => setgender(e.target.value)}
                          className="form-select"
                        >
                          <option selected disabled>
                            Select
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                      <div className="col-md-4">
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
                      <div className="col-md-4">
                        <label htmlFor="inputPassword5" className="form-label">
                          Connformation Password
                        </label>
                        <div className="input-group">
                          <input
                            type={conformationpasswordType}
                            className="form-control"
                            value={conformationpassword}
                            onChange={(e) =>
                              setconformationPassword(e.target.value)
                            }
                            id="inputPassword5"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            required
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-white bg-transparent text-dark"
                              type="button"
                              onClick={toggleconformationpasswordType}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {conformationpasswordType === "password" ? (
                                <i className="bi bi-eye-slash"></i>
                              ) : (
                                <i className="bi bi-eye"></i>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Sign in
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

export default Registration;
