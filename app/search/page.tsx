
import Link from 'next/link';
import { Search, ArrowLeft} from 'lucide-react';

async function fetchRecipes(query: string) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error('Spoonacular API key is not set in environment variables');
  }

  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=10&apiKey=${apiKey}`);
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



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {recipes.map((recipe: any) => (
            <div key={recipe.id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-sm font-semibold">{recipe.title}</h2>
              <p className="text-sm text-gray-600">{recipe.summary}</p>
            </div>
          ))}
        </div>

        {recipes.length === 0 && (
          <div className="text-center mt-8">
            <Search size={48} className="mx-auto text-gray-400" />
            <h2 className="text-2xl font-semibold mt-4">No recipes found</h2>
          </div>
        )}
    </div>
  );
}