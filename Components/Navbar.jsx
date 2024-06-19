
import { LuListTodo } from "react-icons/lu";
import { GoRepoForked } from "react-icons/go";
const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="logo lg:text-3xl flex items-center gap-2 bg-slate-200 text-black p-2 rounded-md cursor-pointer text-xl font-bold">
        <LuListTodo />
        <span>27Notes</span>
      </h1>
      <a
        href=""
        className="text-lg flex items-center gap-2 underline text-blue-600"
      >
        <GoRepoForked />
        <span>Fork</span>
      </a>
    </div>
  );
};

export default Navbar;
