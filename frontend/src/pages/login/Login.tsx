const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          login
          <span className="text-amber-900"> Bubbly</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordared h-10"
            ></input>
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordared h-10"
            />
          </div>
          <a
            href="%"
            className="text-sm hover:underline hover:text-amber-700 mt-2 inline-block"
          >
            {"Dont't"} have an account?
          </a>
          <div>
            <button className="btn btn-block btn:sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
