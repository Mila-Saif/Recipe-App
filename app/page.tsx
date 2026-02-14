'use client';
import image from '../public/Party 🥳  sticker pack _ AI Emoji Generator.jpg'
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import { Search, Flame, Heart } from 'lucide-react';
import Link from 'next/link';
import FavoriteButton from './components/FavoriteButton';
import FavoriteCard from './components/FavoriteCard';




export default function Home() {

  const [query, setQuery] = useState('');
  const [randomRecipes, setRandomRecipes] = useState([]);

  const router = useRouter();

  const handleSearch = async () => {
    if (query.trim() !== '') {
    
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {

  const fetchRandomRecipes = async () => {
    const cache_Durattion = 60 * 60 * 1000;
    const cachedData = localStorage.getItem('randomRecipes');
    const cachedTime = localStorage.getItem('randomRecipesTimestamp');

    if (cachedData && cachedTime) {
      const now = Date.now() - parseInt(cachedTime);

      if (now < cache_Durattion) {
        setRandomRecipes(JSON.parse(cachedData));
        console.log('Using cached random recipes');
        return;
      }

    }
    try {
      const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
      if (!apiKey) {
        throw new Error('Spoonacular API key is not set in environment variables');
      }

      const response = await fetch(`https://api.spoonacular.com/recipes/random?number=9&apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch random recipes');
      }
      
      const data = await response.json();
      setRandomRecipes(data.recipes || []);
    

    setRandomRecipes(data.recipes);
      localStorage.setItem('randomRecipes', JSON.stringify(data.recipes));
      localStorage.setItem('randomRecipesTimestamp', String(Date.now()));

    }

    catch (error) {
      console.error('Error fetching random recipes:', error);
    }
  };

  fetchRandomRecipes();


}
  , []);








  return (
    <div className=" min-h-screen bg-white font-sans dark:bg-white">

      {/* the header card */}
      <div className='flex flex-row absolute left-4  top-4 items-center gap-4'>
        <img src={image.src} alt="pizza png" className='h-16 w-16 ' />
        <div className='flex flex-center flex-col mt-2'>
        <h2 className='text-2xl mt-1 font-semibold text-black dark:text-black'>SpoonaKolar</h2>
        <p className='text-gray-600 font-light text-sm'>Find Recipes</p>
        </div>



      </div>
    

      <div className="absolute flex flex-row gap-2 items-center right-4 top-4 mt-4" >

        <FavoriteCard />
      
   

      </div>

      <div className="  max-w-3xl mx-auto mt-20 md:mt-4 p-4 flex items-center gap-2 text-center">
        <input  value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}
        type="text"  placeholder="Search recipes..." className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-white dark:border-zinc-700 dark:text-black" />

        <button 
        onClick={handleSearch} className="   bg-red-800  text-white p-3 rounded-md hover:bg-red-900 focus:outline-none ">
          <Search className="h-4 w-4" />
        </button>
      </div>

      {/* the end of the header card  */}


      {/* Random Recipes */}
      <div className="mt-2 p-2">
        <div className='flex flex-col items-center text-center gap-1  mb-4'>
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-red-500" />
            <p className="text-lg font-bold ">Trending Recipes</p>


          </div>
            <p className="text-gray-600 text-sm">Find new recipes and their ingredients below</p>

         
          
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {randomRecipes.map((recipe: any) => (

            <div key={recipe.id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className='flex justify-end pb-4'>
                <FavoriteButton recipe={recipe} />


              </div>
              <Link href={`/recipe/${recipe.id}`} className='w-full block h-48 overflow-hidden hover:scale-105 transition-transform duration-500'>
                  <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500 rounded-md mb-4" />
              </Link>


                <div className='p-4  flex items-center justify-between gap-4 '>
                  <h2 className="text-sm font-bold line-clamp-2 leading-tight text-gray-800">{recipe.title}</h2>

                   

                  <Link href={`/recipe/${recipe.id}`} className='shrink-0'>
                    <button className="bg-red-800 text-white p-2 text-sm rounded-md hover:bg-red-900 focus:outline-none shrink-0">View Recipe</button></Link>
                  

                </div>
           
              
              
            </div>
          ))}
        </div>
      </div>


      {/* End random recipes */}
    </div>
  );
}
