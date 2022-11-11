import { prisma } from "../src/backend/utils/prisma";
import { CityData } from "../src/components/CityData";

const doBackfill = async () => {
    await prisma.city.createMany({
        data: CityData,
    })

}

doBackfill();