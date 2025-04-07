import { IoSearch } from "react-icons/io5";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import useConvo, { ConversationType } from "../zustand/useConvo";

import { debounce } from "lodash";
import useAllUsers from "../hooks/useAllUsers";
import { useAuthContext } from "../context/Authcontext"; // Import the AuthContext

const Searchbar = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<ConversationType[]>([]);
  const { setSelectedConvo } = useConvo();
  const { users, loading } = useAllUsers();
  const { authUser } = useAuthContext();

  const handleSearchChange = useCallback(
    debounce((query: string) => {
      if (!query) {
        setFilteredUsers([]);
        return;
      }

      const filtered = users.filter(
        (user) =>
          user.id !== authUser?.id &&
          user.fullName.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }, 300),
    [users, authUser]
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

    if (!query) {
      toast.error("Please enter a valid search term");
      return;
    }

    try {
      const match = users.find(
        (user) =>
          user.id !== authUser?.id &&
          user.fullName.toLowerCase().includes(query)
      );

      if (match) {
        setSelectedConvo(match);
      } else {
        toast.error("No user found");
      }
    } catch (error: any) {
      console.error("Search error:", error);
      toast.error("Search failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col items-center gap-2 w-full"
    >
      <div className="relative w-full">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for users..."
          className="input input-bordered w-full rounded-full pl-10 pr-4 py-2 text-sm text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
          value={search}
          onChange={handleInputChange}
          disabled={loading}
        />
        {/* Search Icon */}
        <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />

        {/* Dropdown results */}
        {filteredUsers.length > 0 && (
          <ul className="absolute z-10 w-full bg-gray-200 border rounded-md shadow-lg mt-1 max-h-60 overflow-auto rounded-b-lg">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="cursor-pointer p-3 hover:bg-gray-200 flex items-center gap-3"
                onClick={() => handleSelectUser(user)}
              >
                <img
                  src={user.profilePic}
                  alt={user.fullName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-gray-800">{user.fullName}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default Searchbar;
