"use client";
import Image from "next/image";
import SearchInput from "./components/SearchInput";
import SearchResult from "./components/SearchResult";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const searchName = searchParams.get("search");
  return (
    // <h1 className="center">Test</h1>
    <div>
      <Image
        className="mb-5"
        src="/pokemon.png"
        alt="pokemon logo"
        width={300}
        height={500}
      />
      <SearchInput />
      {searchName ? (
        <SearchResult name={searchName} />
      ) : (
        <p>Search for a Pokemon</p>
      )}
      {/* <SearchResult name="test"/> */}
    </div>
  );
}
