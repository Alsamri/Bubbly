import Searchbar from "./Searchbar";
import Conversationlist from "./Conversationlist";
import LogoutBtn from "./LogoutBtn";
const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex-col">
      <Searchbar />
      <div className="divider px-3"></div>
      <Conversationlist />
      <LogoutBtn />
    </div>
  );
};

export default Sidebar;
