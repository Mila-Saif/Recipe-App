
import Link from 'next/link';
import {  ArrowLeft} from 'lucide-react';
import FavoriteButton from '../components/FavoriteButton';

async function fetchRecipes(query: string, ingredients?: string) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error('Spoonacular API key is not set in environment variables');}
  const params = new URLSearchParams({
    apiKey: apiKey,
    number: '12',
    
  });
  if (query) {
    params.append('query', query);

  }

  if (ingredients) {
    params.append('includeIngredients', ingredients);

  }

  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`, {next: {revalidate: 86400}});

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  const data = await response.json();
  return data.results;
}
export default async function SearchPage ({searchParams, } : { searchParams: Promise<{ query?: string; ingredients?: string}>;

}) {

    const params = await searchParams;
    
    const query = params.query || '';
    const ingredients = params.ingredients;
    const recipes = await fetchRecipes(query, ingredients);
   

   




  return (
    <div className="min-h-screen p-8 ">

      {/* header and back button  */}

      <div className="mb-8 flex items-center gap-4">

        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800 rounded-full shadow p-3 ">
          
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <h1 className="text-xl font-bold">
          {query ? (
            <> Results for <span className='text-red-800'> {query}
              </span></>
          ) : (
            "All Recipes"
          )}
          
      </h1>
          {params.ingredients && (
            <p className="text-sm text-gray-500 mt-1">
              Ingredients: <span className="font-medium text-red-800">{params.ingredients.split(',').join(', ')}</span>
            </p>
          )}
      </div>
       {/* end of header and back button  */}

        {/* the search results  */}



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {recipes.length > 0 ? (
            recipes.map((recipe: any) => (
              
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
            ))

          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-2xl font-bold text-gray-700 mb-2">No recipes found !</p>
              <p className="text-gray-500">We couldn't find any recipes matching those exact keywords and ingredients.</p>

            </div>
          )}

        </div>

      </div>


        );

      }