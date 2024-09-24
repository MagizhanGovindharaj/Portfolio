import React from "react";

function Button({ day_night, name, type}) {
  return (
    <button
      style={{
        height: "50px",
        width: "126px",
        borderRadius: "20px",
        fontSize: "20px",
        fontWeight: "700",
        border: "none",
        background: `${day_night ? "white" : "#00b5ff"}`,
        color: `${day_night ? "#222" : "white"}`,
      }}
      type={type}
    >
      {name}
    </button>
  );
}

export default Button;
