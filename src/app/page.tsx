import Image from 'next/image'
import { topCityByChangeInBroker, changeInBrokersFromLastMonth, topActiveBrokersByCity, totalActiveBrokers, activeBrokersByMonth } from './lib/data';
import Chart from './chart';


export default async function Home() {
  const totalBrokers = await totalActiveBrokers();
  const brokersByCity = (await topActiveBrokersByCity());
  const topBroker =  brokersByCity[0];
  const changeByPercent = await changeInBrokersFromLastMonth();
  const topChangeCity = await topCityByChangeInBroker();
  const activeBrokerByMonth = await activeBrokersByMonth();
  console.log({activeBrokerByMonth})
  return (
    <main className="px-40 py-8">
      <div className='mb-12'>
        <h1 className='text-2xl font-bold'>Overview</h1>
        <h2 className='text-emerald-400'>Explore broker insights</h2>
      </div>
      <div className='flex gap-4 mb-40'>
        <Card title={String(totalBrokers)}>
          <div>
            <p className="text-gray-700 text-base mt-2">Total Brokers in Israel</p>
            <p className="text-gray-700 text-base mt-2"><span className='text-emerald-400'> {changeByPercent}% </span> change from last month</p>
          </div>
        </Card>
        <Card title={topBroker.city || ''} imagePath='/pricetag.png'>
          <p className="text-gray-700 text-base mt-2">City with the Most Brokers</p>
        </Card>
        <Card title={topChangeCity.city} imagePath='/pricetag.png'>
          <p className="text-gray-700 text-base mt-2">City&apos;s Monthly Broker Rise</p>
          <p className="text-gray-700 text-base mt-2"><span className='text-emerald-400'> {topChangeCity.count} </span> Brokers Added </p>
        </Card>
      </div>

    <div className='mb-20'>
      <h2 className='text-xl font-bold mb-6'>Monthly Trends in Active Brokers</h2>
      <Chart dataset={activeBrokerByMonth}/>
    </div>
    <div className='h-96 overflow-y-scroll'>
      <BrokerTable data={brokersByCity}/>
    </div>
    </main>
  )
}
type BrokerTableProps = {
  data: {
    city: string;
    count: number;
}[]
}


const BrokerTable = ({data}: BrokerTableProps) => {
  return (
    <table className="w-[440px] border border-red-500 border-collapse table-auto ">
      <thead className='border border-black'>
        <tr className=" text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 border border-black  px-6 text-right w-1/2">Area</th>
          <th className="py-3 border border-black bg-gray-200 px-6 text-right w-1/2">Total Brokers</th>
        </tr>
      </thead>
      <tbody className="">
        {data && data.map((row, index) => (
          <tr key={index} className=" border-black border">
            <td className={`py-3 border-b  border-l border-l-black ${index === data.length -1 ? "border-b-black" : "border-b-gray-300"} px-6 text-right`}>
              {row.city}
            </td>
            <td className={`py-3 border-b ${index === data.length -1 ? "border-black" : "border-gray-300"} bg-gray-100 px-6 text-right`}>
              {row.count}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


type CardProps = {
  imagePath?: string
  title: string
  children?: React.ReactNode
}

const Card = ({imagePath, title, children}: CardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 mb-6 bg-white">
      <div className="flex items-center justify-between ">
        <h1 className="ml-4 text-xl font-bold">{title}</h1>
        {imagePath && <Image src={imagePath} alt="icon" height={40} width={40}/>}
      </div>
    {children}
    </div>
  );
}