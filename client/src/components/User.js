import React from "react";
import Header from "./Header";
import Profile from "./Profile";
import List from "./List";
import Comment from "./Comment";
import axios from "../server";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
function User() {
  const [isAuth, setIsAuth] = useState({});
  const [loading, setLoading] = useState(false);
  const [tempAuth, setTempIsAuth] = useState({});
  const [isHomepage, setIsHomepage] = useState(true);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const search = async (query) => {
    setLoading(true);
    const result = await axios.post(
      "/search",
      { query },
      {
        withCredentials: true,
      }
    );
    setLoading(false);
    setList(result.data);
  };
  const fetchAuth = async () => {
    setLoading(true);
    const result = await axios.get("/isAuthenticate", {
      withCredentials: true,
    });
    console.log(result.data);
    setLoading(false);
    if (!result.data.auth) {
      navigate("/login");
    } else {
      setIsAuth(result.data);
      console.log(isAuth);
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  const handleView = (view, value = null) => {
    if (view === "profile1") {
      let temp = {
        username: value.username,
        firstname: value.firstname,
        lastname: value.lastname,
      };
      setTempIsAuth(temp);
      setIsHomepage(false);
    } else if (view === "profile") {
      setTempIsAuth(isAuth);
      setIsHomepage(false);
    } else if (view === "homepage") {
      fetchAuth();
      setIsHomepage(true);
    } else if (view === "search") {
      search(value);
      setIsHomepage(1);
    } else if (view === "friend") {
      search("");
      setIsHomepage(2);
    }
  };
  console.log(isAuth.username);
  return (
    <div>
      {loading && <CircularProgress className="loading" />}
      {isAuth.username && (
        <div>
          <Header handleView={handleView} />
          {isHomepage === true && (
            <Comment
              firstname={isAuth.firstname}
              lastname={isAuth.lastname}
              username={isAuth.username}
              comment={isAuth.comment}
            />
          )}
          {isHomepage === false && (
            <Profile
              username={tempAuth.username}
              firstname={tempAuth.firstname}
              lastname={tempAuth.lastname}
            />
          )}
          {isHomepage === 1 && (
            <List
              list={list}
              username={isAuth.username}
              handleView={handleView}
            />
          )}
          {isHomepage === 2 && (
            <List
              list={list}
              username={isAuth.username}
              handleView={handleView}
              friend={1}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default User;
