import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const { loading, login } = useLogin();
  const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(input.username, input.password);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-5xl font-extrabold text-amber-700 text-center drop-shadow-md tracking-wide">
          Bubbly
        </h1>
        <h2 className="text-3xl font-semibold text-center text-gray-300 mt-2">
          login
        </h2>
        <form onSubmit={handleChange}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full h-10 px-3 rounded-md bg-gray-200  border border-gray-600 focus:outline-none focus:border-amber-700"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-gray-200">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full h-10 px-3 rounded-md bg-gray-200  border border-gray-600 focus:outline-none focus:border-amber-700"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>
          <Link
            to={"/Signup"}
            className="text-sm hover:underline hover:text-amber-700 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <div>
            <button
              className="btn btn-block mt-2 bg-amber-700 text-white hover:bg-amber-800"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
