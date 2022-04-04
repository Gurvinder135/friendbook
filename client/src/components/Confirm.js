import React from "react";

function Confirm({ status, onclick }) {
  return (
    <div onClick={onclick} className="confirm">
      {status}
    </div>
  );
}

export default Confirm;
