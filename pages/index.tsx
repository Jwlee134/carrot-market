import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <form className="flex flex-col p-5 ">
      <input
        type="text"
        required
        placeholder="username"
        className="peer rounded-md border border-gray-400 p-1 "
      />
      <span className="hidden peer-invalid:block peer-invalid:text-red-500">
        This input is invalid.
      </span>
      <span className="hidden peer-hover:block">Hello.</span>
      <input type="submit" value="login" />
    </form>
  );
};

export default Home;
