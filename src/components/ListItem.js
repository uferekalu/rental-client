import React, { useState } from "react";

const ListItem = ({ item }) => {
  const [appearance, setAppearance] = useState("gray");
  const [listData, setListData] = useState('')
  console.log("this is listData", listData)

  const handleChange = (e) => {
      setListData({
          ...listData,
          [e.target.name]: e.target.value
      })
  }

  return (
    <div>
      <li
        className={appearance}
        onClick={() =>
          setAppearance(
            appearance => (appearance === "lightgreen" ? "gray" : "lightgreen")
          )}
          onChange={handleChange}
      >
        {item.status}
      </li>
    </div>
  );
};

export default ListItem;
