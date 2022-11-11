import Link from "next/link";

type CityCardProps = {
  averageRent: number;
  bikeScore: number;
  cityName: string;
  crimePercentile: number;
  nonViolentCrime: number;
  population: number;
  region: string;
  regionCode: string;
  transitScore: number;
  violentCrime: number;
  walkScore: number;
};

const CityCard: React.FC<CityCardProps> = ({
  averageRent,
  bikeScore,
  cityName,
  crimePercentile,
  nonViolentCrime,
  population,
  region,
  regionCode,
  transitScore,
  violentCrime,
  walkScore,
}) => {
  return (
    <section className="flex flex-col items-center justify-center rounded border-2 border-gray-500 bg-white p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-green-700">{cityName}</h2>
      <p className="text-sm text-green-600">{averageRent}</p>
      {/* <Link
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </Link> */}
    </section>
  );
};

export default CityCard;
