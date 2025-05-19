"use client";
import Image from "next/image";
import SearchInput from "./components/SearchInput";
import SearchResult from "./components/SearchResult";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchParamsHandler() {
  const searchParams = useSearchParams();
  const searchName = searchParams.get("search");
  return searchName ? <SearchResult name={searchName} /> : null;
}
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Image
        className="mb-5"
        src="/pokemon.png"
        alt="pokemon logo"
        width={300}
        height={500}
      />
      <Suspense fallback={<p>Loading search input...</p>}>
        <SearchInput />
      </Suspense>
      <Suspense fallback={<p>Loading search results...</p>}>
        <SearchParamsHandler />
      </Suspense>
    </div>
  );
}
