import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/?search=${searchTerm}`);
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
};

export default Searchbar;
