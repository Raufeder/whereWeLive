// import { prisma } from "../src/server/db/client";
// import { CityData } from "../src/components/CityData";

// const doBackfill = async () => {
//   CityData.forEach(async (city) => {
//     console.log(`Creating category ${city.city}...`);
//     await prisma.city.create({
//         data: city,
//     })
//     console.log(`Category ${city.city} created!~`);
// })}

// doBackfill();