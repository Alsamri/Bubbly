import { IoSearch } from "react-icons/io5";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import useConvo, { ConversationType } from "../zustand/useConvo";
import useGetConvo from "../hooks/useGetConvo";
import { debounce } from "lodash";
const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<ConversationType[]>([]);
  const { setSelectedConvo } = useConvo();
  const { conversations: users, loading } = useGetConvo();

  // Debounce search to prevent rapid firing
  const handleSearchChange = useCallback(
    debounce((query: string) => {
      if (!query || query.length < 3) {
        setFilteredUsers([]);
        return;
      }

      const matches = users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query)
      );
      setFilteredUsers(matches);
    }, 300),
    [users]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    handleSearchChange(query.toLowerCase());
  };

  const handleSelectUser = (user: ConversationType) => {
    setSelectedConvo(user);
    setSearch("");
    setFilteredUsers([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = search.trim().toLowerCase();

    if (!query || query.length < 3) {
      toast.error("Search requires at least 3 characters");
      return;
    }

    try {
      const match = users.find(
        (user) =>
          user.fullName.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query)
      );

      if (match) {
        setSelectedConvo(match);
      } else {
        toast.error("No user found");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col relative items-center gap-2"
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search.."
          className="input input-bordered rounded-full w-full"
          value={search}
          onChange={handleInputChange}
          disabled={loading}
        />
        {/* Dropdown results */}
        {filteredUsers.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => handleSelectUser(user)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.fullName}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-circle bg-amber-600 text-white"
        disabled={loading}
      >
        <IoSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default Searchbar;
