import React, { useState } from "react";
import Homecontex from "./HomeContext";
import {
  amount,
  getamount,
  updateamount,
  deleteamount,
  getallamount,
  getselectedamount,
  updateselectedamount,
  deleteselectedamount,
  addfeedback,
  getfeedback,
} from "../../API/ApiRouter";

const HomeState = (props) => {
  const notesIntial = [];
  const [USERAmount, setUSERAmount] = useState(notesIntial);
  const [UserINFO, setUserINFO] = useState(notesIntial);
  const [TodayCrAmount, setTodayCrAmount] = useState("");
  const [TodayDrAmount, setTodayDrAmount] = useState("");
  const [TodayCrAmountS, setTodayCrAmountS] = useState("");
  const [TodayDrAmountS, setTodayDrAmountS] = useState("");
  const [AllAmount, setAllAmount] = useState(notesIntial);
  const [CRdata, setCRdata] = useState();
  const [DRdata, setDRdata] = useState();
  const [CRdataS, setCRdataS] = useState();
  const [DRdataS, setDRdataS] = useState();
  const [AllMonthAmount, setAllMonthAmount] = useState();
  const [AllMonthCrData, setAllMonthCrData] = useState();
  const [AllMonthDrData, setAllMonthDrData] = useState();
  const [AllMonthCrDataS, setAllMonthCrDataS] = useState();
  const [AllMonthDrDataS, setAllMonthDrDataS] = useState();
  const [ReadFeedbackdata, setReadFeedbackdata] = useState(notesIntial);

  //Addamount
  const AddAmount = async (formdata) => {
    const response = await fetch(amount, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(formdata),
    });
    const json = await response.json();
    if (json.success) {
      /*   let ndata = {
        Title: formdata.Title,
        Amount: formdata.Amount,
        Amount_type: formdata.Amounttype,
        Description: formdata.Description,
      };
      setUSERAmount(USERAmount.concat(ndata));

      if (formdata.Amounttype === "Cr") {
        setTodayCrAmount(TodayCrAmount + formdata.Amount);
      }*/
      GetAmount();
    } else {
      if (json.Auth) {
        localStorage.removeItem("token");
      }
    }
  };

  const GetAmount = async () => {
    const response = await fetch(getamount, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    if (json.success) {
      setUSERAmount(json.amount);
      setUserINFO(json.user);
      setTodayCrAmountS(json.totaltodayCRamount.toLocaleString());
      setTodayDrAmountS(json.totaltodayDRamount.toLocaleString());
      setTodayCrAmount(json.totaltodayCRamount);
      setTodayDrAmount(json.totaltodayDRamount);
    } else {
      if (json.Auth) {
        localStorage.removeItem("token");
      }
    }
  };

  const EDITAmount = async (formdata) => {
    const response = await fetch(`${updateamount}/${formdata._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(formdata),
    });
    const json = await response.json();
    if (json.success) {
      GetAmount();
    } else {
      if (json.Auth) {
        localStorage.removeItem("token");
      }
    }
  };

  const DeleteAmount = async (Courseid) => {
    const response = await fetch(`${deleteamount}/${Courseid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ Courseid }),
    });
    const json = await response.json();
    if (json.success) {
      /*   const newUserA = USERAmount.filter((useram) => {
        return useram._id !== Courseid;
      });
      setUSERAmount(newUserA);*/
      GetAmount();
    } else {
      if (json.Auth) {
        localStorage.removeItem("token");
      }
    }
  };

  const GetAllAmount = async () => {
    const response = await fetch(getallamount, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.success) {
      setAllAmount(json.Allamount);
      setCRdataS(json.USERFULLCRDATAAMOUNT.toLocaleString());
      setDRdataS(json.USERFULLDRDATAAMOUNT.toLocaleString());
      setCRdata(json.USERFULLCRDATAAMOUNT);
      setDRdata(json.USERFULLDRDATAAMOUNT);
    } else {
      if (json.Auth) {
        localStorage.removeItem("token");
      }
    }
  };

  const GetSelectTIME = async (year, month) => {
    const response = await fetch(getselectedamount, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ year, month }),
    });
    const json = await response.json();
    if (json.success) {
      setAllMonthAmount(json.Allmonthdata);
      setAllMonthCrData(json.USERFULLMONTHCRDATAAMOUNT);
      setAllMonthDrData(json.USERFULLMONTHDRDATAAMOUNT);
      setAllMonthCrDataS(json.USERFULLMONTHCRDATAAMOUNT.toLocaleString());
      setAllMonthDrDataS(json.USERFULLMONTHDRDATAAMOUNT.toLocaleString());
    } else {
      if (json.Auth) {
        localStorage.removeItem("token");
      }
    }
  };

  const EDITSelectTIMEAmount = async (formdata) => {
    const response = await fetch(`${updateselectedamount}/${formdata._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(formdata),
    });
    const json = await response.json();
    if (json.success) {
      GetSelectTIME(formdata.Year, formdata.Month);
    } else {
      if (json.Auth) {
        localStorage.removeItem("token");
      }
    }
  };

  const DELETESelectTIMEAmount = async (Courseid, Year, Month) => {
    const response = await fetch(`${deleteselectedamount}/${Courseid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ Courseid }),
    });
    const json = await response.json();
    if (json.success) {
      GetSelectTIME(Year, Month);
    } else {
      if (json.Auth) {
        localStorage.removeItem("token");
      }
    }
  };

  const AddFeedback = async (formdata) => {
    const response = await fetch(addfeedback, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(formdata),
    });
    const json = await response.json();
    if (json.success) {
      GetAmount();
    } else {
      if (json.Auth) {
        localStorage.removeItem("token");
      }
    }
  };

  const GetFeedback = async () => {
    const response = await fetch(getfeedback, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    if (json.success) {
      setReadFeedbackdata(json.data);
    } else {
      if (json.Auth) {
        localStorage.removeItem("token");
      }
    }
  };
  return (
    <Homecontex.Provider
      value={{
        AddAmount,
        GetAmount,
        USERAmount,
        EDITAmount,
        DeleteAmount,
        UserINFO,
        TodayCrAmountS,
        TodayDrAmountS,
        TodayCrAmount,
        TodayDrAmount,
        GetAllAmount,
        AllAmount,
        CRdataS,
        DRdataS,
        CRdata,
        DRdata,
        GetSelectTIME,
        AllMonthAmount,
        setAllMonthAmount,
        AllMonthCrData,
        setAllMonthCrData,
        AllMonthCrDataS,
        AllMonthDrData,
        setAllMonthDrData,
        AllMonthDrDataS,
        EDITSelectTIMEAmount,
        DELETESelectTIMEAmount,
        AddFeedback,
        GetFeedback,
        ReadFeedbackdata,
      }}
    >
      {props.children}
    </Homecontex.Provider>
  );
};

export default HomeState;
