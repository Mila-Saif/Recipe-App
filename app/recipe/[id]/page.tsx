import { ArrowLeft } from "lucide-react";
import Link from "next/link";

async function fetchRecipeDetails(id: string) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error('Spoonacular API key is not set in environment variables');
  }

  const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipe details');
  }
  return await response.json();


  
}
export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await fetchRecipeDetails(id);  

  return (

    <div className="min-h-screen md:p-8 p-4">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800 rounded-full shadow p-3 ">
          
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <h1 className="text-lg font-semibold">{recipe.title}</h1>
      </div>
    
      <div className="max-w-5xl mx-auto rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="p-8 border-b border-gray-300">
          <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-md mb-4" />

  

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-gray-100">

          {/* ingerdients */}
          <div className="p-8">
            <h2>
              <span className="text-lg font-semibold">Ingredients</span>
            </h2>
            <ul className="list-disc space-y-3 list-inside mt-4">
              {recipe.extendedIngredients.map((ingredient: any) => (
                <li key={ingredient.id} className="text-gray-700 flex items-start gap-2 border-b border-gray-200 py-2 mb-2">
                  {ingredient.original}
                </li>
              ))}
            </ul>
          </div>

          {/* instructions */}
          <div className="p-8">
            <h2>
              <span className="text-lg font-semibold">Instructions</span>
            </h2>
            <div className="prose mt-4 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
         
            </div>
          </div>
            </div>
      
        
      </div>

  </div>

      
  );
}
