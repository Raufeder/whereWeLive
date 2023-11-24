import type { GetServerSideProps } from "next";
import { prisma } from "../backend/utils/prisma";
import { AsyncReturnType } from "../utils/ts-bs";
import Router from "next/router";
import Head from "next/head";

const getCitiesInOrder = async () => {
  return await prisma.city.findMany({
    orderBy: {
      VoteFor: { _count: "desc" },
    },
    select: {
      id: true,
      city: true,
      regionCode: true,
      _count: {
        select: {
          VoteFor: true,
          VoteAgainst: true,
        },
      },
    },
  });
};

type CityQueryResult = AsyncReturnType<typeof getCitiesInOrder>;

const generateCountPercent = (city: CityQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = city._count;
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const CityListing: React.FC<{
  city: CityQueryResult[number];
  rank: number;
}> = ({ city, rank }) => {
  return (
    <div className="relative flex border-b p-2 items-center justify-between text-gray-300">
      <div className="flex items-center">
        <div className="flex items-center justify-center pl-10">
          <div className="pl-2 capitalize font-bold text-xl text-center ">
            {city.city}, {city.regionCode}
          </div>
        </div>
      </div>
      <div className="pr-4 font-bold ">
        {generateCountPercent(city).toFixed(2) + "%"}
      </div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-br-md">
        {rank}
      </div>
    </div>
  );
};

const ResultsPage: React.FC<{
  city: CityQueryResult;
}> = (props) => {
  return (
    <div className="flex flex-col items-center bg-slate-900">
      <Head>
        <title>Our Favorite Cities</title>
      </Head>
      <h1 className="text-5xl font-extrabold leading-normal text-gray-300 md:text-[5rem] text-center">
        {"Our Favorite Cities"}
      </h1>
      <h1
        onClick={() => Router.push("/")}
        className="text-2xl p-4 cursor-pointer pt-6 text-blue-500"
      >
        Click to play more
      </h1>
      <div className="flex flex-col w-full max-w-2xl border">
        {props.city
          .sort((a, b) => {
            const difference =
              generateCountPercent(b) - generateCountPercent(a);

            if (difference === 0) {
              return b._count.VoteFor - a._count.VoteFor;
            }

            return difference;
          })
          .map((currentCity, index) => {
            return (
              <CityListing city={currentCity} key={index} rank={index + 1} />
            );
          })}
      </div>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetServerSideProps = async () => {
  const citiesOrdered = await getCitiesInOrder();
  return { props: { city: citiesOrdered } };
};
