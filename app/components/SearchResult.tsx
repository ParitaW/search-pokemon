"use client";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_NAME } from "../graphql/queries";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
};

const SearchResult = ({ name }: Props) => {
  const { data, loading, error } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { name },
  });
  const router = useRouter();

  if (loading) return <p className="text-center">Loading...</p>;
  if (error || !data?.pokemon)
    return <p className="text-center text-red-500">Pokemon not found</p>;
  const { pokemon } = data;
  return (
    <div className="mt-6 p-6  bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Pokemon Image */}
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={200}
          height={200}
          className="rounded-lg border border-gray-200 "
        />

        {/* Pokemon Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {pokemon.name}
          </h1>
          <p className="text-gray-600">
            <strong>Type:</strong> {pokemon.types.join(", ")}
          </p>
          <p className="text-gray-600">
            <strong>Classification:</strong> {pokemon.classification}
          </p>

          {/* Attacks */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Attacks</h3>
            <div className="mt-2">
              <p className="font-medium text-gray-700">Fast</p>
              <ul className="list-disc list-inside text-gray-600">
                {pokemon.attacks.fast.map(
                  (atk: { name: string; type: string; damage: number }) => (
                    <li key={atk.name}>
                      {atk.name} ({atk.type}) - {atk.damage} dmg
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-medium text-gray-700">Special</p>
              <ul className="list-disc list-inside text-gray-600">
                {pokemon.attacks.special.map(
                  (atk: { name: string; type: string; damage: number }) => (
                    <li key={atk.name}>
                      {atk.name} ({atk.type}) - {atk.damage} dmg
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Evolutions */}
          {pokemon.evolutions && pokemon.evolutions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Evolutions
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {pokemon.evolutions.map((evo: { id: string; name: string }) => (
                  <li
                    key={evo.id}
                    className="text-blue-500 cursor-pointer hover:underline"
                    onClick={() => router.push(`/?search=${evo.name}`)}
                  >
                    {evo.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
