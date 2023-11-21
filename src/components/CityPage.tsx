"use client";

import React from "react";
import Tippy from "@tippyjs/react";
import Router from "next/router";
import { trpc } from "../utils/trpc";

const CityPage: React.FC = ({}) => {
  const { id } = Router?.query;

  const cityResult = trpc.useQuery(["get-city", { id: Number(id) }], {
    refetchInterval: false,
  });

  const cityList = trpc.useQuery(["get-city-list"], { refetchInterval: false });

  const { data } = cityResult;

  console.log(cityList);

  // const {averageRent,
  //   bikeScore,
  //   city,
  //   crimePercentile,
  //   nonViolentCrime,
  //   population,
  //   region,
  //   regionCode,
  //   transitScore,
  //   violentCrime,
  //   walkScore,
  //   id,} = data

  return (
    <section className="lg:w-[600px] flex flex-col items-center justify-center rounded  bg-slate-800 p-6 w-full text-gray-300">
      <h2 className="text-lg lg:text-3xl font-bold pb-4">{`${data?.city}, ${data?.region}`}</h2>
      <div className="flex items-center justify-between w-full">
        <p className="text-md">{`Population: `}</p>
        <span className="font-bold pl-2">{`${data?.population}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Average Rent: `}</p>
        <span
          className={`font-bold pl-2 ${
            data?.averageRent && data?.averageRent <= 1000
              ? "text-green-600"
              : data?.averageRent && data?.averageRent <= 2000
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >{`$${data?.averageRent}`}</span>
      </div>
      <div className="flex items-center justify-between w-full whitespace-nowrap">
        <p className="text-md ">{`Non-Violent Crime:`}</p>
        <span className="font-bold pl-2">{`${data?.nonViolentCrime}/1000`}</span>
      </div>
      <div className="flex items-center justify-between w-full whitespace-nowrap">
        <p className="text-md ">{`Violent Crime:`}</p>
        <span className="font-bold pl-2">{`${data?.violentCrime}/1000`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Crime Percentile: `}</p>
        <span
          className={`font-bold pl-2 ${
            data?.crimePercentile && data?.crimePercentile <= 5
              ? "text-red-500"
              : data?.crimePercentile && data?.crimePercentile <= 15
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${data?.crimePercentile}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Walkability: `}</p>
        <span
          className={`font-bold pl-2 ${
            data?.walkScore && data?.walkScore <= 33
              ? "text-red-500"
              : data?.walkScore && data?.walkScore <= 66
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${data?.walkScore}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Bikeability: `}</p>
        <span
          className={`font-bold pl-2 ${
            data?.bikeScore && data?.bikeScore <= 33
              ? "text-red-500"
              : data?.bikeScore && data?.bikeScore <= 66
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${data?.bikeScore}`}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-md ">{`Public Transit: `}</p>
        <p
          className={`font-bold pl-2 ${
            data?.transitScore && data?.transitScore <= 33
              ? "text-red-500"
              : data?.transitScore && data?.transitScore <= 66
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >{`${data?.transitScore}`}</p>
      </div>
    </section>
  );
};

export default CityPage;
