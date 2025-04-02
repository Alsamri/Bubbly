import GenderCheck from "./GenderCheck";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup
          <span className="text-amber-900"> Bubbly</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="test-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name :)"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="test-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="test-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="test-base label-text">Confirm password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <GenderCheck />

          <a
            href="%"
            className="text-sm hover:underline hover:text-amber-700 mt-2 inline-block"
          >
            Already have an account?
          </a>
          <div>
            <button className="btn btn-block btn:sm mt-2 border-slate-700">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
