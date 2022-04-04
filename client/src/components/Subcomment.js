import React from "react";

function Subcomment({ subcomment }) {
  return (
    <div>
      {subcomment &&
        subcomment.map((arr) => {
          return (
            <div className="commentHead new" key={arr._id}>
              <div className="commentLogo new">
                {arr.firstname[0].toUpperCase()}
              </div>
              <div className="commentBox">
                <div className="commentTitle new">{`${arr.firstname} ${arr.lastname}`}</div>
                <div className="commentMini">{arr.comment}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Subcomment;
