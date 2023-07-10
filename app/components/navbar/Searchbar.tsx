import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { AiOutlineSearch } from "react-icons/ai";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let currentQuery = qs.parse(window.location.search);

    const updatedQuery: any = {
      ...currentQuery,
      searchTerm: searchTerm,
    };

    if (currentQuery.searchTerm === searchTerm) {
      delete updatedQuery.searchTerm;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center border-2 border-neutral-200 active:border-primary-500 transition rounded-lg"
      >
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 rounded-l-2xl w-44 xl:w-60 2xl:w-80 focus:outline-none"
        />
        <button type="submit" className="p-2 rounded-r-2xl bg-white">
          <div className="rounded-full">
            <AiOutlineSearch size={28} />
          </div>
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
