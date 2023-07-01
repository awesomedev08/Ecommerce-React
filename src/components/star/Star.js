import React from "react";
import starFilled from "../../assets/icon/ant-design_star-filled.svg";

import starUnFilled from "../../assets/icon/ant-design_star-un-filled.svg";
function Star({ number }) {
  let icon = [];

  for (let i = 0; i < number; i++) {
    icon.push(<img src={starFilled}></img>);
  }

  if (number < 5) {
    let number2 = number - 5;
    for (let i = 0; i < number2; i++) {
      icon.push(<img src={starUnFilled}></img>);
    }
  }
  return <div>{icon}</div>;
}

export default Star;
