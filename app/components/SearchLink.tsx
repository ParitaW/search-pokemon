import { useRouter } from "next/navigation";

type Props = {
  name: string;
};

const SearchLink = ({ name }: Props) => {
  const router = useRouter();
  return (
    <button
      className="text-blue-600 underline hover:text-blue-800"
      onClick={() => router.push(`/?search=${name}`)}
    >
      {name}
    </button>
  );
};

export default SearchLink;
