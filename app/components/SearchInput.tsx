"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
    const Router = useRouter();
  const searchParams = useSearchParams();
  const [input, setInput] = useState(searchParams.get("search") || "");

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    if(input.trim()){
        Router.push(`/?search=${input.trim()}`);
    } 
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search Pokemon"
        className="border border-gray-400 p-2 rounded"
      ></input>
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Search</button>
    </form>
  );
};

export default SearchInput;
