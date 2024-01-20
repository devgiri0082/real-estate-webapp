import { PrismaClient } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

const prisma = new PrismaClient();

export async function topCityByChangeInBroker() {
  noStore();
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const currentMonthActiveBrokers = await activeBrokersByCityByMonth({ month: currentMonth, year: currentYear });
  const lastMonthActiveBrokers = await activeBrokersByCityByMonth({ month: lastMonth, year: lastYear });
  const currentObj: { [key: string]: number } = {};
  currentMonthActiveBrokers.forEach((item) => currentObj[item.city] = item.count);
  const lastObj: { [key: string]: number } = {};
  lastMonthActiveBrokers.forEach((item) => lastObj[item.city] = item.count);
  //find highest difference city between current and last month
  let highestDiffCity = '';
  let highestDiff = 0;
  Object.keys(currentObj).forEach((city) => {
    const diff = currentObj[city]! - (lastObj[city] ?? 0);
    if (diff > highestDiff) {
      highestDiff = diff;
      highestDiffCity = city;
    }
  })
  return { city: highestDiffCity, count: highestDiff };
}

export async function topActiveBrokersByCity(): Promise<{
  city: string;
  count: number;
}[]> {
  noStore();
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const result = await prisma.broker.groupBy({
    by: ['city'],
    where: {
      activities: {
        some: {
          AND: [
            { year: currentYear },
            { month: currentMonth },
            { isActive: true },
          ],
        },
      },
    },
    _count: {
      city: true,
    },
    orderBy: {
      _count: {
        city: 'desc',
      },
    },
  });
  return result.map((item) => ({ city: item.city, count: item._count.city }));
}

export async function changeInBrokersFromLastMonth(): Promise<number> {
  noStore();
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const currentMonthCount = await prisma.brokerActivity.count({
    where: {
      AND: [
        { year: currentYear },
        { month: currentMonth },
        { isActive: true },
      ],
    },
  });

  const lastMonthCount = await prisma.brokerActivity.count({
    where: {
      AND: [
        { year: lastYear },
        { month: lastMonth },
        { isActive: true },
      ],
    },
  });

  return (currentMonthCount - lastMonthCount) / (lastMonthCount > 0 ? lastMonthCount : currentMonthCount) * 100;

}

export async function activeBrokersByCity() {
  noStore();
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const result = await activeBrokersByCityByMonth({ month: currentMonth, year: currentYear });
  return result;
}

async function activeBrokersByCityByMonth({ month, year }: { month: number, year: number }): Promise<{
  city: string;
  count: number;
}[]> {
  noStore();
  const result = await prisma.broker.groupBy({
    by: ['city'],
    where: {
      activities: {
        some: {
          AND: [
            { year: year },
            { month: month },
            { isActive: true },
          ],
        },
      },
    },
    _count: true,
  });
  return result.map((item) => ({ city: item.city, count: item._count }));
}

export async function activeBrokersByMonth(): Promise<number[]> {
  noStore();
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth() + 1;

  const res = await prisma.brokerActivity.groupBy({
    by: ['month'],
    where: {
      AND: [
        { year: currentYear },
        { month: { gte: 1, lte: 12 } },
        { isActive: true },
      ],
    },
    _count: true,
    orderBy: {
      month: 'asc',
    },
  });

  const value: number[] = new Array(12).fill(0);
  res.forEach((item) => {
    value[item.month! - 1] = item._count;
  });
  let current = 0;;
  const newArr = [];
  while (value[current] > 0) {
    newArr.push(value[current]);
    current++;
  }
  return newArr;
}


export async function totalActiveBrokers(): Promise<number> {
  noStore();
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const res = await prisma.broker.count({
    where: {
      activities: {
        some: {
          AND: [
            { year: currentYear },
            { month: currentMonth },
            { isActive: true },
          ],
        },
      },
    },
  });
  return res as number;
}