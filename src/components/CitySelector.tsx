import Router from "next/router";
import Head from "next/head";

const CityListing: React.FC<{
  city: { id: Number; city: String; regionCode: String };
}> = ({ city }) => {
  return (
    <div className="relative flex border-b p-2 items-center justify-between text-gray-300">
      <div className="flex items-center">
        <div className="flex items-center justify-center pl-10">
          <div className="pl-2 capitalize font-bold text-xl text-center ">
            {city.city}, {city.regionCode}
          </div>
        </div>
      </div>
    </div>
  );
};

const CitySelector: React.FC<{
  citiesOrdered: any;
}> = ({ citiesOrdered }) => {
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
        {citiesOrdered
          ? citiesOrdered.map((currentCity: any, index: any) => {
              return <CityListing city={currentCity} key={index} />;
            })
          : null}
      </div>
    </div>
  );
};

export default CitySelector;
