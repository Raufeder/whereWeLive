import React from "react";
import Tippy from "@tippyjs/react";
import Router from "next/router";

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
  id: number;
  handleCardClick?: any;
  clickableStyles?: boolean;
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
  id,
  handleCardClick,
  clickableStyles,
}) => {
  const correctNumberEnding = (number: number) => {
    if (number <= 20) {
      if (number === 1) {
        return "st";
      } else if (number === 2) {
        return "nd";
      } else if (number === 3) {
        return "rd";
      }
      return "th";
    } else if (number > 20) {
      const arrayNumbers: string[] = number.toString().split("");
      const lastDigit: number = Number(arrayNumbers[arrayNumbers.length - 1]);
      if (lastDigit === 1) {
        return "st";
      } else if (lastDigit === 2) {
        return "nd";
      } else if (lastDigit === 3) {
        return "rd";
      }
      return "th";
    }
  };
  return (
    <section
      className={` ${
        clickableStyles ? "hover:scale-105 cursor-pointer" : ""
      } lg:w-[600px] shadow-2xl flex flex-col items-center justify-center rounded  bg-slate-800 border-2 border-slate-700 p-6 duration-500 w-full text-gray-300`}
      onClick={() => handleCardClick && handleCardClick(id)}
    >
      <h2 className="text-lg lg:text-3xl font-bold pb-4">{`${cityName}, ${region}`}</h2>
      <div className="flex items-center justify-between w-full">
        <p className="text-md">{`Population: `}</p>
        <span className="font-bold pl-2">{`${population}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Average Rent: `}</p>
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
        <p className="text-md ">{`Non-Violent Crime:`}</p>
        <span className="font-bold pl-2">{`${nonViolentCrime}/1000`}</span>
      </div>
      <div className="flex items-center justify-between w-full whitespace-nowrap">
        <p className="text-md ">{`Violent Crime:`}</p>
        <span className="font-bold pl-2">{`${violentCrime}/1000`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Crime Percentile: `}</p>
        <span
          className={`font-bold pl-2 ${
            crimePercentile <= 5
              ? "text-red-500"
              : crimePercentile <= 15
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${crimePercentile}${correctNumberEnding(
          crimePercentile
        )} Percentile`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Walkability: `}</p>
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
        <p className="text-md ">{`Bikeability: `}</p>
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
        <p className="text-md ">{`Public Transit: `}</p>
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
