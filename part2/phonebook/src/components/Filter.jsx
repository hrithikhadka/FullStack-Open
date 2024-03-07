import React from "react";

//Filter
const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter shown wtih <input onChange={handleFilter} />
    </div>
  );
};

export default Filter;
