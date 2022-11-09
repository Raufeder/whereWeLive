import Link from "next/link";

type CityCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const CityCard: React.FC<CityCardProps> = ({
  name,
  description,
  documentation,
}) => {
  return (
    <section className="flex flex-col items-center justify-center rounded border-2 border-gray-500 bg-white p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-green-700">{name}</h2>
      <p className="text-sm text-green-600">{description}</p>
      <Link
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </Link>
    </section>
  );
};

export default CityCard;
