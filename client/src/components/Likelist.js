import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";

function Likelist({ ar, list }) {
  return (
    <div className="likelistCont">
      <div className="likelist">
        <CancelIcon onClick={list} />
        {ar.map((arr) => {
          return (
            <div className="likelist1" key={arr._id}>
              <div className="logoLike">{arr.firstname[0].toUpperCase()}</div>
              <div className="likeName">
                {arr.firstname + " " + arr.lastname}
                <hr></hr>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Likelist;
