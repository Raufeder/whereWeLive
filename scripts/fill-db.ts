import { prisma } from "../src/backend/utils/prisma";
import { CityData } from "../src/components/CityData";

const doBackfill = async () => {
  CityData.forEach(async (city) => {
    console.log(`Creating category ${city.city}...`);
    await prisma.city.create({
        data: city,
    })
    console.log(`Category ${city.city} created!~`);
})}

doBackfill();