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
    <section className=" lg:w-[600px] flex flex-col items-center justify-center rounded border-2 border-gray-500 bg-white p-6 shadow-xl duration-500 w-full">
      <h2 className="text-3xl text-green-700 font-bold pb-4">{`${cityName}, ${region}`}</h2>
      <div className="flex items-center justify-between w-full">
        <p className="text-md text-green-600">{`Population: `}</p>
        <span className="font-bold pl-2">{`${population}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md text-green-600">{`Average Rent: `}</p>
        <span
          className={`font-bold pl-2 ${
            averageRent <= 1000
              ? "text-green-600"
              : averageRent <= 2000
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >{`$${averageRent}`}</span>
      </div>
      <div className="flex items-center justify-between w-full whitespace-nowrap">
        <p className="text-md text-green-600">{`Non-Violent Crime:`}</p>
        <span className="font-bold pl-2">{`${nonViolentCrime}/1000`}</span>
      </div>
      <div className="flex items-center justify-between w-full whitespace-nowrap">
        <p className="text-md text-green-600">{`Violent Crime:`}</p>
        <span className="font-bold pl-2">{`${violentCrime}/1000`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md text-green-600">{`Crime Percentile: `}</p>
        <span
          className={`font-bold pl-2 ${
            crimePercentile <= 5
              ? "text-red-500"
              : crimePercentile <= 15
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${crimePercentile}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md text-green-600">{`Walkability: `}</p>
        <span
          className={`font-bold pl-2 ${
            walkScore <= 33
              ? "text-red-500"
              : walkScore <= 66
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${walkScore}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md text-green-600">{`Bikeability: `}</p>
        <span
          className={`font-bold pl-2 ${
            bikeScore <= 33
              ? "text-red-500"
              : bikeScore <= 66
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${bikeScore}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md text-green-600">{`Public Transit: `}</p>
        <p
          className={`font-bold pl-2 ${
            transitScore <= 33
              ? "text-red-500"
              : transitScore <= 66
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${transitScore}`}</p>
      </div>
    </section>
  );
};

export default CityCard;
