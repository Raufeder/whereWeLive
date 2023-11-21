import Head from "next/head";
// // import Router from "next/router";
import { trpc } from "../utils/trpc";
import CityCard from "../components/CityCard";
import { usePlausible } from "next-plausible";
import Router from "next/router";

export default function Home() {
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

      <div className="md:flex min-h-screen md:flex-col items-center justify-center bg-slate-900 p-4 w-full text-gray-300">
        <h1 className="text-5xl font-extrabold leading-normal md:text-[5rem] text-center">
          {"Pick Which Place You'd Rather Live"}
        </h1>
        {cityPair && (
          <div className="mt-3 flex flex-col lg:flex-row items-center justify-center pt-3 text-center w-full">
            <div>
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
                id={cityPair.firstCity.id}
              />
              <div className="pt-4">
                <button
                  onClick={() => voteForBetter(cityPair.firstCity.id)}
                  className="inline-flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-600 border-2 border-slate-700 shadow-sm font-medium rounded-full   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={fetchingNext}
                >
                  Id Rather Live Here
                </button>
              </div>
            </div>
            <div className="text-2xl p-4">VS</div>
            <div>
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
                id={cityPair.secondCity.id}
              />
              <div className="pt-4">
                <button
                  onClick={() => voteForBetter(cityPair.secondCity.id)}
                  className="inline-flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-600 border-2 border-slate-700 shadow-sm font-medium rounded-full   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={fetchingNext}
                >
                  Id Rather Live Here
                </button>
              </div>
            </div>
          </div>
        )}
        {!cityPair && (
          <div className="mt-3 flex flex-col lg:flex-row items-center justify-center pt-3 text-center w-full">
            Loading...
          </div>
        )}
        <div className="flex h-full w-full items-end justify-center pt-6 text-2xl text-blue-500">
          <div
            className="cursor-pointer"
            onClick={() => Router.push("/results")}
          >
            See Our Favorite Cities
          </div>
        </div>
      </div>
    </>
  );
}
