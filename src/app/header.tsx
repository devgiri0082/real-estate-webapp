import { IoIosMenu } from "react-icons/io";
export default function Header() {
  return (
    <header className="">
      <div className="flex justify-between text-base font-bold py-8 px-24">
        <h1>LOGO</h1>
        <IoIosMenu className="text-[#383D4E] h-6 w-6"/>
      </div>
      <div className="border py-16 pr-40 text-3xl font-bold bg-gradient-to-r  from-gray-700 from-10% via-teal-600 via-30% to-teal-600 to-90% text-white">
        Brokers
      </div>
    </header>
  )
}