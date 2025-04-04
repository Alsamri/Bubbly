const GenderCheck = ({
  selectGender,
  handleGenderBox,
}: {
  selectGender: string;
  handleGenderBox: (gender: string) => void;
}) => {
  return (
    <div className="flex mt-3">
      <div className="form-control mr-2">
        <label className={"label gap-2 cursor-pointer"}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox checkbox-warning"
            checked={selectGender === "female"}
            onChange={() => handleGenderBox("female")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={"label gap-2 cursor-pointer"}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox checkbox-warning"
            checked={selectGender === "male"}
            onChange={() => handleGenderBox("male")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheck;
