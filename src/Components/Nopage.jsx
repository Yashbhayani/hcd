import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Nopage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, []);
  return <div>Nopage</div>;
};

export default Nopage;
