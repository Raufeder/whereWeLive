import Head from "next/head";
// // import Router from "next/router";
import { trpc } from "../utils/trpc";
import CityCard from "../components/CityCard";
import { getOptionsForVote } from "../utils/getRandomCities";
import { useState } from "react";
import { usePlausible } from "next-plausible";
import Router from "next/router";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const {
    data: cityPair,
    refetch,
    isLoading,
  } = trpc.useQuery(["get-city-pair"], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const voteMutation = trpc.useMutation(["cast-vote"]);
  const plausible = usePlausible();

  const voteForBetter = (selected: number) => {
    if (!cityPair) return; // Early escape to make Typescript happy

    if (selected === cityPair?.firstCity.id) {
      // If voted for 1st pokemon, fire voteFor with first ID
      voteMutation.mutate({
        votedFor: cityPair.firstCity.id,
        votedAgainst: cityPair.secondCity.id,
      });
    } else {
      // else fire voteFor with second ID
      voteMutation.mutate({
        votedFor: cityPair.secondCity.id,
        votedAgainst: cityPair.firstCity.id,
      });
    }

    plausible("cast-vote");
    refetch();
  };

  const fetchingNext = voteMutation.isLoading || isLoading;

  return (
    <>
      <Head>
        <title>Derek Codes Where We Live</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-700 p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-green-700 md:text-[5rem]">
          {"Pick Which Place You'd Rather Live"}
        </h1>
        <div className="flex h-full w-full items-end justify-center pt-6 text-2xl text-blue-500">
          <div
            className="cursor-pointer"
            onClick={() => Router.push("/results")}
          >
            See Results
          </div>
        </div>
        {cityPair && (
          <div className="mt-3 flex items-center justify-center gap-3 pt-3 text-center md:grid-cols-2 lg:w-2/3">
            <div className="flex flex-col items-center justify-center">
              <CityCard
                cityName={cityPair.firstCity.city}
                averageRent={cityPair.firstCity.averageRent}
                bikeScore={cityPair.firstCity.bikeScore}
                crimePercentile={cityPair.firstCity.crimePercentile}
                nonViolentCrime={cityPair.firstCity.nonViolentCrime}
                population={cityPair.firstCity.population}
                region={cityPair.firstCity.region}
                regionCode={cityPair.firstCity.regionCode}
                transitScore={cityPair.firstCity.transitScore}
                violentCrime={cityPair.firstCity.violentCrime}
                walkScore={cityPair.firstCity.walkScore}
              />
              <div className="pt-4">
                <button
                  onClick={() => voteForBetter(cityPair.firstCity.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Id Rather Live Here
                </button>
              </div>
            </div>
            <div className="text-2xl text-green-700">VS</div>
            <div className="flex flex-col items-center justify-center">
              <CityCard
                cityName={cityPair.secondCity.city}
                averageRent={cityPair.secondCity.averageRent}
                bikeScore={cityPair.secondCity.bikeScore}
                crimePercentile={cityPair.secondCity.crimePercentile}
                nonViolentCrime={cityPair.secondCity.nonViolentCrime}
                population={cityPair.secondCity.population}
                region={cityPair.secondCity.region}
                regionCode={cityPair.secondCity.regionCode}
                transitScore={cityPair.secondCity.transitScore}
                violentCrime={cityPair.secondCity.violentCrime}
                walkScore={cityPair.secondCity.walkScore}
              />
              <div className="pt-4">
                <button
                  onClick={() => voteForBetter(cityPair.secondCity.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Id Rather Live Here
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
