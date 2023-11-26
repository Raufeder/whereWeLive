import Router from "next/router";

const CityListing: React.FC<{
  city: { id: Number; city: String; regionCode: String };
}> = ({ city }) => {
  return (
    <div
      className="relative flex border-r border-y p-2 items-center justify-between text-gray-300 cursor-pointer"
      onClick={() => Router.push(`/city/${city.id}`)}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center">
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
      <div className="text-lg font-extrabold leading-normal text-gray-300 text-center mb-2">
        City List
      </div>
      <div className="flex flex-col w-full max-w-2xl overflow-y-scroll h-screen">
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
