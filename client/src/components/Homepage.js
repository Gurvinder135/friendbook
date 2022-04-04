import * as React from "react";
import Login from "./Login";
import Register from "./Register";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import axios from "../server";
import CircularProgress from "@mui/material/CircularProgress";
export default function Homepage() {
  const [loginClicked, setLoginClicked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMEssage, setToastmessage] = useState("");
  const navigate = useNavigate();
  const buttonClick = async (
    e,
    username = null,
    password = null,
    firstname = null,
    lastname = null
  ) => {
    if (e.target.textContent === "Test Drive Without Login!") {
      setLoading(true);
      let result = await axios.post(
        "/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      if (result.status === 200) {
        navigate("/");
      }
      setLoginClicked(true);
    } else if (e.target.textContent === "Login") {
      if (loginClicked === true) {
        if (username === "" || password === "") {
          setToastmessage("Please provide all required Inputs !!!");
          setOpenToast(true);
        } else {
          setLoading(true);
          let result = await axios.post(
            "/login",
            {
              username,
              password,
            },
            { withCredentials: true }
          );
          setLoading(false);
          if (
            result.data === "Username Not Found !!!" ||
            result.data === "Wrong Password !!!"
          ) {
            setToastmessage(result.data);
            setOpenToast(true);
          } else if (result.status === 200) {
            navigate("/");
          }
        }
      }
      setLoginClicked(true);
    } else if (e.target.textContent === "Create New Account") {
      if (loginClicked === false) {
        if (
          username === "" ||
          password === "" ||
          firstname === "" ||
          lastname === ""
        ) {
          setToastmessage("Please provide all required Inputs !!!");
          setOpenToast(true);
          setLoginClicked(false);
        } else {
          setLoading(true);
          axios
            .post(
              "/register",
              {
                username,
                password,
                firstname,
                lastname,
              },
              { withCredentials: true }
            )
            .then((result) => {
              setLoading(false);
              setToastmessage("Registered Sucessfully, Please Login !!!");
              setOpenToast(true);
              setLoginClicked(true);
            });
        }
      } else setLoginClicked(false);
    }
  };

  const handleClose = () => {
    setOpenToast(false);
    setToastmessage("");
  };

  return (
    <div className="homepage">
      <div className="homepage_firstCont">
        <div className="homepage_logo">friendbook</div>
        <div className="homepage_text">
          Friendbook helps you connect and share with the people in your life.
        </div>
      </div>
      {loginClicked ? (
        <div>
          {loading && <CircularProgress className="loading" />}
          <Login buttonClick={buttonClick} />
        </div>
      ) : (
        <div>
          {loading && <CircularProgress className="loading" />}
          <Register buttonClick={buttonClick} />
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openToast}
        onClose={handleClose}
        message={toastMEssage}
        autoHideDuration={3000}
      />
    </div>
  );
}
