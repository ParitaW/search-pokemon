"use client";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_NAME } from "../graphql/queries";
import Image from "next/image";

type Props = {
  name: string;
};

const SearchResult = ({ name }: Props) => {
  const { data, loading, error } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { name },
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data?.pokemon) return <p>Pokemon not found</p>;
  const { pokemon } = data;
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <Image src={pokemon.image} alt={pokemon.name} width={200} height={200} />
      <p>
        <strong>Type:</strong> {pokemon.types.join(", ")}
      </p>
      <p>
        <strong>Classification:</strong> {pokemon.classification}
      </p>

      <h3>Attacks</h3>
      <p>
        <strong>Fast:</strong>
      </p>
      <ul>
        {pokemon.attacks.fast.map(
          (atk: { name: string; type: string; damage: number }) => (
            <li key={atk.name}>
              {atk.name} ({atk.type}) - {atk.damage} dmg
            </li>
          )
        )}
      </ul>

      <p>
        <strong>Special:</strong>
      </p>
      <ul>
        {pokemon.attacks.special.map(
          (atk: { name: string; type: string; damage: number }) => (
            <li key={atk.name}>
              {atk.name} ({atk.type}) - {atk.damage} dmg
            </li>
          )
        )}
      </ul>

      {pokemon.evolutions.length > 0 && (
        <>
          <h3>Evolutions</h3>
          <ul>
            {pokemon.evolutions.map((evo: { id: string; name: string }) => (
              <li key={evo.id}>{evo.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchResult;
