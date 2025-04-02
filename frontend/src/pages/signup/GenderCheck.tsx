import React from "react";

const GenderCheck = () => {
  return (
    <div className="flex mt-3">
      <div className="form-control mr-2">
        <label className={"label gap-2 cursor-pointer"}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-warning"
          />
        </label>
      </div>
      <div className="form-control">
        <label className={"label gap-2 cursor-pointer"}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-warning"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheck;
