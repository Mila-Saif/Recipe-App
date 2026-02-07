'use client';
import image from '../public/Party 🥳  sticker pack _ AI Emoji Generator.jpg'
import {useState} from 'react';
import { Search } from 'lucide-react';





export default function Home() {

  const [query, setQuery] = useState('');







  return (
    <div className=" min-h-screen bg-zinc-50 font-sans dark:bg-white">

      {/* the header card */}
      <div className='flex flex-row absolute left-4 top-4 items-center gap-4'>
        <img src={image.src} alt="pizza png" className='h-16 w-16 ' />
        <span className='text-2xl mt-1 font-semibold text-black dark:text-black'>Find Recipes</span>


      </div>
    

      <div className="absolute flex flex-row gap-2 items-center right-4 top-4 mt-4" >
        <input  value={query} onChange={(e) => setQuery(e.target.value)} 
        type="text"  placeholder="Search recipes..." className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-white dark:border-zinc-700 dark:text-black" />

        <button className=" bg-red-800  text-white p-3 rounded-md hover:bg-red-900 focus:outline-none ">
          <Search className="h-4 w-4" />
        </button>

      </div>

      {/* the end of the header card  */}
   
    </div>
  );
}
