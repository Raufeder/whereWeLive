import Head from "next/head";
// // import Router from "next/router";
import { trpc } from "../utils/trpc";
import CityCard from "../components/CityCard";
import { getOptionsForVote } from "../utils/getRandomCities";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["hello", { text: "Derek" }]);
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const [firstNum, secondNum] = getOptionsForVote();
    setFirst(firstNum);
    setSecond(secondNum);
  }, []);
  // if (isLoading) return <div>loading...</div>;
  // if (data) return <div>{data.greeting}</div>;
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
            // onClick={() => Router.push("/results")}
          >
            See Results
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-3 pt-3 text-center md:grid-cols-2 lg:w-2/3">
          {/* <CityCard
            name="NextJS"
            description="The React framework for production"
            documentation="https://nextjs.org/"
          /> */}
          {first}
          <div className="text-2xl text-green-700">VS</div>
          {/* <CityCard
            name="TypeScript"
            description="The React framework for production"
            documentation="https://www.typescriptlang.org/"
          /> */}
          {second}
        </div>
      </div>
    </>
  );
}
