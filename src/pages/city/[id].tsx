import React from "react";
import type { GetServerSideProps } from "next";
import { prisma } from "../../backend/utils/prisma";
import CityPage from "../../components/CityPage";
import CitySelector from "../../components/CitySelector";
import { AsyncReturnType } from "../../utils/ts-bs";

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
    <div className="md:flex min-h-screen items-center justify-center p-4 w-full text-gray-300">
      <CitySelector citiesOrdered={citiesOrdered} />
      <CityPage city={city} />
    </div>
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
