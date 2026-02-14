
import Link from 'next/link';
import {  ArrowLeft} from 'lucide-react';
import FavoriteButton from '../components/FavoriteButton';

async function fetchRecipes(query: string) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error('Spoonacular API key is not set in environment variables');
  }

  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=10&apiKey=${apiKey}`, {next: {revalidate: 86400}});

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  const data = await response.json();
  return data.results;
}
export default async function SearchPage ({searchParams}: {searchParams: {query: string}}) {
    const params = await searchParams;
    const query = params.query;
    const recipes = await fetchRecipes(query);
   

   




  return (
    <div className="min-h-screen p-8 ">

      {/* header and back button  */}

      <div className="mb-8 flex items-center gap-4">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800 rounded-full shadow p-3 ">
          
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <h1 className="text-lg font-semibold">Results for <span className='text-red-800'>{query}</span> </h1>
      </div>
       {/* end of header and back button  */}

        {/* the search results  */}



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {recipes.map((recipe: any) => (
            
            <div key={recipe.id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className='flex justify-end pb-4'>
                <FavoriteButton recipe={recipe} />


              </div>
              <Link href={`/recipe/${recipe.id}`} className='relative h-48 overflow-hidden hover:scale-105 transition-transform duration-500'>
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

      {/* the end of the search results  */} 
    </div>
  );
}