import React from "react";
import { useState } from "react";
import axios from "../server";
import Subcomment from "./Subcomment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Likelist from "./Likelist";
import CircularProgress from "@mui/material/CircularProgress";

function Comment({ firstname, lastname, comment, username }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [subInput, setSubInput] = useState([]);
  const [array, setArray] = useState(comment);
  const [comIn, setComIn] = useState([]);
  const [comList, setComList] = useState([]);

  const [likearr, setLikearr] = useState([]);

  const removeComment = (id, index) => {
    setLoading(true);
    let temp = [...subInput];
    temp.splice(index, 1);
    axios
      .delete(
        `/deleteComment/${username}/${id}`,

        { withCredentials: true }
      )
      .then((result) => {
        setLoading(false);
        setArray(result.data);

        setSubInput(temp);
      });
  };

  const postComment = (e) => {
    e.preventDefault();
    if (input.length > 0) {
      setLoading(true);
      axios
        .post(
          "/postComment",
          {
            username,
            input,
          },
          { withCredentials: true }
        )
        .then((result) => {
          setLoading(false);
          setArray(result.data);
        });
      let temp = ["", ...subInput];
      setSubInput(temp);
      setInput("");
    }
  };

  const postSubComment = (e, index, _id) => {
    e.preventDefault();
    setComList[index] = true;
    if (subInput[index].length > 0) {
      let temp = [...subInput];
      temp[index] = "";
      setLoading(true);
      axios
        .post(
          "/postsubComment",
          {
            username,
            subInput: subInput[index],
            _id: _id,
            id: e.target.parentElement.id,
          },
          { withCredentials: true }
        )
        .then((result) => {
          setLoading(false);
          setArray(result.data);
        });
      setSubInput(temp);
    }
  };

  const like = (firstname, lastname, username, cuser, id) => {
    setLoading(true);
    axios
      .post(
        "/like",
        {
          firstname,
          lastname,
          username,
          cuser,
          id,
        },
        { withCredentials: true }
      )
      .then((result) => {
        setLoading(false);
        setArray(result.data);
      });
  };

  const likeList = () => {
    setLikearr([]);
  };

  return (
    <div className="comment">
      {loading && <CircularProgress className="loading" />}
      <form className="commentForm">
        <textarea
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="commentInput"
          cols="50"
          rows="1"
          placeholder="Comment"
          value={input}
        ></textarea>
        <button
          onClick={(e) => postComment(e)}
          value="Submit"
          className="commentButton"
        >
          Submit
        </button>
      </form>
      {array.map((arr, index) => {
        return (
          <form className="commentForm" id={arr.userId} key={arr._id}>
            <div className="commentHead">
              <div className="commentLogo">
                {arr.firstname[0].toUpperCase()}
              </div>
              <div className="commentTitle">{`${arr.firstname} ${arr.lastname}`}</div>
              <div className="removeIcon">
                {username === arr.username ? (
                  <DeleteForeverIcon
                    onClick={() => {
                      removeComment(arr._id, index);
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="commentText">{arr.comment}</div>
            <div className="likeBox">
              <div
                className="like"
                onClick={() => {
                  let temp = [...arr.likes];
                  console.log(temp);
                  setLikearr(temp);
                }}
              >
                <ThumbUpIcon /> <div>{arr.likes.length}</div>
              </div>
              <div
                className="commentBox1"
                onClick={() => {
                  console.log(comList, array);
                  if (comList[index] === true) {
                    let templi = [...comList];
                    templi[index] = false;
                    let tempin = [...comIn];
                    tempin[index] = false;
                    setComList(templi);
                    setComIn(tempin);
                  } else {
                    let templi = [...comList];
                    templi[index] = true;
                    let tempin = [...comIn];
                    tempin[index] = true;
                    setComList(templi);
                    setComIn(tempin);
                  }
                }}
              >{`${arr.subcomment.length} Comments`}</div>
            </div>

            <hr></hr>
            <div className="likeBox2">
              <div
                className="like2"
                onClick={() => {
                  like(firstname, lastname, username, arr.username, arr._id);
                }}
              >
                {arr.like === true ? (
                  <>
                    <ThumbUpIcon className="colorBlue" />
                    <div className="colorBlue"> liked</div>
                  </>
                ) : (
                  <>
                    <ThumbUpIcon /> <div> like</div>
                  </>
                )}
              </div>
              <div
                className="commentBox2"
                onClick={() => {
                  if (comIn[index] === true) {
                    let tempin = [...comIn];
                    tempin[index] = false;
                    setComIn(tempin);
                  } else {
                    let tempin = [...comIn];
                    tempin[index] = true;
                    setComIn(tempin);
                  }
                }}
              >
                <ChatBubbleOutlineIcon /> <div>Comment</div>
              </div>
            </div>
            <hr></hr>
            {comList[index] ? (
              <Subcomment subcomment={arr.subcomment} />
            ) : (
              <></>
            )}

            {comIn[index] ? (
              <>
                <textarea
                  onChange={(e) => {
                    let temp = [...subInput];
                    temp[index] = e.target.value;
                    setSubInput(temp);
                  }}
                  className="commentInput new"
                  cols="40"
                  rows="1"
                  placeholder="Comment"
                  value={subInput[index]}
                ></textarea>
                <button
                  onClick={(e) => postSubComment(e, index, arr._id)}
                  value="Submit"
                  className="commentButton new"
                >
                  Submit
                </button>
              </>
            ) : (
              <></>
            )}
            {likearr.length > 0 && <Likelist ar={likearr} list={likeList} />}
          </form>
        );
      })}
    </div>
  );
}

export default Comment;
