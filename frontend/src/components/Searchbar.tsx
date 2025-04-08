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

  const filterUsers = (query: string) => {
    if (!query) return [];
    return users.filter((user) => {
      const name = user.fullName?.toLowerCase() || "";
      const username = user.username?.toLowerCase() || "";
      return name.includes(query) || username.includes(query);
    });
  };

  const handleSearchChange = useCallback(
    debounce((query: string) => {
      setFilteredUsers(filterUsers(query));
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
    try {
      const matches = filterUsers(query);
      if (matches.length > 0) {
        setSelectedConvo(matches[0]);
        setSearch("");
        setFilteredUsers([]);
      } else {
        toast.error("No user found 🥲");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed 😞");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-2 w-full"
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="✨ Search for friends..."
          className="w-full px-4 py-2 rounded-full bg-white text-gray-800 placeholder:text-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow shadow-md"
          value={search}
          onChange={handleInputChange}
          disabled={loading}
        />
        {filteredUsers.length > 0 && (
          <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-xl shadow-xl mt-2 max-h-60 overflow-auto">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="cursor-pointer px-4 py-2 hover:bg-amber-100 transition-colors"
                onClick={() => handleSelectUser(user)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-800">{user.fullName}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="bg-amber-500 hover:bg-amber-600 text-white rounded-full p-3 shadow-md transition-colors"
        disabled={loading}
      >
        <IoSearch className="w-5 h-5" />
      </button>
    </form>
  );
};

export default Searchbar;
