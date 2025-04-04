import { Link } from "react-router-dom";
import GenderCheck from "./GenderCheck";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(input);
  };
  const handleGenderBox = (gender: string) => {
    setInput({ ...input, gender });
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0">
        <h1 className="text-5xl font-extrabold text-amber-700 text-center drop-shadow-md tracking-wide">
          Bubbly
        </h1>
        <h2 className="text-3xl font-semibold text-center text-gray-300 mt-2">
          Signup
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your name :)"
              className="w-full h-10 px-3 rounded-md bg-gray-200 border border-gray-600 focus:outline-none focus:border-amber-700"
              value={input.fullName}
              onChange={(e) => setInput({ ...input, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your Username"
              className="w-full h-10 px-3 rounded-md bg-gray-200 border border-gray-600 focus:outline-none focus:border-amber-700"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full h-10 px-3 rounded-md bg-gray-200 border border-gray-600 focus:outline-none focus:border-amber-700"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Re-type password"
              className="w-full h-10 px-3 rounded-md bg-gray-200 border border-gray-600 focus:outline-none focus:border-amber-700"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheck
            selectGender={input.gender}
            handleGenderBox={handleGenderBox}
          />

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-amber-700 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block mt-2 bg-amber-700 text-white hover:bg-amber-800"
              disabled={loading}
            >
              {loading ? "loading..." : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
