import React from "react";
import Tippy from "@tippyjs/react";

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
    <section className="flex flex-col items-center justify-center rounded border-2 border-gray-500 bg-white p-6 shadow-xl duration-500">
      <h2 className="text-3xl text-green-700 font-bold pb-4">{`${cityName}, ${region}`}</h2>
      <div className="flex items-center justify-between w-full">
        <p className="text-md text-green-600">{`Population: `}</p>
        <span className="font-bold">{`${population}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md text-green-600">{`Average Rent: `}</p>
        <span className="font-bold">{`$${averageRent}`}</span>
      </div>
      <div className="flex items-center justify-between w-full whitespace-nowrap">
        <p className="text-md text-green-600">{`Non-Violent Crime: (Per Thousand Residents)`}</p>
        <span className="font-bold">{`${nonViolentCrime}`}</span>
      </div>
      <div className="flex items-center justify-between w-full whitespace-nowrap">
        <p className="text-md text-green-600">{`Violent Crime: (Per Thousand Residents)`}</p>
        <span className="font-bold">{`${violentCrime}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md text-green-600">{`Crime Percentile: `}</p>
        <span className="font-bold">{`${crimePercentile}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md text-green-600">{`Walkability: `}</p>
        <span className="font-bold">{`${walkScore}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md text-green-600">{`Bikeability: `}</p>
        <span className="font-bold">{`${bikeScore}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md text-green-600">{`Public Transit: `}</p>
        <p className="font-bold">{`${transitScore}`}</p>
      </div>
    </section>
  );
};

export default CityCard;
