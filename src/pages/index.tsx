import Head from "next/head";
// // import Router from "next/router";
import { trpc } from "../utils/trpc";
import CityCard from "../components/CityCard";
import { usePlausible } from "next-plausible";
import Router from "next/router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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

  const handleCardClick = (id: number) => {
    voteForBetter(id);
  };

  const fetchingNext = voteMutation.isLoading || isLoading;

  return (
    <>
      <Head>
        <title>Where to Live</title>
        <meta name="description" content="Where to live" />
        <link rel="icon" href="/favIcon.png" />
      </Head>

      <div className="flex-col items-center justify-center bg-slate-900 w-full text-gray-300">
        <Navbar />
        <div className="flex-col items-center justify-center h-full w-full">
          <h1 className="text-5xl font-extrabold leading-normal md:text-[5rem] text-center">
            {"Pick Which Place You'd Rather Live"}
          </h1>
          {cityPair && (
            <div className="mt-3 flex flex-col xl:flex-row items-center justify-center pt-3 text-center w-full">
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
                  handleCardClick={handleCardClick}
                  clickableStyles={true}
                />
                <div className="pt-4">
                  <button
                    onClick={() => handleCardClick(cityPair.firstCity.id)}
                    className="inline-flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-600 border-2 border-slate-700 shadow-sm font-medium rounded-full   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                    disabled={fetchingNext}
                  >
                    {"I'd Rather Live Here"}
                  </button>
                  <button
                    onClick={() =>
                      Router.push(`/city/${cityPair.firstCity.id}`)
                    }
                    className="inline-flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-600 border-2 border-slate-700 shadow-sm font-medium rounded-full   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    City Details Page
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
                  handleCardClick={handleCardClick}
                  clickableStyles={true}
                />
                <div className="pt-4">
                  <button
                    onClick={() => handleCardClick(cityPair.secondCity.id)}
                    className="inline-flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-600 border-2 border-slate-700 shadow-sm font-medium rounded-full   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                    disabled={fetchingNext}
                  >
                    {"I'd Rather Live Here"}
                  </button>
                  <button
                    onClick={() =>
                      Router.push(`/city/${cityPair.secondCity.id}`)
                    }
                    className="inline-flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-600 border-2 border-slate-700 shadow-sm font-medium rounded-full   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    City Details Page
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
        </div>
      </div>
      <Footer />
    </>
  );
}
