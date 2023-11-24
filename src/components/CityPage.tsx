"use client";

import React from "react";

const CityPage: React.FC<{ city: any }> = ({ city }) => {
  return (
    <section className="lg:w-[600px] flex flex-col items-center justify-center rounded  bg-slate-800 p-6 w-full text-gray-300">
      <h2 className="text-lg lg:text-3xl font-bold pb-4">{`${city?.city}, ${city?.region}`}</h2>
      <div className="flex items-center justify-between w-full">
        <p className="text-md">{`Population: `}</p>
        <span className="font-bold pl-2">{`${city?.population}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Average Rent: `}</p>
        <span
          className={`font-bold pl-2 ${
            city?.averageRent && city?.averageRent <= 1000
              ? "text-green-600"
              : city?.averageRent && city?.averageRent <= 2000
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >{`$${city?.averageRent}`}</span>
      </div>
      <div className="flex items-center justify-between w-full whitespace-nowrap">
        <p className="text-md ">{`Non-Violent Crime:`}</p>
        <span className="font-bold pl-2">{`${city?.nonViolentCrime}/1000`}</span>
      </div>
      <div className="flex items-center justify-between w-full whitespace-nowrap">
        <p className="text-md ">{`Violent Crime:`}</p>
        <span className="font-bold pl-2">{`${city?.violentCrime}/1000`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Crime Percentile: `}</p>
        <span
          className={`font-bold pl-2 ${
            city?.crimePercentile && city?.crimePercentile <= 5
              ? "text-red-500"
              : city?.crimePercentile && city?.crimePercentile <= 15
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${city?.crimePercentile}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Walkability: `}</p>
        <span
          className={`font-bold pl-2 ${
            city?.walkScore && city?.walkScore <= 33
              ? "text-red-500"
              : city?.walkScore && city?.walkScore <= 66
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${city?.walkScore}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Bikeability: `}</p>
        <span
          className={`font-bold pl-2 ${
            city?.bikeScore && city?.bikeScore <= 33
              ? "text-red-500"
              : city?.bikeScore && city?.bikeScore <= 66
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${city?.bikeScore}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Public Transit: `}</p>
        <p
          className={`font-bold pl-2 ${
            city?.transitScore && city?.transitScore <= 33
              ? "text-red-500"
              : city?.transitScore && city?.transitScore <= 66
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${city?.transitScore}`}</p>
      </div>
    </section>
  );
};

export default CityPage;
