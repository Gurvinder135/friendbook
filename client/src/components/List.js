import React, { useState, useEffect } from "react";
import Confirm from "./Confirm";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "../server";
import CircularProgress from "@mui/material/CircularProgress";

function List({ list, username, handleView, friend }) {
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let temp = [];
    list.map((arr, index) => {
      let pause = 0;
      if (friend !== 1) {
        if (arr.username === username) {
          arr.status = "friend";
          temp = [arr, ...temp];
          pause = 1;
        }
      }
      if (friend !== 1) {
        if (pause === 0) {
          arr.friend.map((sm) => {
            if (sm.username === username) {
              arr.status = "friend";
              temp[index] = arr;
              pause = 1;
            }
          });
        }
      }
      if (friend === 1) {
        if (pause === 0) {
          arr.friend.map((sm) => {
            if (sm.username === username) {
              arr.status = "friend";
              temp = [arr, ...temp];
              pause = 1;
            }
          });
        }
      }
      if (pause === 0) {
        arr.pending.map((sm) => {
          if (sm.username === username) {
            arr.status = "sent";
            temp = [...temp, arr];
            pause = 1;
          }
        });
      }
      if (pause === 0) {
        arr.sentRequest.map((sm) => {
          if (sm.username === username) {
            arr.status = "pending";
            temp = [...temp, arr];
            pause = 1;
          }
        });
      }
      if (friend !== 1) {
        if (pause === 0) {
          arr.status = "user";
          temp = [...temp, arr];
        }
      }
    });
    setArr(temp);
  }, [list]);
  const updateRequest = async (status, self, third) => {
    setLoading(true);
    await axios.post(
      "/friend",
      { status, self, third },
      {
        withCredentials: true,
      }
    );
    setLoading(false);
  };
  const onclick = (ar, index) => {
    updateRequest("confirm", username, ar.username);
    const temp = [...arr];
    temp[index].status = "friend";
    setArr(temp);
  };
  return (
    <div className="list">
      {loading && <CircularProgress className="loading" />}
      {arr.length === 0 ? (
        <div>
          {loading === false && (
            <div className="profileName">No Friends to show!</div>
          )}
        </div>
      ) : (
        arr.map((ar, index) => {
          return (
            <div className="listHead" key={ar._id}>
              <div className="listLogo">{ar.firstname[0].toUpperCase()}</div>
              <div className="listName">
                <div className="listFname">
                  {ar.firstname + " " + ar.lastname}
                </div>
                <div className="listUname">{ar.username}</div>
              </div>
              <div className="listIcon">
                <div className="listicon">
                  {ar.status === "friend" && (
                    <AccountCircle
                      className="cursor"
                      onClick={() => {
                        handleView("profile1", {
                          firstname: ar.firstname,
                          lastname: ar.lastname,
                          username: ar.username,
                        });
                      }}
                    />
                  )}
                  {ar.status === "pending" && (
                    <Confirm
                      onclick={() => {
                        onclick(ar, index);
                      }}
                      status={"Confirm Request"}
                    />
                  )}
                  {ar.status === "sent" && <Confirm status={"Requested"} />}
                  {ar.status === "user" && (
                    <PersonAddIcon
                      className="cursor"
                      onClick={() => {
                        updateRequest("sent", username, ar.username);
                        const temp = [...arr];
                        temp[index].status = "sent";
                        setArr(temp);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default List;
