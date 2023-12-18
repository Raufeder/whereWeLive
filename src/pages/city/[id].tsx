import React from "react";
import type { GetServerSideProps } from "next";
import { prisma } from "../../backend/utils/prisma";
import CitySelector from "../../components/CitySelector";
import { AsyncReturnType } from "../../utils/ts-bs";
import Head from "next/head";
import CityCard from "../../components/CityCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const getCitiesInOrder = async () => {
  return await prisma.city.findMany({
    orderBy: { city: "asc" },
    select: {
      id: true,
      city: true,
      regionCode: true,
    },
  });
};

const getCity = async (id: number) => {
  return await prisma.city.findUnique({
    where: { id: id },
  });
};

type CityQueryResult = AsyncReturnType<typeof getCitiesInOrder>;
type CityResult = AsyncReturnType<typeof getCity>;

const City: React.FC<{
  citiesOrdered: CityQueryResult[number];
  city: CityResult;
}> = ({ citiesOrdered, city }) => {
  return (
    <>
      {" "}
      <Navbar />
      <div className="md:flex items-center justify-start p-4 w-full text-gray-300">
        <Head>
          <title>{`Details | ${city?.city}, ${city?.regionCode}`}</title>
          <meta name="description" content="Where to live" />
          <link rel="icon" href="/favIcon.png" />
        </Head>
        <div className="mr-6 mb-32">
          <CitySelector citiesOrdered={citiesOrdered} />
        </div>
        <div>
          {city ? (
            <CityCard
              cityName={city.city}
              averageRent={city.averageRent}
              bikeScore={city.bikeScore}
              crimePercentile={city.crimePercentile}
              nonViolentCrime={city.nonViolentCrime}
              population={city.population}
              region={city.region}
              regionCode={city.regionCode}
              transitScore={city.transitScore}
              violentCrime={city.violentCrime}
              walkScore={city.walkScore}
              id={city.id}
              clickableStyles={true}
            />
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default City;

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: true,
  };
}

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  const citiesOrdered = await getCitiesInOrder();
  const city = await getCity(Number(params?.id));
  return { props: { city: city, citiesOrdered: citiesOrdered } };
};
